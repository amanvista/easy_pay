import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * ProtectedRoute component ensures that only authenticated users can access certain routes
 * Unauthenticated users are redirected to the login page with the intended destination stored
 * Auth verification is handled by AuthInitializer component
 */
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { userToken, loading } = useSelector((state) => state.auth);

  // Show loading while AuthInitializer is verifying authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!userToken) {
    // Not authenticated - redirect to login with intended destination
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // User is authenticated
  return children;
};

export default ProtectedRoute;
