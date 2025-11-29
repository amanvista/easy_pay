import { authApi } from './createApi';

const authService = {
  // Login with email and password
  login: async (email, password) => {
    const response = await authApi.post('/login', { email, password });
    return response.data;
  },
  
  // Register with name, email, and password (phone is optional for backward compatibility)
  register: async (name, phone, email = '', password) => {
    const response = await authApi.post('/register', { name, phone, email, password });
    return response.data;
  },
  
  // Get user profile using token (token is automatically added by interceptor)
  getProfile: async () => {
    const response = await authApi.get('/profile');
    return response.data;
  },
  
  // Update user profile
  updateProfile: async (profileData) => {
    const response = await authApi.put('/profile', profileData);
    return response.data;
  }
};

export default authService;