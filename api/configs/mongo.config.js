const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://d2y:8ibVFEaZRa2JgznP@cluster0.kcyvmts.mongodb.net/chat-app?retryWrites=true"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
};

module.exports = connectMongo;
