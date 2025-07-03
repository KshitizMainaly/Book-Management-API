import { useState } from 'react';
import { createBook, updateBook } from '../services/api';

export default function BookForm({ book, onSuccess }) {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    genre: book?.genre || 'Fiction',
    rating: book?.rating || 3,
    description: book?.description || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (book) {
        await updateBook(book._id, formData);
      } else {
        await createBook(formData);
      }
      onSuccess();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-bold mb-4">
        {book ? 'Edit Book' : 'Add New Book'}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Title, Author, Genre, Rating, Description fields */}
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        {/* Other fields... */}
      </div>

      <button
        type="submit"
        className="mt-4 bg-primary text-white py-2 px-4 rounded hover:bg-secondary"
      >
        {book ? 'Update' : 'Create'} Book
      </button>
    </form>
  );
}