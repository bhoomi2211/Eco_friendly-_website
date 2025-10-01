"use client";
import React from "react";
import { motion } from "framer-motion";

const products = [
  { id: 1, name: "Premium Wireless Headphone", price: 1200, image: "https://www.leafstudios.in/cdn/shop/files/1_a43c5e0b-3a47-497d-acec-b4764259b10e_1024x1024.png?v=1750486829", badge: "New" },
  { id: 2, name: "Smart Fitness Watch", price: 8500, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxwPbid8P7jFYo_U-pg-pOH9I5YMzzEOeyng&s", badge: "Sale" },
  { id: 3, name: "Round-neck t-shirt", price: 350, image: "https://www.rockit.co.in/cdn/shop/products/2230101584-2-38_1.jpg?v=1703672015", badge: "sale" },
  { id: 4, name: "Mars Liquid Foundation", price: 2999, image: "https://marscosmetics.in/cdn/shop/files/WEBSITEcopy.jpg2_2_6a75ce34-9e2c-428a-afbb-b2b39ee61d7d.jpg?v=1740828794&width=2000", badge: "New" },
  { id: 5, name: "Straight Paint", price: 900, image: "https://assets.ajio.com/medias/sys_master/root/20240407/UbfO/6611a09416fd2c6e6aa1ebb0/-473Wx593H-466373610-brown-MODEL.jpg", badge: "New" },
  { id: 6, name: "Hand-bag", price: 1500, image: "https://images.meesho.com/images/products/442519293/xjwgv_512.webp?width=512", badge: "New" },
  { id: 7, name: " cotton Bedsheet", price:800, image: "https://www.jaipurfabric.com/cdn/shop/files/dbs8380-249751_l.jpg?v=1721978318", badge: "New" },
  { id: 8, name: "Home Decoration set ", price: 3999, image: "https://www.flickkerbox.com/wp-content/uploads/2022/09/swan.jpg", badge: "New" },
];

const FeaturedProducts = () => {
  return (
    <section className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-24">
      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center">
        Featured Products
      </h2>

      {/* Products Grid */}
      <div className="w-full max-w-7xl grid sm:grid-cols-2 md:grid-cols-4 gap-8">
        {products.map((product) => (
          <motion.div
            key={product.id}
            className="relative flex flex-col bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
            whileHover={{ y: -5 }}
          >
            {/* Badge */}
            {product.badge && (
              <span className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 text-sm rounded-full z-10">
                {product.badge}
              </span>
            )}

            {/* Product Image */}
            <div className="w-full h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </div>

            {/* Product Details */}
            <div className="p-6 flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
              <p className="text-gray-600 font-bold mb-4">₹{product.price}</p>
              <button className="px-6 py-2 bg-slate-400 text-gray-800 font-semibold rounded-full hover:bg-gray-300 transition">
                Add to Cart
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
