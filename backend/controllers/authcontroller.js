const User = require("../models/User");
const bcrypt = require("bcryptjs");
exports.register = async (req , res ) => {
    try {
const {name,email,password} = req.body;
if (!name || !email || !password){
    return res.status(400).json({
        success : false,
        message : "please enter the all requires fields "
    });
}
const existingUser = await User.findOne({
    email : email
});

if (existingUser) {
    return res.status(400).json({
        success: false,
        message : "user already exists "
    });
}
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(password, salt);
const user = await User.create({
    name,
    email : email,
    password : hashedPassword 
});
return res.status(201).json({
    success : true,
    message : "registration successeful",
    user : {
        id: user._id,
        name : user.name,
        email : user.email,
    
    }
});
 } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }

};