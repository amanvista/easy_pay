import { useState } from "react";
import { Menu, X, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../app/hooks/useAuth";

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
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm px-4 py-3 flex items-center justify-between md:px-8">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img 
          src="/assets/logo_2.png" 
          alt="BlinkFeast Logo" 
          className="h-10 w-30 object-contain" 
        />
      </Link>

      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
        <a href="#" className="hover:text-orange-500 transition">Bulk Order</a>
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
      <div className="flex items-center md:hidden gap-4">
        <a
          href="#"
          className="text-sm text-white bg-orange-500 px-3 py-1.5 rounded-lg font-medium shadow-sm hover:bg-orange-600 transition"
        >
          Bulk Order
        </a>
        <button onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-t px-4 py-3 flex flex-col gap-4 md:hidden">
          <a href="#" className="hover:text-orange-500 transition">Partner with Us</a>
          {isAuthenticated ? (
            <>
              {userInfo && (
                <div className="text-gray-600 flex items-center gap-2 py-2 border-b">
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
