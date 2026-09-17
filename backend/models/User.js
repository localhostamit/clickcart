const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    password : String,
    createdAt:{
        type: Date,
        default : Date.now
    },
    email : String,
    phone: String,
    address: String,
   role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
}

});
module.exports = mongoose.model("User", UserSchema);