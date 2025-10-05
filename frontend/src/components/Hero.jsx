"use client";
import React from "react";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 flex flex-col md:flex-row items-center justify-between px-6 lg:px-16 py-12 overflow-hidden">
      
      {/* Left Content */}
      <div className="max-w-2xl z-10 text-center md:text-left mb-10 md:mb-0">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-3xl sm:text-4xl lg:text-6xl font-extrabold mb-6 leading-snug text-white"
        >
          Shop Smarter, <br className="hidden sm:block"/> Live Better
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="text-base sm:text-lg lg:text-xl text-gray-300 mb-8 max-w-lg mx-auto md:mx-0"
        >
          Discover thousands of quality products with fast delivery, amazing customer service and best prices.
        </motion.p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
          <button className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold shadow-lg hover:bg-blue-600 transition">
            Shop Now
          </button>
          <button className="px-6 py-3 bg-transparent border border-gray-400 text-gray-200 rounded-full font-semibold hover:bg-gray-800 transition">
            See All Products
          </button>
        </div>
      </div>

      {/* Right Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="relative w-full max-w-sm sm:max-w-md lg:max-w-xl md:ml-10"
      >
        <div className="rounded-3xl p-2 bg-white/10 backdrop-blur-md shadow-2xl">
          <img
            src="https://media.istockphoto.com/id/493029628/photo/set-of-decorative-cosmetic.jpg?s=612x612&w=0&k=20&c=JYxqtgYkpBD-tITJJ60ex_04bEi52uHCEJDFuOlKaNA="
            alt="Shopping"
            className="rounded-3xl shadow-lg object-cover h-[300px] sm:h-[400px] lg:h-[550px] w-full"
          />
        </div>
      </motion.div>

      {/* Floating Decorative Shapes */}
      <div className="absolute -bottom-20 -left-20 w-56 sm:w-72 h-56 sm:h-72 bg-blue-500 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-10 -right-20 w-56 sm:w-72 h-56 sm:h-72 bg-pink-500 opacity-20 rounded-full blur-3xl animate-pulse"></div>
    </section>
  );
}
