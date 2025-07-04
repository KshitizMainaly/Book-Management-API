import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute() {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return null; // Or a spinner/loading UI

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return <Outlet />;
}
