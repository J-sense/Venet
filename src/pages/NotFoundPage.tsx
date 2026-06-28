import React from "react";
import { Link } from "react-router";

const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center text-white px-6">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-extrabold text-[#2B7FFF] mb-4">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Page Not Found</h2>
        <p className="text-[#99A1AF] text-lg max-w-md mx-auto mb-10">
          The page you are looking for doesn't exist, has been moved, or is
          temporarily unavailable.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3.5 bg-[#007AFF] hover:bg-blue-600 text-white rounded-full font-semibold transition-colors duration-300 shadow-[0_0_20px_rgba(0,122,255,0.4)]"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
