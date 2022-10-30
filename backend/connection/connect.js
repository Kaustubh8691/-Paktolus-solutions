const mongoose = require("mongoose");

const connectDB = async (url) => {
  //for cluster connect
  await mongoose.connect(url);
  
// for shell connect
  // await mongoose.connect("mongodb://localhost:27017/freJun");
};

module.exports = connectDB;
 