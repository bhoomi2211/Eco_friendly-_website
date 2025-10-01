'use client'
import React, { useState } from "react";
import { FaSearch, FaShoppingCart, FaBars, FaTimes, FaHeart } from "react-icons/fa"; // ✅ Added FaHeart
import { motion, AnimatePresence } from "framer-motion";
import UseCartContext from "@/context/CartContext";
import UseWishlistContext from "@/context/WishlistContext";


       
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const router = useRouter();


  const { cartItems } = UseCartContext();
  const { wishlistItems } = UseWishlistContext();



   // TODO: add WishlistContext later like CartContext

  return (
    <motion.header
      className="w-full bg-black text-gray-200 shadow-md sticky top-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-400 tracking-wide">
          E-Market Place
        </div>

        {/* Center Menu */}
        <div className="hidden md:flex flex-1 justify-center gap-8">
          <a href="/" className="hover:text-blue-400 transition">Home</a>
          <a href="/products" className="hover:text-blue-400 transition">Products</a>
          <a href="/categories" className="hover:text-blue-400 transition">Categories</a>
          <a href="/add-product" className="hover:text-blue-400 transition">Add Product</a>
          <a href="/about" className="hover:text-blue-400 transition">About</a>
          <a href="/contact" className="hover:text-blue-400 transition">Contact</a>
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Search */}
          <div className="relative">
            <FaSearch
              className="text-gray-200 hover:text-blue-400 transition text-xl cursor-pointer"
              onClick={() => setSearchOpen(!searchOpen)}
            />
            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="absolute right-0 top-0 flex items-center overflow-hidden"
                >
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full px-4 py-2 rounded-l-md border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 text-black"
                  />
                  <button className="px-4 py-2 bg-blue-400 text-white rounded-r-md hover:bg-blue-500 transition">
                    <FaSearch />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Wishlist */}
          <div className="relative cursor-pointer" onClick={() => router.push('/wishlist')}>
            <FaHeart className="text-gray-200 hover:text-pink-400 transition text-xl" />
            <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full px-2">
              {wishlistItems.length || 0}
            </span>
          </div>

          {/* Cart */}
          <div className="relative cursor-pointer" onClick={() => router.push('/cart')}>
            <FaShoppingCart className="text-gray-200 hover:text-blue-400 transition text-xl" />
            <span className="absolute -top-2 -right-2 bg-blue-400 text-white text-xs rounded-full px-2">
              {cartItems.length || 0}
            </span>
          </div>

          {/* Login & Signup */}
          <div className="hidden md:flex gap-3">
            <button
              className="px-4 py-2 bg-gray-700 text-white rounded-xl shadow-md hover:bg-gray-600 transition"
              onClick={() => router.push('/login')}
            >
              Login
            </button>
            <button
              className="px-4 py-2 bg-blue-400 text-white rounded-xl shadow-md hover:bg-blue-500 transition"
              onClick={() => router.push('/signup')}
            >
              Signup
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-gray-200 text-2xl"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-900 text-gray-200 px-6 py-4 flex flex-col gap-4">
          <a href="/" className="hover:text-blue-400 transition">Home</a>
          <a href="/products" className="hover:text-blue-400 transition">Products</a>
          <a href="/categories" className="hover:text-blue-400 transition">Categories</a>
          <a href="/about" className="hover:text-blue-400 transition">About</a>
          <a href="/contact" className="hover:text-blue-400 transition">Contact</a>

          {/* Mobile Wishlist & Cart */}
          <div className="flex gap-4 mt-3">
            <button
              className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-xl hover:bg-pink-600 transition"
              onClick={() => router.push('/wishlist')}
            >
              Wishlist ({wishlistItems.length || 0})
            </button>
            <button
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition"
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
