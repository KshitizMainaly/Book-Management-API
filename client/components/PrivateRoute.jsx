import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return null; // Or a spinner/loading UI

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
