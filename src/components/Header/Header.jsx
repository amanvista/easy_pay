import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/hooks/useAuth";
import AddressSelector from "../AddressSelector/AddressSelector";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, userInfo, logout } = useAuth();
  const navigate = useNavigate();

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  // Handle login navigation
  const handleLoginClick = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm">
      {/* Main Header Row */}
      <div className="px-4 py-3 flex items-center justify-between md:px-8">
        {/* Logo + Address Selector */}
        <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src="/assets/logo_2.png" 
              alt="BlinkFeast Logo" 
              className="h-10 w-30 object-contain" 
            />
          </Link>
          {/* Address Selector - Cool icon design (Desktop) */}
          <div className="hidden sm:block border-l border-gray-200 pl-3 sm:pl-4">
            <AddressSelector />
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          {isAuthenticated && (
            <Link to="/order-history" className="hover:text-orange-500 transition">
              My Orders
            </Link>
          )}
          <a href="#" className="hover:text-orange-500 transition">Partner with Us</a>
          {isAuthenticated ? (
            <>
              {userInfo && (
                <span className="text-gray-600 flex items-center gap-1">
                  <User className="w-4 h-4" />
                  {userInfo.name || userInfo.email || "User"}
                </span>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLoginClick}
              className="text-orange-500 hover:text-orange-600 transition"
            >
              Sign In
            </button>
          )}
        </nav>

        {/* Mobile CTA + Menu */}
        <div className="flex items-center md:hidden gap-2 sm:gap-4">
          
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Address Selector - Below main header (only on home page) */}
      <div className="sm:hidden border-t border-gray-200 px-4 py-2.5 bg-gray-50">
        <AddressSelector />
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden border-t border-gray-200 bg-white px-4 py-3 flex flex-col gap-4">
          {isAuthenticated && (
            <Link 
              to="/order-history" 
              className="hover:text-orange-500 transition"
              onClick={() => setMenuOpen(false)}
            >
              My Orders
            </Link>
          )}
          <a href="#" className="hover:text-orange-500 transition">Partner with Us</a>
          {isAuthenticated ? (
            <>
              {userInfo && (
                <div className="text-gray-600 flex items-center gap-2 py-2 border-b border-gray-200">
                  <User className="w-4 h-4" />
                  <span>{userInfo.name || userInfo.email || "User"}</span>
                </div>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-gray-700 hover:text-orange-500 transition text-left"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={handleLoginClick}
              className="text-orange-500 hover:text-orange-600 transition text-left"
            >
              Sign In
            </button>
          )}
        </div>
      )}
    </header>
  );
}
