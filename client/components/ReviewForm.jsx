import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import StarRating from "./StarRating";

export default function ReviewForm({ bookId, onSubmit }) {
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [error, setError] = useState("");

  if (!user) {
    return (
      <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded">
        Please <span className="underline text-blue-600">log in</span> or{" "}
        <a href="/register" className="underline text-blue-600">register</a> to submit a review.
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await onSubmit({ title, text, rating });
      setTitle("");
      setText("");
      setRating(5);
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.error || "Something went wrong.";
      setError(msg);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-4 border border-gray-200 rounded shadow-sm bg-white">
      <h3 className="text-xl font-semibold mb-4">Add Your Review</h3>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">{error}</div>
      )}

      <input
        type="text"
        placeholder="Review Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />

      <textarea
        placeholder="Your review..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        required
        rows="4"
        className="w-full mb-3 p-2 border border-gray-300 rounded"
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="mr-2 font-medium text-gray-700">Your Rating:</span>
          <StarRating rating={rating} editable={true} onRatingChange={setRating} />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit Review
        </button>
      </div>
    </form>
  );
}

