import StarRating from "./StarRating";
import axios from "axios";
export default function BookCard({ book }) {


const generateRandomImg = () => {
  const id = Math.floor(Math.random() * 1000); // max ~1084 for available images
  return `https://picsum.photos/id/${id}/200/300`;
};


  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        // src={book.coverImage || '/default-book.jpg'} 

src={generateRandomImg()}
        alt={book.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
        <p className="text-gray-600 mb-1">By {book.author}</p>
        <div className="flex items-center mb-4">
          <StarRating rating={book.rating} />
          <span className="ml-2 text-sm text-gray-500">
            {book.rating}/5
          </span>
        </div>
        <p className="text-gray-700 line-clamp-2">{book.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {book.genre}
          </span>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}