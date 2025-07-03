import StarRating from './StarRating';

export default function ReviewList({ reviews }) {
  return (
    <div className="space-y-4 mt-6">
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map((review) => (
          <div key={review._id} className="border-b border-gray-100 pb-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold">{review.user?.name || 'Anonymous'}</h4>
              <StarRating rating={review.rating} />
            </div>
            <p className="text-gray-600 mt-1">{review.text}</p>
            <p className="text-sm text-gray-400 mt-2">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}