// Simple API test script
const fetch = require('node-fetch');

const API_BASE_URL = 'http://localhost:3001/api';

async function testHealthCheck() {
  try {
    console.log('Testing health check...');
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    console.log('✅ Health check:', data);
    return response.ok;
  } catch (error) {
    console.log('❌ Health check failed:', error.message);
    return false;
  }
}

async function runTests() {
  console.log('🚀 Starting API tests...\n');

  const healthOk = await testHealthCheck();

  if (healthOk) {
    console.log('\n✅ All basic tests passed!');
    console.log('💡 To test authenticated endpoints, you need to:');
    console.log('   1. Start the backend: npm run dev');
    console.log('   2. Register/login a user');
    console.log('   3. Use the returned JWT token for authenticated requests');
  } else {
    console.log('\n❌ Basic tests failed. Make sure the backend is running.');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests();
}

module.exports = { testHealthCheck, runTests };
