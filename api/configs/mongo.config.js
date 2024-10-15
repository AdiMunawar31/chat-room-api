const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/chat-app");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectMongo;
