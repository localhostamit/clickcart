const mongoose = require('mongoose');
const connectDB = async () => {
    try{
        console.log(process.env.MONGO_URL);
    await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected successfully");

}
catch (error) {
    console.error(error);
}

}
module.exports = connectDB;
