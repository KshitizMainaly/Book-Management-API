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
      alert('Failed to save book');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-6 bg-white rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-xl font-bold mb-6">{book ? 'Edit Book' : 'Add New Book'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={e => setFormData({ ...formData, title: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Author</label>
          <input
            type="text"
            value={formData.author}
            onChange={e => setFormData({ ...formData, author: e.target.value })}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Genre</label>
          <select
            value={formData.genre}
            onChange={e => setFormData({ ...formData, genre: e.target.value })}
            className="w-full p-2 border rounded"
          >
            <option>Fiction</option>
            <option>Non-fiction</option>
            <option>Science Fiction</option>
            <option>Biography</option>
            <option>History</option>
            <option>Fantasy</option>
            <option>Mystery</option>
            <option>Romance</option>
            <option>Self-help</option>
          </select>
        </div>

        <div>
          <label className="block mb-1 font-semibold">Rating</label>
          <input
            type="number"
            min={1}
            max={5}
            value={formData.rating}
            onChange={e => setFormData({ ...formData, rating: Number(e.target.value) })}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            value={formData.description}
            onChange={e => setFormData({ ...formData, description: e.target.value })}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 bg-indigo-600 text-white py-2 px-6 rounded hover:bg-indigo-700 transition"
      >
        {book ? 'Update' : 'Create'} Book
      </button>
    </form>
  );
}
