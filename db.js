const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      "mongodb://test_user:password@mongo:27017/city"
    );
    console.log(`MongoDB Connected ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
