const pool = require("../../../../shared/db/postgres");
const Logger = require("../../../../shared/utils/logger");
exports.processOrder = async(order) => {
    const client = await pool.connect();
    try{
        await client.query("BEGIN");
        for(const item of order.items){
            const inventoryResult = await client.query(
                `
                SELECT available_quantity
                FROM inventory
                WHERE product_id = $1
                FOR UPDATE
                `,
                [item.productId]
            );
            if(inventoryResult.rowCount === 0) {
                throw new Error(`Inventory not found for Product ${item.productId}`);
            }
            const result = await client.query(
                `
                UPDATE inventory
                SET available_quantity = available_quantity - $1
                where product_id = $2
                AND available_quantity >= $1
                RETURNING *
                `,

                [
                    item.quantity,
                    item.productId
                ]
            );
            if(result.rowCount === 0){
                throw new Error(`Insufficient inventory for Product ${item.productId}`);
            }
        }
        await client.query("COMMIT");
        Logger.info(`Inventory Updated for Orders ${order.orderId}`);
    }
    catch(err)
    {
        await client.query("ROLLBACK");
        throw err;
    }
    finally{
        client.release();
    }
};