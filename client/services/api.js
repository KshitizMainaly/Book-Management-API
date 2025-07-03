import axios from "axios";
import { toast } from "react-hot-toast";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api/v1",
});

// Add JWT token to requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
API.interceptors.response.use(
  (response) => response,
  (error) => {
    toast.error(error.response?.data?.error || "Server error");
    return Promise.reject(error);
  }
);

export const fetchBooks = (params = {}) => API.get("/books", { params });
export const createBook = (bookData) => API.post("/books", bookData);
export const login = (credentials) => API.post("/auth/login", credentials);
// Add other endpoints...
