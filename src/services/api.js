// src/services/api.js
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  
  return data;
};

// Products API
export const productAPI = {
  getAll: (params) => apiCall(`/products?${new URLSearchParams(params)}`),
  getById: (id) => apiCall(`/products/${id}`),
  create: (product) => apiCall('/products', { method: 'POST', body: JSON.stringify(product) }),
  update: (id, product) => apiCall(`/products/${id}`, { method: 'PUT', body: JSON.stringify(product) }),
  delete: (id) => apiCall(`/products/${id}`, { method: 'DELETE' })
};

// Orders API
export const orderAPI = {
  create: (order) => apiCall('/orders', { method: 'POST', body: JSON.stringify(order) }),
  getById: (id) => apiCall(`/orders/${id}`),
  getMyOrders: () => apiCall('/orders/myorders'),
  payOrder: (id, paymentResult) => apiCall(`/orders/${id}/pay`, { method: 'PUT', body: JSON.stringify(paymentResult) })
};

// Auth API
export const authAPI = {
  register: (userData) => apiCall('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials) => apiCall('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  getProfile: () => apiCall('/auth/profile'),
  updateProfile: (userData) => apiCall('/auth/profile', { method: 'PUT', body: JSON.stringify(userData) })
};

// Contact API
export const contactAPI = {
  send: (message) => apiCall('/contact', { method: 'POST', body: JSON.stringify(message) })
};