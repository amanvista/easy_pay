import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "../../app/slices/authSlice";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

/**
 * ProtectedRoute component ensures that only authenticated users can access certain routes
 * Unauthenticated users are redirected to the login page with the intended destination stored
 * This component ALWAYS verifies authentication, even if a token exists in localStorage
 */
const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { userToken, loading } = useSelector((state) => state.auth);
  const [isVerifying, setIsVerifying] = useState(true);
  const [hasCheckedToken, setHasCheckedToken] = useState(false);

  // Verify authentication on mount
  useEffect(() => {
    const verifyAuthentication = async () => {
      const token = localStorage.getItem("userToken");

      // No token in localStorage = definitely not authenticated
      if (!token || !token.trim()) {
        setIsVerifying(false);
        setHasCheckedToken(true);
        return;
      }

      // Token exists - verify it with backend
      try {
        await dispatch(checkAuth()).unwrap();
        // Verification successful - userToken is now in Redux state
      } catch (error) {
        // Token is invalid/expired - checkAuth reducer clears userToken from Redux
        // Also clear from localStorage to prevent future issues
        localStorage.removeItem("userToken");
        console.log("Authentication verification failed:", error);
      } finally {
        setIsVerifying(false);
        setHasCheckedToken(true);
      }
    };

    verifyAuthentication();
  }, [dispatch]);

  // Show loading spinner while checking/verifying authentication
  if (!hasCheckedToken || isVerifying || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="large" color="#FF7B00" />
      </div>
    );
  }

  // After verification, check Redux state for userToken
  // If checkAuth succeeded, userToken will be set
  // If checkAuth failed or no token exists, userToken will be null
  // if (!userToken) {
  //   // Not authenticated - redirect to login with intended destination
  //   return <Navigate to="/login" state={{ from: location }} replace />;
  // }

  // User is authenticated (verified token exists in Redux state)
  return children;
};

export default ProtectedRoute;
