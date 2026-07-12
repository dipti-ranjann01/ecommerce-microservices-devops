const { producer } = require("../kafka/producer");
async function publish(topic,payload){
    await producer.send({
        topic,
        messages:[
            {
                value:JSON.stringify(payload)
            }
        ]
    });
}

module.exports = {
    publish
};