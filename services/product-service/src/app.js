require("dotenv").config();
const Logger = require("../../../shared/utils/logger");
const express = require("express");
const listEndpoints = require('express-list-endpoints');
const productRoutes = require("./routes/products");
const config = require("../../../shared/config/index");
const app = express();

app.use(express.json());

app.use("/products", productRoutes);

app.use("/health", (req,res) => {
  res.status(200).json({
    "status":"UP"
  });
});

app.listen(config.PORT, () => {
  Logger.info("Product Service Running");

});

