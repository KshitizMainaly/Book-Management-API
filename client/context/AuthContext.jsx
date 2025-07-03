import { createContext, useState, useEffect, useContext } from "react";
import {
  getMe,
  login as apiLogin,
  register as apiRegister,
} from "../services/api";
import { useNavigate } from "react-router-dom";

// Create context
export const AuthContext = createContext();

// Context provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const { data } = await getMe();
        setUser(data.data);
      } catch (err) {
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (credentials) => {
    const { data } = await apiLogin(credentials);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    navigate("/books");
  };

  const register = async (userData) => {
    const { data } = await apiRegister(userData);
    localStorage.setItem("token", data.token);
    setUser(data.user);
    navigate("/books");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook for consuming context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
