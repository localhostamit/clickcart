const Product = require("../models/Product");
exports.createProduct = async (req ,res) =>
{
    try{

        const{name , price , description , stock , image ,category }= req.body
         if(!name || !price || !stock || !category) {
            return res.status(400).json({
                success : false,
                message : "please enter all required fields"

            });
        }const product = await Product.create({
                name,
                price,
                description,
                stock,image,
                category

            });
         
         return res.status(201).json({
            success : true,
            message : "Product Added succesfully",
            product
         });
    }
    catch(error){
        return res.status(500).json({
            success:false ,
        message : error.message        });

    }

}
exports.getProducts = async(req,res)=>
{
    try{
const products = await Product.find().populate("category", "name");
return res.status(200).json({
    success : true,
    count : products.length,
    products
});

    }
    catch(error){
        return res.status(500).json({
            success : false,
            message : error.message
        });
    }
}
exports.getProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findById(id).populate("category", "name");

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            product
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
exports.updateProduct = async (req,res)=>
{
    try{
        const id = req.params.id;
        const {name, price,description,stock,image,category} = req.body;
const product = await Product.findByIdAndUpdate(
    id,
    {
        name,price
        ,description,stock,image,category
    },
    {
        new : true,
        runValidators : true
    }
);      
if(!product){
    return res.status(404).json({
        success : false,
        message : "Product not found"

    });
}  
return res.status(200).json({
    success : true,
    message : " Product Updated Succesfully",
    product
});

    }
    catch(error){
        return res.status(500).json({
            success:false,
            message : error.message
        });
    }
}
exports.deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;

        const product = await Product.findByIdAndDelete(id);

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};