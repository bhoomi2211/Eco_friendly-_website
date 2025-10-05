'use client'
import React, { useState, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaBars, FaTimes, FaHeart, FaUserCircle } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import UseCartContext from "@/context/CartContext";
import UseWishlistContext from "@/context/WishlistContext";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileDropdown, setProfileDropdown] = useState(false);

  const router = useRouter();
  const { cartItems } = UseCartContext();
  const { wishlistItems } = UseWishlistContext();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    router.push("/");
  };

  if (loading) return null; // prevent SSR/client mismatch

  return (
    <motion.header
      className="w-full bg-black text-gray-200 shadow-md sticky top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-3 md:py-4">
        {/* Logo */}
        <div className="text-xl md:text-2xl font-bold text-blue-400 tracking-wide cursor-pointer"
             onClick={() => router.push("/")}>
          E-Market Place
        </div>

        {/* Center Menu */}
        <div className="hidden md:flex flex-1 justify-center gap-6 lg:gap-8 text-sm lg:text-base">
          <a href="/" className="hover:text-blue-400 transition">Home</a>
          <a href="/BrowseProduct" className="hover:text-blue-400 transition">Products</a>
          <a href="/categories" className="hover:text-blue-400 transition">Categories</a>
          {user?.role === "admin" && (
            <a href="/add-product" className="hover:text-blue-400 transition">Add Product</a>
          )}
          <a href="/aboutUs" className="hover:text-blue-400 transition">About</a>
          <a href="/contact" className="hover:text-blue-400 transition">Contact</a>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-3 md:gap-5">
          {/* Search */}
          <div className="relative">
            <FaSearch
              className="text-gray-200 hover:text-blue-400 transition text-lg md:text-xl cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="absolute right-0 top-0 flex items-center overflow-hidden bg-white rounded-md"
                >
                  <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-3 py-1.5 text-sm border-none outline-none text-black"
                  />
                  <button className="px-3 py-1.5 bg-blue-400 text-white rounded-r-md hover:bg-blue-500 transition">
                    <FaSearch />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wishlist */}
          <div className="relative cursor-pointer" onClick={() => router.push('/wishlist')}>
            <FaHeart className="text-gray-200 hover:text-pink-400 transition text-lg md:text-xl" />
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-1.5">
              {wishlistItems.length || 0}
            </span>
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
            <FaShoppingCart className="text-gray-200 hover:text-blue-400 transition text-lg md:text-xl" />
            <span className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs rounded-full px-1.5">
              {cartItems.length || 0}
            </span>
          </div>

          {/* User / Profile */}
          {user ? (
            <div className="relative">
              <FaUserCircle
                className="text-gray-200 hover:text-blue-400 text-2xl cursor-pointer"
                onClick={() => setProfileDropdown(!profileDropdown)}
              />
              {profileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg z-50">
                  <div className="px-4 py-2 border-b">
                    <p className="font-semibold">{user.name || "User"}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                  <button
                    className="w-full px-4 py-2 text-left hover:bg-gray-200 transition"
                    onClick={() => router.push('/profile')}
                  >
                    Profile
                  </button>
                  <button
                    className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-200 transition"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden md:flex gap-2 lg:gap-3">
              <button
                className="px-3 lg:px-4 py-1.5 bg-gray-700 text-white rounded-lg shadow hover:bg-gray-600 transition text-sm lg:text-base"
                onClick={() => router.push('/login')}
              >
                Login
              </button>
              <button
                className="px-3 lg:px-4 py-1.5 bg-blue-400 text-white rounded-lg shadow hover:bg-blue-500 transition text-sm lg:text-base"
                onClick={() => router.push('/signup')}
              >
                Signup
              </button>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-200 text-xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 text-gray-200 px-6 py-4 flex flex-col gap-3 text-sm">
          <a href="/" className="hover:text-blue-400 transition">Home</a>
          <a href="/products" className="hover:text-blue-400 transition">Products</a>
          <a href="/categories" className="hover:text-blue-400 transition">Categories</a>
          {user?.role === "admin" && (
            <a href="/add-product" className="hover:text-blue-400 transition">Add Product</a>
          )}
          <a href="/about" className="hover:text-blue-400 transition">About</a>
          <a href="/contact" className="hover:text-blue-400 transition">Contact</a>

          {!user ? (
            <div className="flex gap-3 mt-4">
              <button
                className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
                onClick={() => router.push('/login')}
              >
                Login
              </button>
              <button
                className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                onClick={() => router.push('/signup')}
              >
                Signup
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2 mt-4">
              {user.role !== "admin" && (
                <button
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition"
                  onClick={() => router.push('/profile')}
                >
                  Profile
                </button>
              )}
              <button
                className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Logout
              </button>

              <button
                className="w-full px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>

             
          )}

          {/* Mobile Wishlist & Cart */}
          <div className="flex gap-3 mt-3">
            <button
              className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
              onClick={() => router.push('/wishlist')}
            >
              Wishlist ({wishlistItems.length || 0})
            </button>
            <button
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              onClick={() => router.push('/cart')}
            >
              Cart ({cartItems.length || 0})
            </button>
          </div>
        </div>
      )}
    </motion.header>
  );
};

export default Navbar;
