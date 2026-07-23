import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    password : String,
    createdAt:{
        type: Date,
        default : Date.now
    },
    Email : String,
    phone: String,
    address: String,
    role :{
        type: String,
      default: "customer"
    }

});