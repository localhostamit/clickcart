const {createCategory} = require("../controllers/categoryController");
const express = require("express");
const router = express.Router();
router.post("/" , createCategory);
module.exports = router;
