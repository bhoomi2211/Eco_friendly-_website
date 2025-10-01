"use client";
import React from "react";

// Sample data
const teamMembers = [
  { id: 1, name: "Alice Johnson", role: "Founder & CEO", image: "https://via.placeholder.com/150" },
  { id: 2, name: "Michael Smith", role: "Head of Design", image: "https://via.placeholder.com/150" },
  { id: 3, name: "Sara Williams", role: "Marketing Lead", image: "https://via.placeholder.com/150" },
];

const stats = [
  { id: 1, label: "Customers", value: "500K+" },
  { id: 2, label: "Products", value: "50K+" },
  { id: 3, label: "Countries", value: "25+" },
];

const history = [
  { year: "2020", event: "Company founded with vision to simplify online shopping." },
  { year: "2021", event: "Reached 100K customers milestone." },
  { year: "2022", event: "Expanded product catalog to 25K items." },
  { year: "2023", event: "Started international shipping to 15 countries." },
  { year: "2024", event: "50K products available and operations in 25+ countries." },
];

export default function AboutPage() {
  return (
    <section className="relative w-full bg-slate-100 px-6 py-20">

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 mb-20">
        
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            About <span className="text-slate-500">Our Company</span>
          </h1>
          <p className="text-slate-700 text-lg md:text-xl mb-4">
            We are a modern e-commerce platform dedicated to providing high-quality fashion products to women worldwide.
          </p>
          <p className="text-slate-700 text-lg md:text-xl">
            Our mission is to make online shopping simple, enjoyable, and accessible.
          </p>
        </div>
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?fit=crop&w=600&q=80"
            alt="About Us"
            className="rounded-3xl shadow-2xl"
          />
        </div>
      </div>
       <div className="max-w-5xl mx-auto mb-20 text-center font-bold text-2xl  text-gray-800 md:text-3xl">
          <h1> Our Journey</h1>
          <p className="text-slate-700 text-sm md:text-xl mb-4 mt-6 pt-5">From a small startup to a trusted marketplace, discover the key moments that shaped our company's growth and success.</p>
       </div>
       <div>
      <div className="max-w-5xl mx-auto mb-20 text-center font-bold text-2xl  text-gray-800 md:text-3xl">
        <h2>Our Mission</h2>
           <p className="text-slate-700 text-sm md:text-xl mb-4 mt-6 pt-5 ">We believe everyone deserves access to high-quality products at fair prices. Our mission is to create a seamless shopping experience that connects customers with the products they love while supporting businesses around the world.

Through innovation, integrity, and customer-first thinking, we're building the future of e-commerce one satisfied customer at a time.</p>
      </div>
      
      </div>

     

      {/* Contact Info Section */}
      <div className="max-w-5xl mx-auto mb-20 bg-white rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-10">
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">Contact Us</h2>
          <p className="text-slate-700 mb-4">Reach us through any of the following methods:</p>
          <div className="flex flex-col gap-3 text-slate-700">
            <p> Address: 123 Main Street, City, Country</p>
            <p> Phone: +91 98765 43210</p>
            <p> Email: contact@ecomexample.com</p>
            <p>Business Hours: Mon-Fri 9:00 AM - 6:00 PM</p>
          </div>
        </div>
        <div className="flex-1">
          <form className="flex flex-col gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400"
            />
            <textarea
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-400 resize-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-slate-800 text-white rounded-full font-semibold hover:bg-slate-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Careers Section */}
      <div className="max-w-5xl mx-auto mb-20 text-center">
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Careers at <span className="text-slate-500">Our Company</span></h2>
        <p className="text-slate-700 mb-6">Join our dynamic team and help us build the future of online shopping.</p>
        <button className="px-8 py-3 bg-slate-800 text-white rounded-full font-semibold hover:bg-slate-700 transition">
          View Open Positions
        </button>
      </div>

      {/* Decorative Shapes */}
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-slate-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute top-0 -right-20 w-72 h-72 bg-slate-300 opacity-10 rounded-full blur-3xl"></div>
    </section>
  );
}
