const orderService = require("../service/orderService");
const Logger = require("../../../../shared/utils/logger");
exports.createOrder = async(req,res) => {
    try{
        const order = await orderService.createOrder(req.body);

        res.status(201).json(order);
    }
    catch(err){
        Logger.error(err);
        res.status(500).json({
            "message":err.message
        });
    }
};