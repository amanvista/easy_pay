import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * PublicRoute component ensures that authenticated users are redirected away from auth pages
 * Typically used for login/register pages where authenticated users shouldn't access
 * Unauthenticated users can access these routes normally
 * 
 * @param {React.ReactNode} children - The component to render for unauthenticated users
 * @param {string} redirectTo - Where to redirect authenticated users (default: "/")
 * @param {boolean} allowAuthenticated - If true, allows authenticated users to access the route
 */
const PublicRoute = ({ children, redirectTo = "/", allowAuthenticated = false }) => {
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
  if (userToken && !allowAuthenticated) {
    // User is authenticated and route doesn't allow authenticated users
    // Check if there's a 'from' location to redirect back to
    const from = location.state?.from?.pathname || redirectTo;
    return <Navigate to={from} replace />;
  }

  // User is not authenticated OR route allows authenticated users - allow access
  return children;
};

export default PublicRoute;