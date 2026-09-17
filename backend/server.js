
const connectDB = require("./config/db");
const authRoutes = require("./Routes/authRoutes");
const categoryRoutes = require("./Routes/categoryRoutes");
const productRoutes = require("./Routes/productRoutes");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express(); 
dotenv.config(); 
connectDB();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5000; 
app.use("/api/auth",authRoutes);
app.use("/api/categories" , categoryRoutes);
app.use("/api/products", productRoutes);
app.listen(PORT, () => {
    console.log(`server is running at the port ${PORT}`);
});