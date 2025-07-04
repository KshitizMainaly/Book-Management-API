import axios from 'axios';
import { toast } from 'react-hot-toast';

// ✅ Base URL
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1';

// ✅ Protected instance
const API = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// ✅ Public instance (no token)
const publicAPI = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' }
});

// ✅ Attach JWT only to protected instance
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Global error toast
const errorHandler = (error) => {
  const message = error.response?.data?.error || 'An error occurred';
  toast.error(message);
  return Promise.reject(error);
};

API.interceptors.response.use((res) => res, errorHandler);
publicAPI.interceptors.response.use((res) => res, errorHandler);

// ==============================
// ✅ Auth
export const login = (credentials) => API.post('/auth/login', credentials);
export const register = (userData) => API.post('/auth/register', userData);
export const getMe = () => API.get('/auth/me');

// ==============================
// ✅ Books
export const fetchBooks = (params = {}) => publicAPI.get('/books', { params });
export const fetchBook = (id) => publicAPI.get(`/books/${id}`);
export const createBook = (bookData) => API.post('/books', bookData);
export const updateBook = (id, bookData) => API.put(`/books/${id}`, bookData);
export const deleteBook = (id) => API.delete(`/books/${id}`);

// ✅ Reviews
export const fetchReviews = (bookId) => publicAPI.get(`/reviews/${bookId}/reviews`);
export const createReview = (bookId, reviewData) => API.post(`/reviews/${bookId}/reviews`, reviewData);
export const updateReview = (id, reviewData) => API.put(`/reviews/${id}`, reviewData);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);

// ✅ Admin
export const fetchUsers = () => API.get('/admin/users');
export const updateUserRole = (id, role) => API.patch(`/admin/users/${id}`, { role });
