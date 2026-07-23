import mongoose from "mongoose";
const ProductSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    stock : Number,
    image : String,
     category : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
});