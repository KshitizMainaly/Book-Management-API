import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

const API = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

const publicAPI = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Remove toast calls here, just propagate error
API.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

publicAPI.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject(error)
);

// === AUTH ===
export const login = (credentials) => API.post("/auth/login", credentials);
export const register = (userData) =>
  publicAPI.post("/auth/register", userData);
export const getMe = () => API.get("/auth/me");

// === BOOKS ===
export const fetchBooks = (params = {}) => publicAPI.get("/books", { params });
export const fetchBook = (id) => publicAPI.get(`/books/${id}`);
export const createBook = (bookData) => API.post("/books", bookData);
export const updateBook = (id, bookData) => API.put(`/books/${id}`, bookData);
export const deleteBook = (id) => API.delete(`/books/${id}`);

// === REVIEWS ===
export const fetchReviews = (bookId) => publicAPI.get(`/reviews/${bookId}`);
export const createReview = (bookId, reviewData) =>
  API.post(`/reviews/${bookId}`, reviewData);
export const updateReview = (id, reviewData) =>
  API.put(`/reviews/${id}`, reviewData);
export const deleteReview = (id) => API.delete(`/reviews/${id}`);

export const fetchMyReviews = () => API.get("/reviews/me");

// === ADMIN ===
export const fetchUsers = () => API.get("/admin/users");
export const updateUserRole = (id, role) =>
  API.patch(`/admin/users/${id}`, { role });
