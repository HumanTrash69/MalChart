/**
 * Utility script to clear the database
 * Run with: node server/utils/clearDatabase.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/malchart';

async function clearDatabase() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collections = await db.listCollections().toArray();
    
    console.log(`Found ${collections.length} collections`);
    
    for (const collection of collections) {
      console.log(`Dropping collection: ${collection.name}`);
      await db.dropCollection(collection.name);
    }
    
    console.log('✅ Database cleared successfully!');
    console.log('All collections have been dropped.');
    console.log('Restart the server to fetch fresh data.');
    
  } catch (error) {
    console.error('❌ Error clearing database:', error);
  } finally {
    await mongoose.connection.close();
    console.log('Connection closed');
    process.exit(0);
  }
}

clearDatabase();
