import { useSelector } from "react-redux";

/**
 * PublicRoute component:
 * - Waits for AuthInitializer to finish loading (to avoid hydration issues in Nginx)
 * - Does NOT block authenticated or unauthenticated users
 * - Simply returns the page element after auth initialization
 */
const PublicRoute = ({ children }) => {
  const { loading } = useSelector((state) => state.auth);

  // Wait until AuthInitializer finishes verifying token
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return children;
};

export default PublicRoute;
