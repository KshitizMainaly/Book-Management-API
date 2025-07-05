import { useParams, Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { fetchBook, fetchReviews, createReview } from '../services/api';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import StarRating from '../components/StarRating';
import { AuthContext } from '../context/AuthContext';

export default function BookDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bookRes, reviewsRes] = await Promise.all([
          fetchBook(id),
          fetchReviews(id)
        ]);
        setBook(bookRes.data.data);
        setReviews(reviewsRes.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [id]);

  const handleNewReview = async (reviewData) => {
    try {
      const { data } = await createReview(id, reviewData);
      setReviews([...reviews, data.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : book?.rating || 3;

  const generateRandomImg = () => {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/id/${randomId}/600/800`;
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow overflow-hidden">
        {/* Book Header */}
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={
                book.coverImage === 'no-image.jpg'
                  ? generateRandomImg()
                  : book.coverImage
              }
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-800">
              {book.title}
            </h1>
            <p className="text-xl text-gray-600 mt-2">
              by {book.author}
            </p>

            <div className="flex items-center mt-4 space-x-4">
              <StarRating rating={averageRating} />
              <span className="text-gray-600 text-sm">
                {averageRating}/5 ({reviews.length} reviews)
              </span>
              <span className="text-gray-500">
                • {book.genre} •{' '}
                {new Date(book.publishedDate).toLocaleDateString()}
              </span>
            </div>

            <p className="mt-6 text-gray-700">{book.description}</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-gray-200 px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Reviews
          </h2>

          {user ? (
            <ReviewForm bookId={id} onSubmit={handleNewReview} />
          ) : (
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded mb-6">
              <p className="text-yellow-800">
                <Link
                  to="/login"
                  className="text-blue-600 hover:underline"
                >
                  Login
                </Link>{' '}
                or{' '}
                <Link
                  to="/register"
                  className="text-blue-600 hover:underline"
                >
                  Register
                </Link>{' '}
                to leave a review!
              </p>
            </div>
          )}

          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  );
}
