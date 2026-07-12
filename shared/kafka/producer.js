const { Kafka } = require("kafkajs");
const Logger = require("../utils/logger");
const config = require("../config/index");

const kafka = new Kafka({
    clientId: "ecommerce",
    brokers: [config.KAFKA_BROKER]
});

const producer = kafka.producer();

async function connectProducer() {
    await producer.connect();
    Logger.info("Kafka Producer Connected");
}

module.exports= {
    producer,
    connectProducer
};