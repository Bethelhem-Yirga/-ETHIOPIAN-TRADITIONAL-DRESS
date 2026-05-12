// src/services/authService.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

class AuthService {
  // Register user
  async register(userData) {
    try {
      console.log('📝 Registering user:', { email: userData.email, name: userData.name });
      
      const response = await fetch(`${API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      console.log('📝 Register response:', data);
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('✅ User registered and stored in localStorage');
      } else {
        console.error('❌ Registration failed:', data.message);
      }
      
      return data;
    } catch (error) {
      console.error('❌ Registration network error:', error);
      return { success: false, message: error.message };
    }
  }

  // Login user
  async login(credentials) {
    try {
      console.log('🔐 Logging in:', credentials.email);
      
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      console.log('🔐 Login response:', { success: data.success, message: data.message });
      
      if (data.success) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        console.log('✅ User logged in and stored in localStorage');
      } else {
        console.error('❌ Login failed:', data.message);
      }
      
      return data;
    } catch (error) {
      console.error('❌ Login network error:', error);
      return { success: false, message: error.message };
    }
  }

  // Get current user
  async getCurrentUser() {
    const token = this.getToken();
    if (!token) {
      console.log('No token found, user not authenticated');
      return null;
    }
    
    try {
      console.log('👤 Fetching current user...');
      const response = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      console.log('👤 Get user response:', { success: data.success, hasUser: !!data.user });
      
      if (data.success) {
        return data.user;
      } else {
        console.warn('Token invalid, logging out');
        this.logout();
        return null;
      }
    } catch (error) {
      console.error('❌ Get current user error:', error);
      this.logout();
      return null;
    }
  }

  // Update user profile
  async updateProfile(userData) {
    const token = this.getToken();
    if (!token) return { success: false, message: 'Not authenticated' };
    
    try {
      console.log('✏️ Updating profile...');
      const response = await fetch(`${API_URL}/auth/updatedetails`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      
      const data = await response.json();
      console.log('✏️ Update profile response:', { success: data.success });
      
      if (data.success) {
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    } catch (error) {
      console.error('❌ Update profile error:', error);
      return { success: false, message: error.message };
    }
  }

  // Update password
  async updatePassword(passwordData) {
    const token = this.getToken();
    if (!token) return { success: false, message: 'Not authenticated' };
    
    try {
      console.log('🔑 Updating password...');
      const response = await fetch(`${API_URL}/auth/updatepassword`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });
      
      const data = await response.json();
      console.log('🔑 Update password response:', { success: data.success });
      
      if (data.success && data.token) {
        localStorage.setItem('token', data.token);
      }
      
      return data;
    } catch (error) {
      console.error('❌ Update password error:', error);
      return { success: false, message: error.message };
    }
  }

  // Logout
  logout() {
    console.log('🚪 Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('✅ User logged out');
  }

  // Get token
  getToken() {
    return localStorage.getItem('token');
  }

  // Check if user is authenticated
  isAuthenticated() {
    const hasToken = !!this.getToken();
    console.log('🔍 Authentication check:', hasToken);
    return hasToken;
  }

  // Get user
  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}

export default new AuthService();