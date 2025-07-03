import { useState, useEffect } from 'react';
import { fetchBooks } from '../services/api';

export default function useBooks(searchTerm = '') {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const params = searchTerm ? { keyword: searchTerm } : {};
        const { data } = await fetchBooks(params);
        setBooks(data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [searchTerm]);

  return { books, loading };
}