const User = require("../models/User");
const bcrypt = require("bcryptjs");
exports.getProfile = async (req , res) =>{
    try{
        const user = await User.findById(req.user.userId)
        .select("-password");
        if(!user){
            return res.status(404).json({
                success : false,
                message : "user not found "
            });
        }
        return res.status(200).json({
            success : true,
            user : {
                id : user._id,
                name : user.name,
                email : user.email
            }
        });
    }
    catch(error){
        return res.status(500).json({
            success: false,
            message : error.message
        });
    }
};
exports.updateProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        console.log(req.body);

        const user = await User.findById(req.user.userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User does not exist"
            });
        }

        if (name) {
            user.name = name;
        }

        if (email) {
            user.email = email;
        }

        console.log("Before save:", user.name, user.email);

        await user.save();

        console.log("After save:", user.name, user.email);

        return res.status(200).json({
            success: true,
            message: "Profile is updated successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.changePassword = async (req,res) => {
    try{
        const {currentPassword , newPassword } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user){
            return res.status(404).json({
                success : false,
                message : "user not found "
            });
        }
        const isPasswordCorrect = await bcrypt.compare(
            currentPassword,
            user.password

        );
        if (!isPasswordCorrect){
            return res.status(401).json({
                success : false,
                message : " current password is incorrect"
            });
        }

       
        const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save()
    return res.status(200).json({
        success : true,
        message : " Password changed succesfully"
    });
    }
    catch(error){return res.status(500).json({
            success: false,
            message: error.message
        });

    }
}