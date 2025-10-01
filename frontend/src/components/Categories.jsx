"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link"; // If using Next.js for SPA navigation

const categories = [
  { id: 1, name: "Electronics", image: "https://www.matric.com/hubfs/classes%20of%20electronics.jpg" },
  { id: 2, name: "Fashion", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSto40-r9ANzk6qYNqPQib1AyAS2kQJQQi0ug&s" },
  { id: 3, name: "Home Decoration", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKIc_kss4gmWTk9urJ5yqttq3GnZ1y4ZUKDw&s" },
  { id: 4, name: "Footwear", image: "https://www.jack-wolfskin.com/on/demandware.static/-/Library-Sites-JackWolfskin_SharedContentLib/default/dw9e622e9b/landingpages/20250821Footwear/img/Hover_4.jpg" },
  { id: 5, name: "Fashion", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0td7EPeP2WX6Rby-Dfv60GpLa20eQKiP7-g&s" },
  { id: 6, name: "Sports & Fitness", image: "https://img1.wsimg.com/isteam/getty/496707717/:/cr=t:0%25,l:16.66%25,w:66.68%25,h:100%25" },
  { id: 7, name: "Books & Media" , image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgRuquGJtalZ8BXwKUGf3JGVOKfMltJ7gF6w&s" },
  { id: 8, name: "Beauty & Care", image: "https://images.unsplash.com/photo-1612817288484-6f916006741a?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YmVhdXR5JTIwcHJvZHVjdHN8ZW58MHx8MHx8fDA%3D" },
];

const Categories = () => {
  return (
    <section className="relative min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6 py-24">
      {/* Decorative background blur waves */}
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-0 right-0 h-52 bg-gray-200 opacity-20 rounded-t-full blur-3xl"></div>
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 w-[95%] h-44 bg-gray-300 opacity-10 blur-3xl rounded-full"></div>
      </div>

      {/* Section Title */}
      <motion.h3
        className="relative z-10 text-4xl md:text-5xl font-bold text-gray-800 mb-12 text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        Shop by Category
      </motion.h3>

      {/* Categories Card Container */}
      <motion.div
        className="relative z-10 w-full max-w-7xl p-12 grid md:grid-cols-4 gap-8"
        initial={{ y: 60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            className="flex flex-col items-center p-6 bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300 cursor-pointer"
            whileHover={{ y: -5 }}
          >
            <Link href={`/categories/${cat.name.toLowerCase()}`} className="w-full">
              {/* Category Image */}
              <div className="w-full h-40 mb-4 overflow-hidden rounded-2xl">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>
              {/* Category Title */}
              <h3 className="text-xl font-semibold text-gray-800 text-center">{cat.name}</h3>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Categories;
