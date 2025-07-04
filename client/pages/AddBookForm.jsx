// src/pages/AddBookForm.jsx

import BookForm from '../components/BookForm';

export default function AddBookForm() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Book</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
        <BookForm />
      </div>
    </div>
  );
}
