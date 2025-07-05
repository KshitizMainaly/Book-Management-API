import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchBook, fetchReviews, createReview } from '../services/api';
import ReviewForm from '../components/ReviewForm';
import ReviewList from '../components/ReviewList';
import StarRating from '../components/StarRating';

export default function BookDetails() {
  const { id } = useParams();
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

  if (loading) return <div className="text-center py-8">Loading...</div>;
const generateRandomImg = () => {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/id/${randomId}/600/800`;
  };


  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Book Header */}
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              // src={book.coverImage || '/default-book.jpg'}
              src={generateRandomImg()}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:w-2/3">
            <h1 className="text-3xl font-bold text-gray-800">{book.title}</h1>
            <p className="text-xl text-gray-600 mt-2">by {book.author}</p>
            
            <div className="flex items-center mt-4">
              <StarRating rating={book.rating} />
              <span className="ml-2 text-gray-500">
                {book.genre} • {new Date(book.publishedDate).toLocaleDateString()}
              </span>
            </div>

            <p className="mt-6 text-gray-700">{book.description}</p>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-gray-200 px-8 py-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
          
          <ReviewForm onSubmit={handleNewReview} />
          
          <ReviewList reviews={reviews} />
        </div>
      </div>
    </div>
  );
}