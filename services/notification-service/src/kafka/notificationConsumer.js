const{startConsumer} = require("../../../../shared/kafka/consumerFactory");
const notificationService = require("../services/notificationService");
const topics = require("../../../../shared/events/topics");
async function triggerConsumer()
{
    startConsumer("notification-group-v2", topics.ORDER_CREATED, notificationService.processOrder,topics.ORDER_CREATED_DLQ);
}
module.exports = { triggerConsumer };