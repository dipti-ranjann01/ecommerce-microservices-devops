const { v4: uuid } = require("uuid");
const pool = require("../../../../shared/db/postgres");
const topics = require("../../../../shared/events/topics");
const publisher = require("../../../../shared/events/eventPushlisher");
const { buildOrderCreatedEvent } = require("../../../../shared/events/orderEvents");

exports.createOrder = async(orderRequest) => {
    const client = await pool.connect();
    try{
        await client.query("BEGIN");
        let totalAmount = 0;
        const products = [];
        for(const items of orderRequest.items){
            console.log(items);
            const result = await client.query(
                `
                SELECT id,name,price
                FROM products
                WHERE id = $1
                `,
                [items.product_id]
            );
            if(result.rows.length === 0)
            {
                throw new Error(
                    `Product ${items.product_id} not found.`
                );
            }
            const product = result.rows[0];

            totalAmount += product.price * items.quantity;

            products.push({
                productId: product.id,
                quantity: items.quantity,
                unitPrice: product.price
            });
        }

        const orderNumber = uuid();
        const orderResult = await pool.query(
            `
            INSERT INTO orders
            (
            order_number,
            customer_name,
            customer_email,
            total_amount
            )
            VALUES
            ($1,$2,$3,$4)
            RETURNING *
            `,
            [
                orderNumber,
                orderRequest.customer_name,
                orderRequest.customer_email,
                totalAmount
            ]
        );

        const order = orderResult.rows[0];
        for(const product of products){
            await client.query(
                `
                INSERT INTO order_items
                (
                order_id,
                product_id,
                quantity,
                unit_price
                )
                VALUES($1,$2,$3,$4)
                `,
                [
                    order.id,
                    product.productId,
                    product.quantity,
                    product.unitPrice
                ]
            );
        }
        await client.query("COMMIT");
        const event = buildOrderCreatedEvent(order, products)
        await publisher.publish(topics.ORDER_CREATED, event);

        return {
            orderId: order.id,
            orderNumber: order.order_number,
            totalAmount: order.total_amount,
            status: order.status
        }
    }
    catch(err){
        await client.query("ROLLBACK");
        throw err;
    }
    finally{
        client.release;
    }
};