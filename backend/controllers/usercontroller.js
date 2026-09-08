const User = require("../models/User");
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
exports.updateProfile = async (req ,res ) =>{
try{
    const {name,email} = req.body;
    const user = await User.findById(req.user.userId);
 if(!user) {
    return res.status(404).json({
        success : false,
        message : "user does not exists"
    });
    if (name)
         { user.name = name;}
    if(email){
        user.email = email;
    }
    await user.save();
 }
 return res.status(200).json({
    success: true,
    message : " profile is updated succesfully ",
     user :{
        user : user._id,
        name : user.name,
        email : user.email
     }
 });
}
catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}; 