require("dotenv").config();
const express = require("express");
const Config = require("../../../shared/config/index");
const Logger = require("../../../shared/utils/logger");
const { triggerConsumer } = require("./kafka/notificationConsumer");
const app = express();
app.use(express.json());
app.use("/health", (req,res) => {
  res.status(200).json({
    "status":"UP"
  });
});
async function start(){
    await triggerConsumer();
    app.listen(config.PORT, ()=>{
            Logger.info("Notification Service Running");
        });
}

start();