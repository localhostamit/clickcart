const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
    addToCart,
    getCart,
    updateCart,
    removeFromCart,
    clearCart
} = require("../controllers/cartController");

router.post("/", auth, addToCart);

router.get("/", auth, getCart);

router.put("/:productId", auth, updateCart);

router.delete("/:productId", auth, removeFromCart);

router.delete("/", auth, clearCart);

module.exports = router;