import { StarIcon } from '@heroicons/react/24/solid';

export default function StarRating({ 
  rating, 
  editable = false, 
  onRatingChange = () => {} 
}) {
  return (
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <button
          key={i}
          type={editable ? "button" : "div"}
          onClick={() => editable && onRatingChange(i + 1)}
          className="focus:outline-none"
        >
          <StarIcon
            className={`h-6 w-6 ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
          />
        </button>
      ))}
    </div>
  );
}