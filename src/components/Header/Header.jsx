import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50 bg-white shadow-sm px-4 py-3 flex items-center justify-between md:px-8">
      {/* Logo */}
      <div className="flex items-center">
  <img 
    src="/assets/logo_2.png" 
    alt="BlinkFeast Logo" 
    className="h-10 w-30 object-contain" 
  />
</div>



      {/* Desktop Nav */}
      <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
        <a href="#">Bulk Order</a>
        <a href="#">Partner with Us</a>
        <a href="#">Sign In</a>
      </nav>

      {/* Mobile CTA + Menu */}
      <div className="flex items-center md:hidden gap-4">
        <a
          href="#"
          className="text-sm text-white bg-orange-500 px-3 py-1.5 rounded-lg font-medium shadow-sm"
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
          <a href="#">Partner with Us</a>
          <a href="#">Sign In</a>
        </div>
      )}
    </header>
  );
}
