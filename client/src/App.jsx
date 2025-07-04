import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import PrivateRoute from '../components/PrivateRoute';
import AdminRoute from '../components/AdminRoute'; // 👈 Bonus: For admin-only
import Navbar from '../components/Navbar';

import Books from '../pages/Books';
import BookDetails from '../pages/BookDetails'; // ✅ Add this page
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound'; // ✅ New 404 page

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Navbar />

        <Routes>
          {/* ✅ Public pages */}
          <Route path="/" element={<Books />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ✅ Protected pages (logged in) */}
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* ✅ Admin-only example */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/books/new" element={<div>Add New Book Page</div>} />
          </Route>

          {/* ✅ 404 fallback */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
