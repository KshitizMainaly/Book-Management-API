import { useState, useEffect } from 'react';
import { fetchBooks } from '../services/api';
import ReviewForm from '../components/ReviewForm';
import StarRating from '../components/StarRating';

function Review({ review }) {
  const [likes, setLikes] = useState(review.likes || 0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
      // TODO: call backend to persist likes
    }
  };

  return (
    <div className="border-b border-gray-200 py-3">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{review.user?.name || 'Anonymous'}</h4>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-gray-700 mt-1">{review.text}</p>
      <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
        <span>{new Date(review.createdAt).toLocaleDateString()}</span>
        <button
          onClick={handleLike}
          disabled={liked}
          className={`flex items-center space-x-1 text-sm ${
            liked ? 'text-blue-500 cursor-default' : 'text-gray-400 hover:text-blue-600'
          }`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill={liked ? 'currentColor' : 'none'}
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
          <span>{likes}</span>
        </button>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadBooks = async () => {
    try {
      const { data } = await fetchBooks();
      setBooks(data.data || []);
    } catch (err) {
      console.error('Failed to load books:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Books & Reviews</h1>

      {books.length === 0 && (
        <p className="text-gray-500">No books available.</p>
      )}

      <div className="space-y-12">
        {books.map((book) => (
          <div
            key={book._id}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <h2 className="text-2xl font-bold mb-1">{book.title}</h2>
            <p className="text-gray-600 mb-3">by {book.author}</p>
            <div className="flex items-center space-x-2 mb-4">
              <StarRating rating={book.rating} />
              <span className="text-sm text-gray-500">Average Rating</span>
            </div>

            {/* Reviews */}
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-3">Reviews</h3>
              {book.reviews && book.reviews.length > 0 ? (
                <div className="divide-y divide-gray-200 max-h-64 overflow-y-auto">
                  {book.reviews.map((review) => (
                    <Review key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet. Be the first!</p>
              )}
            </div>

            {/* Add review form */}
            <ReviewForm bookId={book._id} onSuccess={loadBooks} />
          </div>
        ))}
      </div>
    </div>
  );
}
