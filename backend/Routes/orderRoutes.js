const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const isAdmin = require("../middleware/isAdmin");

const {
    createOrder,
    getMyOrders,
    getOrder,
    updateOrderStatus,
    cancelOrder,
getAllOrders
} = require("../controllers/orderController");

router.post("/", auth, createOrder);
router.get("/", auth, getMyOrders);
router.get("/admin/all", auth, isAdmin, getAllOrders);
router.get("/:id", auth, getOrder);

router.put("/:id/status", auth, isAdmin, updateOrderStatus);


router.put("/:id/cancel", auth, cancelOrder);

module.exports = router;
