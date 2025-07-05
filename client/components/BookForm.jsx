import { useState } from 'react';
import { createBook, updateBook } from '../services/api';

export default function BookForm({ book, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: book?.title || '',
    author: book?.author || '',
    genre: book?.genre || 'Fiction',
    rating: book?.rating || 3,
    description: book?.description || '',
    publishedDate: book?.publishedDate ? book.publishedDate.slice(0, 10) : '',
  });

  const GENRE_OPTIONS = [
    "Fiction",
    "Non-Fiction",
    "Science Fiction",
    "Fantasy",
    "Mystery",
    "Thriller",
    "Romance",
    "Biography",
    "History",
    "Self-Help",
    "Poetry",
    "Drama",
    "horror",
    "Other",
  ];

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
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-gray-50 rounded-lg shadow">
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
          <select
            value={formData.genre}
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          >
            {GENRE_OPTIONS.map((genre) => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Rating (1–5)</label>
          <input
            type="number"
            value={formData.rating}
            onChange={(e) =>
              setFormData({ ...formData, rating: Number(e.target.value) })
            }
            min="1"
            max="5"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Published Date</label>
          <input
            type="date"
            value={formData.publishedDate}
            onChange={(e) =>
              setFormData({ ...formData, publishedDate: e.target.value })
            }
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows="4"
            className="w-full p-2 border rounded"
            required
          />
        </div>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded hover:bg-secondary"
        >
          {book ? 'Update' : 'Create'} Book
        </button>

        {book && onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

