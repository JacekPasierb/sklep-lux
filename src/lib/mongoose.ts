// lib/mongoose.js
import mongoose from 'mongoose';

const connectMongoDB = async () => {
  if (mongoose.connection.readyState >= 1) return;

  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("MongoDB connected successfully!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};

export default connectMongoDB;
