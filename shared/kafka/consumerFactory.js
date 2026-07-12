const config = require("../config");
const { publishToDLQ } = require("../events/dlqPublisher");
const { createConsumer } = require("./consumer");
const Logger = require("../utils/logger");
const sleep = require("../utils/sleep");
async function startConsumer(groupId,topic,messageHandler,dlqTopic){
    const consumer = createConsumer(groupId);
    await consumer.connect();
    await consumer.subscribe({
        topic,
        fromBeginning: true
    });

    await consumer.run({
        eachMessage:async({message}) => {
            const payload = JSON.parse(message.value.toString());
            let attempt = 0;
            while(attempt < config.MAX_RETRIES){
                try{
                    await messageHandler(payload);
                    break;
                }
                catch(error){
                    attempt++;

                    if(attempt === config.MAX_RETRIES){
                        await publishToDLQ(dlqTopic, messageHandler(payload), error);
                        Logger.error(`Moved Event ${messageHandler(payload).eventId} to DLQ`);
                    }
                    await sleep(attempt * 1000);
                }
            }
        }
    });
}
module.exports = {
    startConsumer
};