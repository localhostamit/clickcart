const {createCategory , getCategories, getCategory , updateCategory , deleteCategory} = require("../controllers/categoryController");
const express = require("express");
const router = express.Router();
router.post("/" , createCategory);
router.get("/", getCategories,);
router.get("/:id", getCategory);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);
module.exports = router;
