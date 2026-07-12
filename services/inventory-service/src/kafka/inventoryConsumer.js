const{startConsumer} = require("../../../../shared/kafka/consumerFactory");
const inventoryService = require("../services/inventoryService");
const topics = require("../../../../shared/events/topics");
async function triggerConsumer()
{
    startConsumer("inventory-group", topics.ORDER_CREATED, inventoryService.processOrder, topics.ORDER_CREATED_DLQ)
};
module.exports = { triggerConsumer };