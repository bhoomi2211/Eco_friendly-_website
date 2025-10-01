"use client";
import React from "react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen bg-slate-400 flex items-center justify-center px-6 overflow-hidden">
      
      {/* Left Content */}
      <div className="max-w-2xl z-10 text-slate-800">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Discover  Amazing Products
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Shop from thousands of quality products with fast delivery and amazing customer service. Find everything you need in one place.
        </p>
        <button className="px-8 py-3 bg-slate-800 text-white rounded-full font-semibold hover:bg-slate-700 transition">
          See All Products
        </button>
      </div>

      {/* Right Image */}
      <div className="relative w-full max-w-3xl ml-10 hidden md:block">
        <img
          src="https://media.istockphoto.com/id/493029628/photo/set-of-decorative-cosmetic.jpg?s=612x612&w=0&k=20&c=JYxqtgYkpBD-tITJJ60ex_04bEi52uHCEJDFuOlKaNA="
          alt="Shopping"
          className="rounded-3xl shadow-2xl h-[600px] object-cover w-[2100px]"
        />
      </div>

      {/* Decorative shapes */}
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-slate-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute top-0 -right-20 w-72 h-72 bg-slate-300 opacity-10 rounded-full blur-3xl"></div>
    </section>
  );
}
