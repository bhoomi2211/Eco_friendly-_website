"use client";
import React from "react";

// ✅ Correct path (depends where your components folder is)
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedProducts from "../components/FeaturedProducts";
import Footer from "../components/Footer";
import AboutPage from "./aboutUs/page";


const HomePage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      
      <Hero />
      <Categories />
      <FeaturedProducts />
      <AboutPage/>
      <Footer />
    </div>
  );
};

export default HomePage;
