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
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return;
    await deleteBook(id);
    loadBooks();
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <BookForm
        book={editingBook}
        onSuccess={() => {
          setEditingBook(null);
          loadBooks();
        }}
        onCancel={() => setEditingBook(null)}
      />

      {loading ? (
        <div>Loading books...</div>
      ) : books.length === 0 ? (
        <div>No books found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map((book) => (
            <div
              key={book._id}
              className="border border-gray-300 rounded-lg p-4 shadow-md bg-white"
            >
              <h3 className="font-bold text-lg">{book.title}</h3>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Genre: {book.genre}</p>
              <p className="text-gray-600">Rating: {book.rating}</p>
              <p className="text-gray-700 mt-2">{book.description}</p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => handleEdit(book)}
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(book._id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 text-sm"
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

