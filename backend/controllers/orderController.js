const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const createOrder = async (req, res) => {
    try {
        const cart = await Cart.findOne({
            user: req.user.userId
        });

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Cart is empty"
            });
        }

        const orderProducts = [];
        let totalPrice = 0;
        const productsToUpdate = [];

        for (const item of cart.products) {
            const product = await Product.findById(item.product);

            if (!product) {
                return res.status(404).json({
                    success: false,
                    message: "Product not found"
                });
            }

            if (product.stock < item.quantity) {
                return res.status(400).json({
                    success: false,
                    message: `Not enough stock for ${product.name}`
                });
            }

            orderProducts.push({
                product: product._id,
                quantity: item.quantity
            });

            totalPrice += product.price * item.quantity;

            productsToUpdate.push({
                product,
                quantity: item.quantity
            });
        }

        for (const item of productsToUpdate) {
            item.product.stock -= item.quantity;
            await item.product.save();
        }

        const order = await Order.create({
            user: req.user.userId,
            products: orderProducts,
            totalPrice: totalPrice
        });

        cart.products = [];

        await cart.save();

        return res.status(201).json({
            success: true,
            message: "Order created successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getMyOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user.userId
        }).populate("products.product", "name price image");

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const getOrder = async (req, res) => {
    try {
        const order = await Order.findOne({
            _id: req.params.id,
            user: req.user.userId
        }).populate("products.product", "name price image");

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            order
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const updateOrderStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const { status } = req.body;

        const allowedStatuses = [
            "pending",
            "processing",
            "shipped",
            "delivered",
            "cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid order status"
            });
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            {
                new: true,
                runValidators: true
            }
        );

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Order status updated successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const cancelOrder = async (req, res) => {
    try {
        const id = req.params.id;

        const order = await Order.findOne({
            _id: id,
            user: req.user.userId
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }

        if (order.status === "delivered") {
            return res.status(400).json({
                success: false,
                message: "Delivered order cannot be cancelled"
            });
        }

        if (order.status === "cancelled") {
            return res.status(400).json({
                success: false,
                message: "Order is already cancelled"
            });
        }

        order.status = "cancelled";

        await order.save();

        return res.status(200).json({
            success: true,
            message: "Order cancelled successfully",
            order
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate("user", "name email")
            .populate("products.product", "name price image")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = {
    createOrder,
    getMyOrders,
    getOrder,
    updateOrderStatus,
    cancelOrder
    getAllOrders
};
