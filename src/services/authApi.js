import axios from 'axios';

const API_URL = 'http://localhost/easy_pay_backend/api/auth';

const authApi = {
  // Login with email and password
  login: async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  },
  // Register with name, email, and password (phone is optional for backward compatibility)
  register: async (name, phone, email = '', password) => {
    const response = await axios.post(`${API_URL}/register`, { name, phone, email, password });
    return response.data;
  },
  
  // Get user profile using token
  getProfile: async (token) => {
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default authApi;