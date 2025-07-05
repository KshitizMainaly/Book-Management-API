import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchBook, createReview } from "../services/api";
import ReviewForm from "../components/ReviewForm";
import StarRating from "../components/StarRating";
import { toast } from "react-hot-toast";

function Review({ review }) {
  return (
    <div className="border-b border-gray-200 py-3">
      <div className="flex justify-between items-center">
        <h4 className="font-semibold">{review.user?.name || "Anonymous"}</h4>
        <StarRating rating={review.rating} />
      </div>
      <p className="text-gray-700 mt-1">{review.text}</p>
      <div className="text-sm text-gray-500 mt-1">
        {new Date(review.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}

export default function BookDetails() {
  const { id: bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadBook = async () => {
    try {
      const { data } = await fetchBook(bookId);
      setBook(data.data);
    } catch (err) {
      console.error("Failed to load book:", err);
      toast.error("Could not load book details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBook();
  }, [bookId]);

  const handleReviewSubmit = async (formData) => {
    try {
      await createReview(bookId, formData);
      toast.success("Review submitted!");
      loadBook();
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || "Failed to submit review";
      toast.error(msg);
    }
  };

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (!book) return <div className="text-center mt-10">Book not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
      <p className="text-gray-600 mb-4">by {book.author}</p>

      <div className="flex items-center space-x-2 mb-6">
        <StarRating rating={book.rating} />
        <span className="text-sm text-gray-500">Average Rating</span>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-3">Reviews</h3>
        {book.reviews && book.reviews.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {book.reviews.map((review) => (
              <Review key={review._id} review={review} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet. Be the first!</p>
        )}
      </div>

      <ReviewForm bookId={bookId} onSubmit={handleReviewSubmit} />
    </div>
  );
}

