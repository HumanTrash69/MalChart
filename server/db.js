const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/malchart';

let isConnected = false;

const connectDB = async () => {
  // If MongoDB URI is not provided, skip connection
  if (!process.env.MONGODB_URI) {
    console.log('MongoDB URI not provided - running without persistent storage');
    return false;
  }

  // If already connected, return
  if (isConnected) {
    return true;
  }

  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    isConnected = true;
    console.log('MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.log('Continuing without persistent storage (cache only)');
    return false;
  }
};

const isDBConnected = () => isConnected;

module.exports = { connectDB, isDBConnected };
