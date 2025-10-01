'use client';
import { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("wishlistItems");
    if (stored) setWishlistItems(JSON.parse(stored));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Add to wishlist
  const addToWishlist = (product) => {
    setWishlistItems((prev) => {
      // Prevent duplicates
      if (prev.find((item) => item._id === product._id)) return prev;
      return [...prev, product];
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item._id !== id));
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

const UseWishlistContext = () => useContext(WishlistContext);
export default UseWishlistContext;



