import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(window.scrollY);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false); // Hide on scroll down
      } else {
        setShowNavbar(true); // Show on scroll up
      }
      setLastScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  // Close menu on route change or scroll up
  useEffect(() => {
    if (showNavbar) setMenuOpen(false);
  }, [showNavbar]);

  return (
    <nav
      className={` w-full bg-white transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } shadow`}
      style={{ minHeight: "4rem" }}
    >
      <div className="flex items-center justify-between px-4 md:px-10 h-[4rem]">
        {/* Logo */}
        <NavLink
          className="font-black text-2xl tracking-wide text-orange-600"
          to="/"
        >
          🍳 CookMaster<span className="text-orange-400">.</span>
        </NavLink>

        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
        >
          <span
            className={`block h-0.5 w-6 bg-orange-600 transition-all duration-300 ${
              menuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-orange-600 my-1 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          ></span>
          <span
            className={`block h-0.5 w-6 bg-orange-600 transition-all duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          ></span>
        </button>

        {/* Links */}
        <div
          className={`
            flex-col md:flex-row gap-6 md:gap-8
            absolute md:static top-[4rem] left-0 w-full md:w-auto bg-white md:bg-transparent
            transition-all duration-300
            ${menuOpen ? "flex" : "hidden"}
            md:flex
            shadow md:shadow-none
            py-6 md:py-0
            items-center
            z-40
          `}
        >
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 font-semibold"
                : "text-gray-700 hover:text-orange-500"
            }
            to="/"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 font-semibold"
                : "text-gray-700 hover:text-orange-500"
            }
            to="/recipes"
            onClick={() => setMenuOpen(false)}
          >
            Recipes
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 font-semibold"
                : "text-gray-700 hover:text-orange-500"
            }
            to="/create"
            onClick={() => setMenuOpen(false)}
          >
            Add Recipe
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-orange-600 font-semibold"
                : "text-gray-700 hover:text-orange-500"
            }
            to="/fav"
            onClick={() => setMenuOpen(false)}
          >
            Favorite
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

