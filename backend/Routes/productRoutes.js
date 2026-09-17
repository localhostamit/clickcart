const express = require("express");
const router = express.Router();
const{createProduct,getProducts,getProduct , updateProduct ,deleteProduct}= require("../controllers/productController");
router.post("/" , createProduct);
router.get("/",getProducts);
router.get("/:id",getProduct);
router.delete("/:id",deleteProduct);
router.put("/:id",updateProduct);
module.exports= router;
