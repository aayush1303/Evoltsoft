import mongoose from 'mongoose';
import 'dotenv/config.js';

let isConnected = false;

export const connectDB = async () => {
  if (isConnected) {
    return; // Use existing connection
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      bufferCommands: false,
    });
    isConnected = true;
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    throw error; // important to let the caller know
  }
};
