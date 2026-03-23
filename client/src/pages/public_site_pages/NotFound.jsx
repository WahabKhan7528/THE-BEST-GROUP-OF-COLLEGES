import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-college-navy px-4 transition-colors duration-300">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl sm:text-9xl font-bold text-college-navy dark:text-college-gold/20 font-serif">
          404
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-4 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 dark:border-college-gold/20 text-gray-700 dark:text-gray-300 font-semibold hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>
          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-college-navy dark:bg-college-gold text-white dark:text-college-navy font-semibold hover:opacity-90 transition-all"
          >
            <Home size={16} />
            Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
