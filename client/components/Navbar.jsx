import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      localStorage.removeItem("token");
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-gray-800">
          BookStore
        </Link>

        <div className="flex items-center space-x-4">
          <Link to="/books" className="text-gray-600 hover:text-primary">
            Browse
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/dashboard"
                  className="text-gray-600 hover:text-primary"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="text-gray-600 hover:text-primary"
              >
                Logout
              </button>
              <span className="text-sm bg-primary text-white px-2 py-1 rounded-full">
                {user.name}
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-primary">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-primary text-white px-3 py-1 rounded-md hover:bg-secondary"
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
