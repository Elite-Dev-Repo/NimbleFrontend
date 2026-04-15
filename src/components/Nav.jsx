import React, { useEffect, useState } from "react";
import { PawPrint, ShoppingCart, Search, LogOut, Menu, X } from "lucide-react"; // Added Menu and X
import { useNavigate } from "react-router-dom";
import { ACCESS } from "../constants";
import { handleLogout, getCartProducts } from "../data";

function Nav() {
  const [cartCount, setCartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu state

  const fetchCartCount = async () => {
    try {
      const res = await getCartProducts();
      setCartCount(Array.isArray(res) ? res.length : 0);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Featured", href: "/#featured" },
    { name: "Categories", href: "/shop" },
    { name: "Faqs", href: "/#faqs" },
    { name: "Contact", href: "/#footer" },
  ];

  const token = localStorage.getItem(ACCESS);
  const Navigate = useNavigate();

  return (
    <nav className="w-screen h-16 flex items-center justify-center bg-primary border-b border-secondary/20 fixed top-0 left-0 z-50 px-4 md:px-10">
      <div className="cont flex items-center justify-between w-full max-w-7xl mx-auto">
        {/* Logo */}
        <a
          href="/"
          className="text-2xl tracking-wide font-bold flex items-center gap-1 z-[60]"
        >
          Nimble <PawPrint />
        </a>

        {/* Desktop Links - Hidden on Mobile */}
        <div className="hidden lg:flex items-center gap-12">
          <ul className="flex gap-6 text-[14px] tracking-wider font-normal">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  className="hover:text-secondary/70 transition-colors"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Buttons (Search, Cart, Auth) */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-3 md:gap-4">
            <button
              className="text-secondary font-light"
              onClick={() => Navigate("/shop")}
            >
              <Search size={20} />
            </button>
            <button
              className="relative text-secondary font-light"
              onClick={() => Navigate("/cart")}
            >
              {cartCount > 0 && (
                <p className="absolute -top-2 -right-3 bg-red-400 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </p>
              )}
              <ShoppingCart size={20} />
            </button>
          </div>

          {/* Desktop Auth - Hidden on Mobile */}
          <div className="hidden md:block">
            {token ? (
              <button
                className="text-red-500 flex items-center gap-2"
                onClick={() => {
                  handleLogout();
                  window.location.reload();
                }}
              >
                Logout <LogOut size={20} />
              </button>
            ) : (
              <button
                className="bg-secondary text-white text-[14px] font-light px-6 py-2 rounded-sm"
                onClick={() => Navigate("/auth")}
              >
                Sign Up
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden text-secondary z-[60]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`
        fixed inset-0 bg-primary flex flex-col items-center justify-center transition-transform duration-300 ease-in-out z-50 lg:hidden
        ${isMenuOpen ? "translate-y-0" : "-translate-y-full"}
      `}
      >
        <ul className="flex flex-col gap-8 text-center text-lg tracking-widest font-light">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="hover:text-secondary"
              >
                {link.name}
              </a>
            </li>
          ))}
          {/* Mobile Auth Links */}
          <li className="mt-4 md:hidden">
            {token ? (
              <button
                className="text-red-500 flex items-center gap-2"
                onClick={() => {
                  handleLogout();
                  window.location.reload();
                }}
              >
                Logout <LogOut size={20} />
              </button>
            ) : (
              <button
                className="bg-secondary text-white px-10 py-3 rounded-sm"
                onClick={() => {
                  setIsMenuOpen(false);
                  Navigate("/auth");
                }}
              >
                Sign Up
              </button>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
