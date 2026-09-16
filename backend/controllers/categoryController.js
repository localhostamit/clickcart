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
 exports.getCategory = async (req, res) => {
    try {
        const id = req.params.id;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            category
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, description, image } = req.body;

        const category = await Category.findByIdAndUpdate(
            id,
            {
                name,
                description,
                image
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category updated successfully",
            category
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.deleteCategory = async (req, res) => {
    try {
        const id = req.params.id;

        const category = await Category.findByIdAndDelete(id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Category deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};