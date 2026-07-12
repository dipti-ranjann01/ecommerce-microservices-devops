const {
    connectProducer
} = require("../../../shared/kafka/producer");
const Logger = require("../../../shared/utils/logger")
require("dotenv").config();
const express = require("express");
const orderRoutes = require("./routes/orders");
const config = require("../../../shared/config/index");
const app = express();
app.use(express.json());
app.use("/orders",orderRoutes);
app.use("/health", (req,res) => {
  res.status(200).json({
    "status":"UP"
  });
});

async function start(){
    await connectProducer();
    app.listen(config.PORT, ()=>{
        Logger.info("Order Service Running");
    });
}

start();