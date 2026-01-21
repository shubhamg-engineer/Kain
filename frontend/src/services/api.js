import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const api = {
  // Auth endpoints
  login: (email, password) =>
    axios.post(`${API_URL}/auth/login`, { email, password }),

  register: (username, email, password) =>
    axios.post(`${API_URL}/auth/register`, { username, email, password }),

  // Progress endpoints
  getKainProgress: () =>
    axios.get(`${API_URL}/progress/kain`),

  getUserProgress: () =>
    axios.get(`${API_URL}/progress/user`, {
      headers: getAuthHeader()
    }),

  saveProgress: (data) =>
    axios.post(`${API_URL}/progress/save`, data, {
      headers: getAuthHeader()
    }),

  // Leaderboard endpoints
  getLeaderboard: (category) =>
    axios.get(`${API_URL}/leaderboard/${category}`),

  getImprovers: () =>
    axios.get(`${API_URL}/leaderboard/stats/improvers`),

  // Gallery endpoints
  getGallery: () =>
    axios.get(`${API_URL}/gallery`),

  uploadPhoto: (data) =>
    axios.post(`${API_URL}/gallery`, data, {
      headers: getAuthHeader()
    }),

  deletePhoto: (id) =>
    axios.delete(`${API_URL}/gallery/${id}`, {
      headers: getAuthHeader()
    }),

  // Blog endpoints
  getBlogPosts: () =>
    axios.get(`${API_URL}/blog`),

  getBlogPost: (id) =>
    axios.get(`${API_URL}/blog/${id}`),

  createBlogPost: (data) =>
    axios.post(`${API_URL}/blog`, data, {
      headers: getAuthHeader()
    }),

  updateBlogPost: (id, data) =>
    axios.put(`${API_URL}/blog/${id}`, data, {
      headers: getAuthHeader()
    }),

  deleteBlogPost: (id) =>
    axios.delete(`${API_URL}/blog/${id}`, {
      headers: getAuthHeader()
    }),

  // User settings
  updateSettings: (data) =>
    axios.put(`${API_URL}/auth/settings`, data, {
      headers: getAuthHeader()
    })
};