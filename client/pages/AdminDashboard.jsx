import { useState, useEffect } from 'react';
import { fetchBooks, deleteBook } from '../services/api';
import BookForm from '../components/BookForm';

export default function AdminDashboard() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const { data } = await fetchBooks();
      setBooks(data.data || []);
    } catch (err) {
      console.error(err);
      alert('Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    try {
      await deleteBook(id);
      loadBooks();
    } catch {
      alert('Failed to delete book');
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <BookForm
        book={editingBook}
        onSuccess={() => {
          setEditingBook(null);
          loadBooks();
        }}
      />

      {books.length === 0 ? (
        <p className="text-center mt-8">No books found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {books.map(book => (
            <div key={book._id} className="border p-4 rounded shadow hover:shadow-lg transition">
              <h3 className="font-bold text-lg">{book.title}</h3>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Genre: {book.genre}</p>
              <p className="text-gray-600">Rating: {book.rating}</p>
              <p className="mt-2 text-gray-700">{book.description}</p>
              <div className="flex space-x-2 mt-4">
                <button
                  onClick={() => setEditingBook(book)}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="text-sm bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
