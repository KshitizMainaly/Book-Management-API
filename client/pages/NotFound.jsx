export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center text-center">
      <div>
        <h1 className="text-5xl font-bold mb-4">404</h1>
        <p className="text-lg mb-6">Oops! Page not found.</p>
        <a href="/books" className="text-blue-600 hover:underline">
          Go back to books
        </a>
      </div>
    </div>
  );
}
