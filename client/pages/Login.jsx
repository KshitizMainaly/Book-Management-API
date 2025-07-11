import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-hot-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ email, password });
      toast.success("Login successful!");
    } catch (err) {
      console.error(err);
      const message = err.response?.data?.error || "Invalid email or password";
      toast.error(message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-white">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded bg-gray-800 text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded bg-gray-800 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-black py-2 rounded hover:bg-gray-300"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-gray-400">
          New user?{" "}
          <span className="text-blue-400 ">
            You can always register
          </span>
        </p>
      </div>
    </div>
  );
}

