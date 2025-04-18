import axios from 'axios';

const API_URL = 'http://localhost/easy_pay_backend/api/auth';

const authApi = {
  login: async (phone, password) => {
    const response = await axios.post(`${API_URL}/login`, { phone, password });
    return response.data;
  },
  register: async (name,phone, email='',password) => {
    const response = await axios.post(`${API_URL}/register`, {name, phone,email, password });
    return response.data;
  },
  
  getProfile: async (token) => {
    const response = await axios.get(`${API_URL}/me`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};

export default authApi;