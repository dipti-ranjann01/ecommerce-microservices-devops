const pool = require("../../../../shared/db/postgres");
const Logger = require("../../../../shared/utils/logger")
exports.sendNotification = async(order)=> {
    await pool.query(
        `
        INSERT INTO notifications
        (
            order_id,
            customer_email,
            notification_type,
            status
        )
        VALUES ($1,$2,$3,$4)
        RETURNING *
        `,
        [
            order.orderId,
            order.customerEmail,
            "EMAIL",
            "SENT"
        ]
    );
    Logger.info(`Email sent to ${order.customerEmail} for order ${order.orderId}`);
};