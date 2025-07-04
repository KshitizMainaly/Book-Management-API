import { useState, useEffect } from 'react';
import { createBook, updateBook } from '../services/api';

export default function BookForm({ book, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: 'Fiction',
    rating: 3,
    description: '',
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        genre: book.genre || 'Fiction',
        rating: book.rating || 3,
        description: book.description || '',
      });
    } else {
      setFormData({
        title: '',
        author: '',
        genre: 'Fiction',
        rating: 3,
        description: '',
      });
    }
  }, [book]);

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
    <form
      onSubmit={handleSubmit}
      className="mb-8 p-6 bg-gray-100 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-bold mb-4">
        {book ? 'Edit Book' : 'Add New Book'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1">Genre</label>
          <input
            type="text"
            value={formData.genre}
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block mb-1">Rating</label>
          <input
            type="number"
            min="1"
            max="5"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: Number(e.target.value) })
            }
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full p-2 border rounded"
            rows="3"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          {book ? 'Update Book' : 'Create Book'}
        </button>

        {book && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
