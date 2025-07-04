import { useEffect, useState } from 'react';
import BookCard from '../components/BookCard';
import { fetchBooks } from '../services/api';

export default function Books() {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const loadBooks = async () => {
        try {
          const params = searchTerm ? { keyword: searchTerm } : {};
          const { data } = await fetchBooks(params);
          setBooks(data.data);
          console.log('Books loaded:', data.data);
          

        } catch (err) {
          console.error(err);
        }
      };
      loadBooks();
    }, 500); // wait 500ms

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
    
      <input
        type="text"
        placeholder="Search books..."
        className="w-full p-2 mb-6 border rounded-lg"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <BookCard key={book._id} book={book} />
        ))}
      </div>
    </div>
  );
}
