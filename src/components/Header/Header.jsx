import { useState, useRef, useEffect } from "react";
import { Menu, X, LogOut, User, ShoppingCart, ChevronDown, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../app/hooks/useAuth";
import AddressSelector from "../AddressSelector/AddressSelector";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const { isAuthenticated, userInfo, logout } = useAuth();
  const navigate = useNavigate();
  
  // Get cart count from Redux
  const cartCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  // Handle logout
  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
    setUserMenuOpen(false);
  };

  // Handle login navigation
  const handleLoginClick = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  // Handle search button click
  const handleSearchClick = () => {
    navigate("/search");
    setMenuOpen(false);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    };

    if (userMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userMenuOpen]);

  return (
    <header className="w-full sticky top-0 z-[999] bg-white shadow-sm">
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
          {/* Search Button */}
          <button
            onClick={handleSearchClick}
            className="hover:text-orange-500 transition"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          {isAuthenticated && (
            <Link to="/order-history" className="hover:text-orange-500 transition">
              My Orders
            </Link>
          )}
          <a href="#" className="hover:text-orange-500 transition">Partner with Us</a>
          
          {/* Cart Icon with Badge */}
          <Link to="/cart" className="relative hover:text-orange-500 transition">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-1 text-gray-700 hover:text-orange-500 transition"
              >
                <User className="w-4 h-4" />
                <span>{userInfo?.name || userInfo?.email || "User"}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 max-h-80 overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <p className="text-sm font-medium text-gray-900">{userInfo?.name || "User"}</p>
                    <p className="text-xs text-gray-500 truncate">{userInfo?.email}</p>
                  </div>
                  
                  <Link
                    to="/order-history"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    My Orders
                  </Link>
                  
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Profile Settings
                  </Link>
                  
                  <Link
                    to="/add-address"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                    onClick={() => setUserMenuOpen(false)}
                  >
                    Manage Addresses
                  </Link>
                  
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
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
          {/* Search Button for Mobile */}
          <button
            onClick={handleSearchClick}
            className="hover:text-orange-500 transition p-1"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
          
          {/* Cart Icon for Mobile */}
          <Link to="/cart" className="relative hover:text-orange-500 transition p-1">
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          <button onClick={() => setMenuOpen(!menuOpen)} className="p-1">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Address Selector - Below main header */}
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
