// src/components/Navbar.jsx

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { User } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold hover:text-gray-300">
          📚 BookStore
        </Link>

        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="hover:text-gray-300 transition-colors duration-200"
          >
            Browse
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin/dashboard"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Admin
                </Link>
              )}

              {user.role !== "admin" && (
                <Link
                  to="/dashboard"
                  className="hover:text-gray-300 transition-colors duration-200"
                >
                  Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Logout
              </button>

              <span className="ml-2 flex items-center gap-2 px-3 py-1 bg-gray-700 rounded-full text-sm">
                <User className="w-4 h-4" />
                {user.name}
              </span>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="hover:text-gray-300 transition-colors duration-200"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-white text-black px-4 py-1 rounded-md hover:bg-gray-200 transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
