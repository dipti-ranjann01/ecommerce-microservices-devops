const { Kafka } = require("kafkajs");
const Config = require("../config/index")
const kafka = new Kafka({
    clientId: "ecommerce",
    brokers: [Config.KAFKA_BROKER]
});

function createConsumer(groupId){
    return kafka.consumer({groupId});
}

module.exports = {
    createConsumer
};