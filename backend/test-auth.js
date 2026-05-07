// test-auth.js - Test authentication endpoints
const API_URL = 'http://localhost:5000/api';

async function testAuth() {
  try {
    // 1. Register a new user
    console.log('📝 Registering user...');
    const registerRes = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        phone: '0912345678'
      })
    });
    const registerData = await registerRes.json();
    console.log('Register Response:', registerData);
    
    if (!registerData.success) {
      console.log('User might already exist, trying login...');
    }
    
    // 2. Login
    console.log('\n🔐 Logging in...');
    const loginRes = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'password123'
      })
    });
    const loginData = await loginRes.json();
    console.log('Login Response:', loginData);
    
    if (loginData.success) {
      const token = loginData.token;
      
      // 3. Get current user profile (protected route)
      console.log('\n👤 Getting user profile...');
      const profileRes = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const profileData = await profileRes.json();
      console.log('Profile:', profileData);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testAuth();