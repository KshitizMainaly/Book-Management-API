import { login as apiLogin, register as apiRegister } from "../services/api";
import { createContext, useState, useEffect, useContext } from "react";
import { getMe } from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

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
        // If 401 Unauthorized, silently clear user and token without logging error
        if (err.response && err.response.status === 401) {
          localStorage.removeItem("token");
          setUser(null);
        } else {
          // For other errors, you can log if you want
          console.error("getMe error:", err);
        }
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (credentials) => {
    try {
      const { data } = await apiLogin(credentials);
      console.log(data)
      localStorage.setItem("token", data.token);
      setUser(data.user);

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
      return data.user;
    } catch (err) {
      throw err; // re-throw for UI handling
    }
  };

  const register = async (userData) => {
    try {
      const { data } = await apiRegister(userData);
      localStorage.setItem("token", data.token);
      setUser(data.user);

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/dashboard");
      }
      return data.user;
    } catch (err) {
      throw err; // re-throw for UI handling
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user,
    isAdmin: user?.role === "admin",
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};


