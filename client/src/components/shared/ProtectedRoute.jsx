import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import PageLoader from "./PageLoader";

const ProtectedRoute = ({ allowedRoles = [], redirectTo = "/", children }) => {
  const { user, loading } = useSelector((state) => state.auth);
  const location = useLocation();

  if (loading) return <PageLoader />;

  if (!user) {
    const fallbackRole = allowedRoles[0] || "student";
    return <Navigate to={`/login/${fallbackRole}`} replace state={{ from: location }} />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  return children;
};

export default ProtectedRoute;
