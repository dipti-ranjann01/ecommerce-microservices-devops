const { v4: uuid } = require("uuid");
function buildOrderCreatedEvent(order, items){
    return {
        eventId: uuid(),
        eventType: "ORDER_CREATED",
        version:"1.0",
        source:"order-service",
        timestamp: new Date().toISOString(),
        payload:{
            orderId: order.id,
            customerEmail: order.customer_email,
            totalAmount: order.total_amount,
            status: order.status,
            items
        }
    };
}

module.exports = { buildOrderCreatedEvent };