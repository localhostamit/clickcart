const mongoose = require('mongoose');
const connectDB = async () => {
    try{
    await mongoose.connect("mongodb://127.0.0.1:27017/clickcartdatabase");
    console.log("mongodb connected successfully");

}
catch(error){
    console.error("mongodb connection failed",error.message);

}

}
export default connectDB;