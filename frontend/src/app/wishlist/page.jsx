"use client";
import React from "react";
import UseWishlistContext from "@/context/WishlistContext";
import UseCartContext from "@/context/CartContext";
import { toast } from "react-hot-toast";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = UseWishlistContext();
  const { addToCart } = UseCartContext();

  const handleMoveToCart = (item) => {
    addToCart(item);
    removeFromWishlist(item._id);
    toast.success(`${item.name} moved to cart`);
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-10 text-slate-900 text-center">
        🛒 My Wishlist
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left: Wishlist Items */}
        <div className="md:col-span-2 space-y-6">
          {wishlistItems.length > 0 ? (
            wishlistItems.map((item) => (
              <div
                key={item._id}
                className="flex bg-white rounded-2xl shadow-md border border-gray-300 overflow-hidden hover:shadow-lg transition-shadow"
              >
                {/* Product Image */}
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center p-4">
                  <img
                    src={Array.isArray(item.images) ? item.images[0] : item.images}
                    alt={item.name}
                    className="max-h-full object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-slate-900">{item.name}</h2>
                    <p className="text-sm text-slate-600 mt-1">₹{item.price}</p>
                    <p className="text-sm text-slate-500 mt-2">{item.description || "No description"}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col justify-center space-y-3 p-4">
                  <button
                    onClick={() => handleMoveToCart(item)}
                    className="py-2 px-4 rounded-xl bg-slate-800 text-white font-medium hover:bg-slate-900 transition w-36"
                  >
                    Move to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="py-2 px-4 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition w-36"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-slate-500 text-center py-20 text-lg">
              Your wishlist is empty.
            </p>
          )}
        </div>

        {/* Right: Summary */}
        <div className="bg-white rounded-2xl shadow-md p-6 h-fit border border-gray-300">
          <h2 className="text-xl font-bold mb-4 text-slate-900">Wishlist Summary</h2>
          <p className="flex justify-between text-slate-700 mb-2">
            <span>Total Items:</span> <span>{wishlistItems.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
