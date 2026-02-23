import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-center"
      <img
        src="/404-mobile.jpg"
        alt="404 Mobile"
        className="block md:hidden max-w-[90%] max-h-[70vh] object-contain"
      />
      <img
        src="/404-desktop.jpg"
        alt="404 Desktop"
        className="hidden md:block max-w-[70%] max-h-[80vh] object-contain"
      />
      <Link
        to="/"
        className="mt-6 text-green-500 hover:text-green-400 transition text-sm tracking-widest"
      >
        HOME
      </Link>
    </div>
  );
}
