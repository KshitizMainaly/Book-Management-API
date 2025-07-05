import { useState, useEffect } from 'react'; 
import { createBook, updateBook } from '../services/api';

export default function BookForm({ book, onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: 'Fiction',
    rating: 3,
    description: '',
    publishedDate: '',
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title || '',
        author: book.author || '',
        genre: book.genre || 'Fiction',
        rating: book.rating || 3,
        description: book.description || '',
        publishedDate: book.publishedDate
          ? new Date(book.publishedDate).toISOString().substring(0, 10)
          : '',
      });
    } else {
      // Reset form if no book is being edited
      setFormData({
        title: '',
        author: '',
        genre: 'Fiction',
        rating: 3,
        description: '',
        publishedDate: '',
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
      className="mb-8 p-6 bg-gray-50 rounded-lg shadow-md"
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
          <select
            value={formData.genre}
            onChange={(e) =>
              setFormData({ ...formData, genre: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            {[
              'Fiction',
              'Non-Fiction',
              'Science Fiction',
              'Fantasy',
              'Mystery',
              'Thriller',
              'Romance',
              'Biography',
              'History',
              'Self-Help',
              'Poetry',
              'Drama',
              'Horror',
              'Other',
            ].map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        <div>
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
            className="w-full p-2 border rounded"
            rows="4"
            required
          ></textarea>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-4 rounded hover:bg-secondary"
        >
          {book ? 'Update' : 'Create'} Book
        </button>
        {book && (
          <button
            type="button"
            onClick={onCancel}
            className= "text-gray-600 hover:underline"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

