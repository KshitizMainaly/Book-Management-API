import StarRating from './StarRating';
export default function ReviewList({ reviews }) {
  return (
    <div className="space-y-6 mt-8">
      {reviews.length === 0 ? (
        <p className="text-gray-500">No reviews yet. Be the first to review!</p>
      ) : (
        reviews.map((review) => (
          <div
            key={review._id}
            className="border border-gray-200 rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-lg text-gray-800">
                {review.user?.name || 'Anonymous'}
              </h4>
              <StarRating rating={review.rating} />
            </div>

            {review.title && (
              <h5 className="text-gray-700 font-medium mb-1">
                {review.title}
              </h5>
            )}

            <p className="text-gray-600 mb-2">{review.text}</p>

            <p className="text-xs text-gray-400">
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
          </div>
        ))
      )}
    </div>
  );
}

