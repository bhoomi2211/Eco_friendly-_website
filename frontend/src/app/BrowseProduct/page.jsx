"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Heart, Search, Filter } from "lucide-react";
import Link from "next/link";
import UseWishlistContext from "@/context/WishlistContext";

const BrowseProduct = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const {  addToWishlist } = UseWishlistContext();

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/product/getall");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Extract unique categories dynamically
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filtering logic
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <section className="min-h-screen bg-slate-100 px-8 py-16">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900">
          Browse Our Collection
        </h1>
        <p className="mt-3 text-gray-600 text-lg">
          Find the best deals on quality products
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl px-6 py-6 mb-14 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Search */}
          <div>
            <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
              <Search className="w-4 h-4" /> Search Products
            </label>
            <input
              type="text"
              placeholder="Type product name, brand, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-600 text-slate-800 placeholder-gray-400"
            />
          </div>

          {/* Category Filter */}
          <div>
            <label className="flex items-center gap-2 text-slate-700 font-medium mb-2">
              <Filter className="w-4 h-4" /> Filter by Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-600 text-slate-800 bg-white"
            >
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-white/90 backdrop-blur-md border border-slate-200 rounded-3xl shadow-md hover:shadow-2xl transition duration-300 p-6 flex flex-col relative"
            >
              {/* Wishlist Icon */}
              <button className="absolute top-4 right-4"
               onClick={()=>{ 
                console.log("Adding to wishlist:", product);
                
                addToWishlist(product) }}
               >
                <Heart className="text-gray-400 hover:text-red-500 transition w-5 h-5 cursor-pointer" />
              </button>

              {/* Product Image */}
              <div className="w-full h-56  flex items-center justify-center rounded-2xl overflow-hidden mb-4">
                <img
                  src={
                    Array.isArray(product.images)
                      ? product.images[0]
                      : product.images
                  }
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-500"
                />
              </div>

              {/* Product Title */}
              <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-1">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center mb-2">
                <span className="text-yellow-400 text-lg">⭐⭐⭐⭐☆</span>
                <span className="ml-2 text-gray-500 text-sm">
                  (120 reviews)
                </span>
              </div>

              {/* Product Info */}
              <div className="text-sm text-gray-600 space-y-1 mb-3">
                <p>
                  <span className="font-semibold text-slate-700">Brand:</span>{" "}
                  {product.brand}
                </p>
                <p>
                  <span className="font-semibold text-slate-700">
                    Category:
                  </span>{" "}
                  {product.category}
                </p>
                <p>
                  <span className="font-semibold text-slate-700">Stock:</span>{" "}
                  {product.stock} available
                </p>
              </div>

              {/* Price */}
              <p className="text-2xl font-bold text-slate-900 mb-3">
                ₹{product.price}
              </p>

              {/* Description */}
              <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                {product.description}
              </p>

              {/* CTA Button */}
              <Link href={`/ViewProductDetails/${product._id}`}>
                <button className="mt-auto w-full px-5 py-2 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition">
                  View Details
                </button>
              </Link>
            </motion.div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No products found.
          </p>
        )}
      </div>
    </section>
  );
};

export default BrowseProduct;
