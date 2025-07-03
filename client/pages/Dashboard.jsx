import { useState, useEffect } from 'react';
import { fetchBooks, deleteBook } from '../services/api';
import BookForm from '../components/BookForm';

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    const { data } = await fetchBooks();
    setBooks(data.data);
  };

  const handleDelete = async (id) => {
    await deleteBook(id);
    loadBooks();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
      
      <BookForm 
        book={editingBook} 
        onSuccess={() => {
          setEditingBook(null);
          loadBooks();
        }} 
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {books.map((book) => (
          <div key={book._id} className="border p-4 rounded-lg">
            <h3 className="font-bold">{book.title}</h3>
            <div className="flex space-x-2 mt-4">
              <button 
                onClick={() => setEditingBook(book)}
                className="text-sm bg-blue-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button 
                onClick={() => handleDelete(book._id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}