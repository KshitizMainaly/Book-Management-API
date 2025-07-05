import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

export default function StarRating({ rating, editable = false, onRatingChange }) {
  const [hover, setHover] = useState(null);

  const displayRating = editable ? hover ?? rating : rating;

  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`focus:outline-none ${
            editable ? 'cursor-pointer' : 'cursor-default'
          }`}
          onClick={() => editable && onRatingChange(star)}
          onMouseEnter={() => editable && setHover(star)}
          onMouseLeave={() => editable && setHover(null)}
        >
          <FaStar
            className={`w-6 h-6 transition-colors ${
              star <= displayRating ? 'text-yellow-400' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
