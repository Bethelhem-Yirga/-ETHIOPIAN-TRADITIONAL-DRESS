// backend/test-mongo.js
const mongoose = require('mongoose');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/kuta_collections';

async function testConnection() {
  console.log('🔌 Testing MongoDB connection...');
  console.log(`📊 URI: ${MONGODB_URI}`);
  
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Successfully connected to MongoDB!');
    
    // Get connection info
    console.log(`📚 Database: ${mongoose.connection.name}`);
    console.log(`📍 Host: ${mongoose.connection.host}:${mongoose.connection.port}`);
    
    // Test schema
    const testSchema = new mongoose.Schema({
      name: String,
      createdAt: { type: Date, default: Date.now }
    });
    const Test = mongoose.model('Test', testSchema);
    
    // Insert test data
    const result = await Test.create({ name: 'KUTA Collections Test' });
    console.log('📝 Test document created:', result._id);
    
    // Retrieve data
    const found = await Test.findById(result._id);
    console.log('🔍 Retrieved:', found.name);
    
    // Clean up
    await Test.deleteMany({});
    console.log('🧹 Cleaned up test data');
    
    await mongoose.disconnect();
    console.log('✅ Test completed successfully! 🎉');
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();