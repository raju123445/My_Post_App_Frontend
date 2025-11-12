import axios from 'axios';
import toast from 'react-hot-toast';
import { create } from 'zustand';
import { apiUrl } from '../utils/constants';
import logger from '../utils/logger';

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  error: null,
  
  // Register user
  register: async (userData) => {
    try {
      set({ loading: true, error: null });
      logger.auth.register(userData.email);
  const response = await axios.post(`${apiUrl}/auth/register`, userData);
  // Server may return either { user, token } or a flat object with user fields + token
  const { token, user: userFromResponse, ...rest } = response.data;
  const user = userFromResponse || rest;

  // Store token in localStorage
  if (token) localStorage.setItem('token', token);

  // Set user in store
  set({ user, loading: false });
      logger.auth.registerSuccess(user);
      toast.success('Registration successful!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Registration failed';
      logger.auth.registerError(error);
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  
  // Login user
  login: async (credentials) => {
    try {
      set({ loading: true, error: null });
      logger.auth.login(credentials.email);
  const response = await axios.post(`${apiUrl}/auth/login`, credentials);
  // Server may return either { user, token } or a flat object with user fields + token
  const { token, user: userFromResponse, ...rest } = response.data;
  const user = userFromResponse || rest;

  // Store token in localStorage
  if (token) localStorage.setItem('token', token);

  // Set user in store
  set({ user, loading: false });
      logger.auth.loginSuccess(user);
      toast.success('Login successful!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed';
      logger.auth.loginError(error);
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  
  // Load user from token
  loadUser: async () => {
    try {
      logger.auth.loadUser();
      const token = localStorage.getItem('token');
      if (token) {
        // Set auth token header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        const response = await axios.get(`${apiUrl}/auth/profile`);
        logger.auth.loadUserSuccess(response.data);
        set({ user: response.data, loading: false });
      } else {
        set({ loading: false });
      }
    } catch (error) {
      logger.auth.loadUserError(error);
      console.error('Error loading user:', error);
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      set({ user: null, loading: false });
    }
  },
  
  // Update user profile
  updateProfile: async (profileData) => {
    try {
      set({ loading: true, error: null });
      const response = await axios.put(`${apiUrl}/auth/profile`, profileData);
      set({ user: response.data, loading: false });
      toast.success('Profile updated successfully!');
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Profile update failed';
      set({ error: errorMessage, loading: false });
      toast.error(errorMessage);
      return { success: false, error: errorMessage };
    }
  },
  
  // Logout user
  logout: () => {
    logger.auth.logout();
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    set({ user: null, loading: false });
    toast.success('Logged out successfully!');
  },
  
  // Clear errors
  clearError: () => set({ error: null })
}));

export { useAuthStore };

