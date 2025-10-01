"use client";
import UseCartContext from "@/context/CartContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import React from "react";
import { toast } from "react-hot-toast";

const AddToCart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = UseCartContext();
  const router = useRouter();

  // Get user from localStorage
  
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error("Please login to place an order.");
      router.push("/login");
      return;
    }
    if (!user) {
      toast.error("Please login to place an order.");
      router.push("/login");
      return;
    }
    axios
      .post("http://localhost:5000/order/add", {
        // userId: user.user_id|| user._id, // or user._id, as per your user object
        items: cartItems.map((item) => ({
          productId: item._id,
          quantity: item.quantity,
        })),
        totalAmount: cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        ),
      },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        }
      )
      .then((res) => {
        toast.success("Order placed successfully!");
        clearCart();
        router.push("/OrderStatus");
      })
      .catch((err) => {
        console.error(err);        
        toast.error("Failed to place order!");
      });
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Your Cart</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Left: Cart Items */}
        <div className="md:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="flex items-center bg-white rounded-xl shadow-md p-4"
            >
              <img
                src={Array.isArray(item.images) ? item.images[0] : item.images}
                className="w-24 h-24 object-contain rounded-lg"
                alt={item.name}
              />
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-slate-600">₹{item.price}</p>
                <div className="flex items-center mt-2 gap-2">
                  <button
                    className="px-2 py-1 bg-slate-200 rounded"
                    onClick={() =>
                      updateQuantity(item._id, Math.max(1, item.quantity - 1))
                    }
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className="px-2 py-1 bg-slate-200 rounded"
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold">₹{item.price * item.quantity}</p>
               <button
  className="mt-2 flex items-center gap-2 px-3 py-1.5 
             bg-red-300 text-red-600 text-sm font-medium 
             rounded-lg shadow-sm 
             hover:bg-red-300 hover:text-red-700 
             transition-all duration-200"
  onClick={() => removeFromCart(item._id)}
>
  <Trash2 size={16} />
  Remove
</button>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 h-fit">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <p className="flex justify-between">
            <span>Total Items:</span> <span>{cartItems.length}</span>
          </p>
          <p className="flex justify-between font-semibold mt-2">
            <span>Total Price:</span>{" "}
            <span>
              ₹
              {cartItems.reduce(
                (total, item) => total + item.price * item.quantity,
                0
              )}
            </span>
          </p>
          <button
            className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
            onClick={handleCheckout}
            disabled={cartItems.length === 0}
          >
            Proceed to Checkout
          </button>
          <button
            className="w-full mt-3 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
            onClick={clearCart}
            disabled={cartItems.length === 0}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
