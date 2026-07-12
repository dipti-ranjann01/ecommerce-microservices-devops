const Publisher = require("./eventPushlisher");
async function publishToDLQ(topic, event, error){
    const dlqEvent ={
        ...event,
        dlqTimestamp: new Date().toISOString(),
        failureReason: error.message,
        retryExhausted: true
    };

    await Publisher.publish(topic,dlqEvent);
}
module.exports = {
    publishToDLQ
};