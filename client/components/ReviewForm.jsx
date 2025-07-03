import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { createReview } from '../services/api';

export default function ReviewForm({ bookId }) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState(5);
  const { user } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createReview(bookId, { text, rating });
      setText('');
      // Refresh reviews list
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return null;

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h3 className="font-medium mb-2">Add Your Review</h3>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full p-2 border rounded mb-2"
        rows="3"
        required
      />
      <div className="flex items-center justify-between">
        <StarRating 
          rating={rating} 
          editable={true} 
          onRatingChange={setRating} 
        />
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
}