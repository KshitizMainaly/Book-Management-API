import { useState, useEffect } from 'react';
import { fetchBooks } from '../services/api';

export default function Dashboard() {
  const [books, setBooks] = useState([]);
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

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Books</h1>

      {books.length === 0 ? (
        <p className="text-center">No books available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books.map(book => (
            <div key={book._id} className="border p-4 rounded shadow hover:shadow-lg transition">
              <h3 className="font-bold text-lg">{book.title}</h3>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Genre: {book.genre}</p>
              <p className="text-gray-600">Rating: {book.rating}</p>
              <p className="mt-2 text-gray-700">{book.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
