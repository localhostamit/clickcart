const express = require("express");
const router = express.Router();
const {register,login} = require("../controllers/authcontroller");
const auth = require("../middleware/auth");
router.post("/register",register);
router.post("/login",login);
router.get("/profile",auth,(req,res)=>{
    res.json({
        success: true,
        message: "you are auhenticated",
        userId : req.user.userId
    });
});
module.exports = router;

