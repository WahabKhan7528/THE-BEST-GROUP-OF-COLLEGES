import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import PublicButton from "../../components/shared/PublicButton";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 transition-colors duration-300">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl sm:text-9xl font-bold text-college-navy font-serif">
          4 <span className="text-college-gold">0</span> 4
        </h1>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mt-4 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <PublicButton
            onClick={() => navigate(-1)}
            variant="primary"
          >
            <ArrowLeft size={16} />
            Go Back
          </PublicButton>
          <PublicButton 
            onClick={() => navigate("/")}
            variant="secondary"
            shape="slanted"
          >
            <Home size={16} />
            Home
          </PublicButton>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
