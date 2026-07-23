import mongoose from "mongoose"
const CategoriesSchema = new mongoose.Schema({
    name : String,
    description : String,
    image : String 
});

