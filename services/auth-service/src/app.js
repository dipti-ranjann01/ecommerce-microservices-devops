require("dotenv").config();
const express = require("express");
const config = require("../../../shared/config");
const authRoutes = require("./routes/authRoutes");
const logger = require("../../../shared/utils/logger");
const app = express();
app.use(express.json());

async function start(){
    app.use("/auth",authRoutes);
    app.use("/health", (req,res) => {
        res.status(200).json({
            "status":"UP"
        });
    });
    app.listen(config.PORT,() => {
        logger.info("Auth service running")
    });
}

start();