const config = require("../../../../shared/config");
const pool = require("../../../../shared/db/postgres");
const logger = require("../../../../shared/utils/logger");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const registerUser = async(req,res) => {
    try{
        const result = await pool.query(
            `
            INSERT INTO users
            (
                username,
                email,
                password,
                role
            )
            VALUES ($1,$2,$3,$4)
            RETURNING *
            `,
            [
                req.body.username,
                req.body.email,
                await bcrypt.hash(req.body.password,10),
                req.body.role
            ]
        );

        if(result.rows.length === 0)
        {
            logger.error("Registration failed");
        }
        res.json(result.rows[0]);
    }
    catch(error){
        logger.error(error);
    }

};

const loginUser = async(req,res) => {
    try{
        const result = await pool.query(
            `
            SELECT *
            FROM users
            WHERE username = $1
            `,
            [
                req.body.username
            ]
        );
        console.log(result);
        if(result.rows.length === 0)
        {
            logger.error("User not registered");
            res.status(401).json({
                "message":"Username is not registered. Please register on /auth/register URI and then perform login."
            });
        }
        const isMatch = await bcrypt.compare(req.body.password,result.rows[0].password);
        if(isMatch)
        {
            const token = jwt.sign(
                {
                    userId: result.rows[0].id,
                    username: result.rows[0].username,
                    role: result.rows[0].role
                },
                config.JWT_SECRET,
                {
                    expiresIn: config.JWT_EXPIRES_IN
                }
            );
            logger.info("User login is successful");
            res.status(200).json({
                "message":"Login successful",
                token
            });
        }
        else{
            logger.error(`Invalid Password from ${req.body.username}`);
            res.status(401).json({
                "message":"Invalid username/password. Please try with correct credentials."
            });
        }
    }
    catch(error)
    {
        logger.error(error);
    }
};

module.exports = { registerUser, loginUser }