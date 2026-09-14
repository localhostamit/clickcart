const Category = require("../models/Categories");
exports.createCategory = async (req , res) =>
{
    try{
        const {name , description , image} = req.body;
        if(!name){
            return res.status(400).json({
                success: false,
                message: "category name is required"
            });
        }
        const category = await Category.create({
            name,
            description,
            image
        });
        return res.status(201).json({
            success: true,
            message: "category created succesfully",
            category

        
        });


    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
}
 exports.getCategories = async (req , res ) =>
 {
    try{
 
        const categories = await Category.find();

        return res.status(200).json({
            success: true,
            categories
        });
    }
    catch(error){
        return res.status(500).json({
            success:true,
            message : error.message
        });
    }
 }