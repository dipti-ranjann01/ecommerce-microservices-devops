const express = require("express");
const router = express.Router();
const Logger = require("../../../../shared/utils/logger")
const pool = require("../../../../shared/db/postgres");
const authenticate = require("../../../../shared/middleware/authenticate");
const authorize = require("../../../../shared/middleware/authorize");
const roles = require("../../../../shared/config/roles");

router.get("/:productId", authenticate, authorize(roles.ADMIN), async(req,res) => {
    try{
        const result = await pool.query(
            `
            SELECT *
            FROM inventory
            WHERE product_id = $1
            `,
            [req.params.productId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({
                "message":"Inventory not found"
            });
        }
        res.json(result.rows[0]);
    }
    catch(error){
        Logger.error(error);
        res.status(500).json({
            "error" : "Inventory lookup failed"
        });
    }
});

router.put("/:productId", authenticate, authorize(roles.ADMIN), async(req,res) => {
    try{
        const { available_quantity } = req.body;
        const result = await pool.query(
            `
            UPDATE inventory
            SET available_quantity = $1
            WHERE product_id = $2
            RETURNING *
            `,
            [
                available_quantity,
                req.params.productId
            ]
        );
        if(result.rows.length === 0)
        {
            res.status(404).json({
                "message":"Inventory not found"
            });
        }
        res.json(result.rows[0]);
    }
    catch(error){
        Logger.error(error);

        res.status(500).json({
            "message": "Update Inventory failed"
        });
    }
});

router.post("/:productId", authenticate, authorize(roles.ADMIN), async(req,res) => {
    try{
        const { available_quantity } = req.body;
        const result = await pool.query(
            `
            INSERT INTO inventory
            (
                product_id,
                available_quantity
            )
            VALUES ($1,$2)
            RETURNING *
            `,
            [
                req.params.productId,
                available_quantity
            ]
        );
        res.status(201).json(result.rows[0]);
    }
    catch(error){
        res.status(500).json({
            "message":"Inventory insertion failed"
        });
        Logger.error(error);
    }

})

module.exports = router;