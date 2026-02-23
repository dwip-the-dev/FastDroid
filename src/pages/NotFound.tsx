import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center">
      {/* 404 Image */}
      <img
        src="/404.jpg"
        alt="404 Not Found"
        className="max-w-[90%] max-h-[70vh] object-contain"
      />

      {/* Home link */}
      <Link
        to="/"
        className="mt-6 text-green-500 hover:text-green-400 transition text-sm tracking-widest"
      >
        HOME
      </Link>
    </div>
  );
}
