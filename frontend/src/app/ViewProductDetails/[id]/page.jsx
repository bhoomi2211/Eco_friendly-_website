'use client'
import UseCartContext from '@/context/CartContext';
import axios from 'axios';
import { Heart } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const ViewProductDetails = () => {
  const { id } = useParams();
  const [product, setproduct] = useState(null);

  const { addToCart } = UseCartContext();

  useEffect(() => {
    if (id) {
      axios.get(`http://localhost:5000/product/getbyid/${id}`)
        .then((result) => {
          console.log(result.data);
          setproduct(result.data);
        }).catch((err) => {
          console.log(err);
        });
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <p className="text-slate-600 text-lg font-medium">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-gray-200 px-6 py-12">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 max-w-5xl w-full border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left: Product Image */}
        <div className="relative">
          <img
            src={product.images}
            alt={product.name}
            className="w-full h-[500px] object-cover rounded-2xl shadow-lg"
          />
          {/* Wishlist Icon */}
          <button className="absolute top-4 right-4 bg-white/80 p-3 rounded-full shadow hover:bg-red-100 transition">
            <Heart className="w-6 h-6 text-slate-700 hover:text-red-500" />
          </button>
        </div>

        {/* Right: Product Info */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-800 mb-4">{product.name}</h1>
            <p className="text-lg text-slate-600 mb-6">{product.description}</p>

            <div className="grid grid-cols-2 gap-4 text-slate-700 text-sm mb-6">
              <div><span className="font-semibold">Brand:</span> {product.brand}</div>
              <div><span className="font-semibold">Category:</span> {product.category}</div>
              <div><span className="font-semibold">Stock:</span> {product.stock}</div>
              <div><span className="font-semibold">Tags:</span> {product.tags}</div>
            </div>

            {/* Price */}
            <div className="text-3xl font-bold text-slate-900 mb-6">₹{product.price}</div>
          </div>

          {/* Bottom Buttons */}
          <div className="flex gap-4 mt-6">
            <button onClick={() => { addToCart(product) }} className="flex-1 bg-slate-800 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-slate-900 transition ">
              Add to Cart
            </button>
            <button className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-semibold shadow-md hover:bg-blue-700 transition">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default ViewProductDetails;
