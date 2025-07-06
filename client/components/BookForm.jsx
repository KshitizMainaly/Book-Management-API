import { useState, useEffect } from 'react';
import { createBook, updateBook } from '../services/api';

const GENRES = [
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

export default function BookForm({ book, onSuccess, onCancel }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [publishedDate, setPublishedDate] = useState('');
  const [rating, setRating] = useState(3);
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (book) {
      setTitle(book.title);
      setAuthor(book.author);
      setGenre(book.genre);
      setPublishedDate(book.publishedDate?.substring(0, 10) || '');
      setRating(book.rating || 3);
      setDescription(book.description);
    } else {
      setTitle('');
      setAuthor('');
      setGenre('');
      setPublishedDate('');
      setRating(3);
      setDescription('');
    }
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const payload = {
        title,
        author,
        genre,
        publishedDate,
        rating,
        description,
      };

      if (book) {
        await updateBook(book._id, payload);
      } else {
        await createBook(payload);
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-4xl mx-auto mb-10 p-6 border border-gray-200 rounded-lg shadow bg-white"
    >
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {book ? 'Edit Book' : 'Add New Book'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Book Title"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Author</label>
          <input
            type="text"
            value={author}
            required
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Author"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Genre</label>
          <select
            value={genre}
            required
            onChange={(e) => setGenre(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded bg-white"
          >
            <option value="" disabled>Select genre</option>
            {GENRES.map((g) => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Published Date</label>
          <input
            type="date"
            value={publishedDate}
            required
            onChange={(e) => setPublishedDate(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700">Rating (1–5)</label>
          <input
            type="number"
            value={rating}
            min={1}
            max={5}
            step={0.1}
            required
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Rating"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            required
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Description"
          ></textarea>
        </div>
      </div>

      <div className="flex gap-2 mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {book ? 'Update Book' : 'Create Book'}
        </button>
        {book && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

