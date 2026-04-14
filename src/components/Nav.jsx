import React, { useEffect, useState } from "react";
import { PawPrint, ShoppingCart, Search, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ACCESS } from "../constants";
import { handleLogout, getCartProducts } from "../data";

function Nav() {
  const [cartCount, setCartCount] = useState(0);

  const fetchCartCount = async () => {
    try {
      const res = await getCartProducts();
      setCartCount(Array.isArray(res) ? res.length : 0);
      console.log("Cart count updated:", cartCount);
    } catch (error) {
      console.error("Error fetching cart count:", error);
    }
  };
  useEffect(() => {
    fetchCartCount();
  }, []);

  const navLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/#about",
    },
    {
      name: "Featured",
      href: "/#featured",
    },
    {
      name: "Categories",
      href: "/shop",
    },
    {
      name: "Faqs",
      href: "/#faqs",
    },
    {
      name: "Contact",
      href: "/#footer",
    },
  ];

  const token = localStorage.getItem(ACCESS);

  const Navigate = useNavigate();
  return (
    <nav className="w-screen h-16 flex items-center justify-center bg-primary border-b border-secondary/20 fixed top-0 left-0 z-50">
      <div className="cont  flex items-center justify-between w-full ">
        <a
          href="/"
          className="text-2xl tracking-wide font-bold flex items-center gap-1"
        >
          Nimble <PawPrint />
        </a>

        <div className="flex items-center gap-18">
          <ul className=" flex gap-6 text-[14px] tracking-wider font-normal">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <button
                className="text-secondary font-light "
                onClick={() => Navigate("/shop")}
              >
                <Search />
              </button>
              <button
                className="relative text-secondary font-light "
                onClick={() => Navigate("/cart")}
              >
                <p className="absolute -top-2 -right-3 bg-red-400 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </p>
                <ShoppingCart />
              </button>
            </div>
            {token ? (
              <button
                className=" flex items-center justify-center border border-red-600 text-red-500  font-light p-2 rounded-sm"
                onClick={() => {
                  handleLogout();
                  window.location.reload();
                }}
              >
                <LogOut size={24} />
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
        </div>
      </div>
    </nav>
  );
}

export default Nav;
