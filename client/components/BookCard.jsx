import { Link } from "react-router-dom";
import StarRating from "./StarRating";

export default function BookCard({ book }) {
  const generateRandomImg = () => {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/id/${randomId}/600/800`;
  };
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={generateRandomImg()}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-1">By {book.author}</p>
        <div className="flex items-center mb-4">
          <StarRating rating={book.rating} />
          <span className="ml-2 text-sm text-gray-500">{book.rating}/5</span>
        </div>
        <p className="text-gray-700 line-clamp-2">{book.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {book.genre}
          </span>
          <Link
            to={`/books/${book._id}`}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
