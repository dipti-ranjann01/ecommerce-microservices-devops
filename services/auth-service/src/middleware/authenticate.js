const jwt = require("jsonwebtoken");
const config = require("../../../../shared/config");
const logger = require("../../../../shared/utils/logger");
const authenticate = (req,res,next) => {
    const authHeader = req.headers.authorization;
    if(!authHeader)
    {
        return res.status(401).json({
            "message":"Authorization header missing"
        });
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, config.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        return res.status(401).json({
            "message":"Invalid or expired token"
        });
        logger.error(error);
    }
};

module.exports = authenticate;