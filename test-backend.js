const axios = require('axios');

// Test the backend health endpoint
async function testBackendHealth() {
  try {
    console.log('🔍 Testing backend health...');
    const response = await axios.get('http://localhost:5000/api/health');
    console.log('✅ Backend is healthy:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Backend health check failed:', error.message);
    return false;
  }
}

// Test the subscription endpoint
async function testSubscription() {
  try {
    console.log('🔍 Testing subscription endpoint...');
    const testData = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      martialArts: ['Boxing', 'MMA']
    };
    
    const response = await axios.post('http://localhost:5000/api/subscribe', testData);
    console.log('✅ Subscription test successful:', response.data);
    return true;
  } catch (error) {
    console.error('❌ Subscription test failed:', error.response?.data || error.message);
    return false;
  }
}

// Main test function
async function runTests() {
  console.log('🚀 Starting backend tests...\n');
  
  const healthOk = await testBackendHealth();
  if (!healthOk) {
    console.log('\n❌ Backend is not responding. Please check:');
    console.log('   1. Is the backend server running? (npm run server)');
    console.log('   2. Is MongoDB connected?');
    console.log('   3. Are there any errors in the backend console?');
    return;
  }
  
  console.log('\n✅ Backend is responding. Testing subscription...\n');
  
  const subscriptionOk = await testSubscription();
  if (subscriptionOk) {
    console.log('\n🎉 All tests passed! Your backend is working correctly.');
  } else {
    console.log('\n⚠️  Subscription test failed. Check the backend logs for errors.');
  }
}

// Run tests if this file is executed directly
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { testBackendHealth, testSubscription };

