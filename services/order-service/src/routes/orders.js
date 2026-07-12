const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticate = require("../../../../shared/middleware/authenticate");
const authorize = require("../../../../shared/middleware/authorize");
const roles = require("../../../../shared/config/roles");

router.post("/", authenticate, authorize(roles.ADMIN, roles.USER), orderController.createOrder);

module.exports = router;