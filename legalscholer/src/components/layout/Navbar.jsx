import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import ShinyText from "../ShinyText";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ✅ Adjusted routes here so "Sign In" → "/login"
  const mobileLinks = [
    { name: "Home", path: "/" },
    { name: "Pricing", path: "/pricing" },
    { name: "Sign In", path: "/login" },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "py-2 px-4" : "py-4 px-0"
      }`}
    >
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-[#222831]/90 shadow-lg  rounded-xl mx-4"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo + Company Name */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-300 overflow-hidden">
              <img
                src="/images/legalscholer-logo.jpg"
                alt="LegalScholer Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-white text-xl tracking-tight hidden md:block">
              <ShinyText
                text="LegalScholer"
                disabled={false}
                speed={3}
                className="custom-class"
              />
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {["Home", "Pricing"].map((item, index) => (
              <Link
                key={index}
                to={`/${item.toLowerCase() === "home" ? "" : item.toLowerCase()}`}
                className="relative text-white/80 text-sm font-medium transition-all duration-300 group px-4 py-2 rounded-lg hover:text-white hover:bg-[#393E46]/40"
              >
                {item}
                <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#948979] transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]"></span>
              </Link>
            ))}
            <div className="h-6 w-px bg-[#393E46] mx-2"></div>
            <Link
              to="/login"
              className="px-4 py-2 text-white/80 text-sm font-medium transition-all duration-300 hover:text-white hover:bg-[#393E46]/40 rounded-lg"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="ml-2 px-5 py-2.5 bg-[#948979] text-white text-sm font-medium rounded-lg transition-all duration-300 hover:bg-[#948979]/90 hover:shadow-md"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Burger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-[#393E46]/40 transition-colors duration-300"
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-[#222831]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-4 text-white z-50"
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white p-2 rounded-lg hover:bg-[#393E46]/40 transition-colors duration-300"
              aria-label="Close menu"
            >
              <X size={28} />
            </button>

            {mobileLinks.map((item, index) => (
              <motion.div
                key={index}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ delay: index * 0.3, duration: 0.3 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-medium text-white/80 py-6 gap-2.5 px-6 rounded-lg transition-all duration-300 hover:text-white hover:bg-[#393E46]/40"
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ delay: mobileLinks.length * 0.1, duration: 0.3 }}
            >
              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="mt-5 px-8 py-3.5 bg-[#948979] text-white text-lg font-medium rounded-lg transition-all duration-300 hover:bg-[#948979]/90"
              >
                Get Started
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
