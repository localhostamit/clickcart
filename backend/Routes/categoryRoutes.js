const {createCategory , getCategories} = require("../controllers/categoryController");
const express = require("express");
const router = express.Router();
router.post("/" , createCategory);
router.get("/", getCategories);
module.exports = router;
