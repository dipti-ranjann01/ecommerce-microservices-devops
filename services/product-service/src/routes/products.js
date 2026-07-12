const express = require("express");
const router = express.Router();
const Logger = require("../../../../shared/utils/logger");
const pool = require("../../../../shared/db/postgres");

const redisClient = require("../../../../shared/cache/redis");
const authenticate = require("../../../../shared/middleware/authenticate");
const authorize = require("../../../../shared/middleware/authorize");
const roles = require("../../../../shared/config/roles");

router.post("/", authenticate, authorize(roles.ADMIN), async (req, res) => {
  try {

    const {
      name,
      description,
      price,
      category
    } = req.body;

    const result = await pool.query(
      `
      INSERT INTO products
      (
        name,
        description,
        price,
        category
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        name,
        description,
        price,
        category
      ]
    );

    res.status(201).json(result.rows[0]);

  } catch(error) {

    Logger.error(error);

    res.status(500).json({
      error: "Failed to create product"
    });

  }
});

router.get("/", authenticate, authorize(roles.ADMIN, roles.USER), async (req, res) => {

  try {

    const result = await pool.query(
      "SELECT * FROM products ORDER BY id"
    );

    res.json(result.rows);

  } catch(error) {

    Logger.error(error);

    res.status(500).json({
      error: "Failed to fetch products"
    });

  }

});

router.get("/:id", authenticate, authorize(roles.ADMIN, roles.USER), async (req, res) => {

  try {

    const cacheKey = `product:${req.params.id}`;

    const cachedProduct =
      await redisClient.get(cacheKey);

    if(cachedProduct) {

      Logger.info("Cache Hit");

      return res.json(
        JSON.parse(cachedProduct)
      );
    }

    Logger.info("Cache Miss");

    const result = await pool.query(
      "SELECT * FROM products WHERE id=$1",
      [req.params.id]
    );

    if(result.rows.length === 0) {

      return res.status(404).json({
        error: "Product not found"
      });

    }

    await redisClient.set(
      cacheKey,
      JSON.stringify(result.rows[0]),
      {
        EX: 60
      }
    );

    res.json(result.rows[0]);

  } catch(error) {

    Logger.error(error);

    res.status(500).json({
      error: "Failed to fetch product"
    });

  }

});

router.put("/:id", authenticate, authorize(roles.ADMIN), async (req, res) => {

  try {

    const {
      name,
      description,
      price
    } = req.body;

    const result = await pool.query(
      `
      UPDATE products
      SET
        name=$1,
        description=$2,
        price=$3,
      WHERE id=$4
      RETURNING *
      `,
      [
        name,
        description,
        price,
        req.params.id
      ]
    );

    if(result.rows.length === 0) {

      return res.status(404).json({
        error: "Product not found"
      });

    }

    res.json(result.rows[0]);

    await redisClient.del(
      `product:${req.params.id}`
    );

  } catch(error) {

    Logger.error(error);

    res.status(500).json({
      error: "Failed to update product"
    });

  }

});

router.delete("/:id", authenticate, authorize(roles.ADMIN), async (req, res) => {

  try {

    const result = await pool.query(
      `
      DELETE FROM products
      WHERE id=$1
      RETURNING *
      `,
      [req.params.id]
    );

    if(result.rows.length === 0) {

      return res.status(404).json({
        error: "Product not found"
      });

    }

    res.json({
      message: "Product deleted"
    });

    await redisClient.del(
      `product:${req.params.id}`
    );

  } catch(error) {

    Logger.error(error);

    res.status(500).json({
      error: "Failed to delete product"
    });

  }

});

module.exports = router;