import { useState, useEffect } from "react";
import { FaLeaf, FaRegHeart, FaBars, FaTimes } from "react-icons/fa";

const navLinks = [
  { label: "How It Works", href: "#howitworks" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#FAQ" },
];

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Blur body content when menu is open
  useEffect(() => {
    document.body.classList.toggle("blur-background", menuOpen);
  }, [menuOpen]);

  // Close menu & remove blur on screen resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
        document.body.classList.remove("blur-background");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  // Scroll border effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-gray-300 shadow-sm bg-[#fefce8]"
          : "bg-[#fefce8]"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <FaLeaf className="text-green-600 text-2xl animate-bounce-slow" />
          <h1 className="text-xl md:text-2xl font-bold text-green-800 flex items-center">
            AgriCare AI <FaRegHeart className="ml-2 text-green-500" />
          </h1>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-6 cursor-pointer">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-green-800 hover:text-green-600 font-medium transition"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-800 text-xl focus:outline-none cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-[#fefce8] border-t border-gray-300 shadow-md px-4 py-4 space-y-4 z-50">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-green-800 hover:text-green-600 font-medium transition"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

export default Header;
