require("dotenv").config();
const express = require("express");
const inventoryRoutes = require("./routes/inventory");
const {triggerConsumer} = require("./kafka/inventoryConsumer");
const Logger = require("../../../shared/utils/logger");
const Config = require("../../../shared/config/index");
const app = express();
app.use(express.json());

app.use("/inventory", inventoryRoutes);
app.use("/health", (req,res) => {
  res.status(200).json({
    "status":"UP"
  });
});

async function start(){
    app.listen(Config.PORT, () => {
        Logger.info("Inventory Service Running");
    });

    await triggerConsumer();
}

start();