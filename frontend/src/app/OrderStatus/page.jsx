'use client'
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setToken(storedToken);
  }, []);

  useEffect(() => {
    if (!user || !token) return;

    axios
      .get(`http://localhost:5000/order/getbyuser/${user._id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setOrders(res.data))
      .catch((err) => console.error(err));
  }, [user, token]);

  // Step order for tracking
  const steps = ["Pending", "Paid", "Shipped", "Delivered"];

  const getStepIndex = (status) => {
    switch (status) {
      case "Pending": return 0;
      case "Paid": return 1;
      case "Shipped": return 2;
      case "Delivered": return 3;
      case "Cancelled": return -1; // special case
      default: return 0;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 px-6 py-12">
      <h1 className="text-4xl font-extrabold mb-12 text-gray-800 text-center tracking-tight">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No orders yet.</p>
      ) : (
        <div className="space-y-10 max-w-5xl mx-auto">
          {orders.map((order) => {
            const stepIndex = getStepIndex(order.status);

            return (
              <div
                key={order._id}
                className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-lg p-8 
                           hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 border border-gray-200"
              >
                {/* Order Header */}
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-bold text-xl text-gray-800">
                    Order <span className="text-blue-600">#{order._id.slice(-6)}</span>
                  </h2>
                  <span
                    className={`px-4 py-1 rounded-full text-sm font-semibold shadow-sm ${
                      order.status === "Cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>

                {/* Order Details */}
                <div className="text-gray-700 space-y-2 mb-6">
                  <p className="text-lg">
                    <span className="font-semibold">Total Amount:</span> ₹{order.totalAmount}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()} •{" "}
                    {new Date(order.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {/* Order Tracking */}
                {order.status !== "Cancelled" && (
                  <div className="mb-8">
                    <div className="flex justify-between items-center relative">
                      {steps.map((step, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm
                              ${
                                i <= stepIndex
                                  ? "bg-blue-600 text-white"
                                  : "bg-gray-300 text-gray-600"
                              }`}
                          >
                            {i + 1}
                          </div>
                          <p
                            className={`mt-2 text-xs font-medium ${
                              i <= stepIndex ? "text-blue-600" : "text-gray-500"
                            }`}
                          >
                            {step}
                          </p>
                          {i < steps.length - 1 && (
                            <div
                              className={`absolute top-4 left-[12%] w-[76%] h-1 
                                ${i < stepIndex ? "bg-blue-600" : "bg-gray-300"}`}
                            ></div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {order.status === "Cancelled" && (
                  <p className="text-red-600 font-semibold text-center mb-8">
                    ❌ This order was cancelled
                  </p>
                )}

                {/* Items List */}
                {order.items && order.items.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                      Items in this order
                    </h3>
                    <ul className="space-y-3">
                      {order.items.map((item, idx) => (
                        <li
                          key={idx}
                          className="flex justify-between items-center bg-gray-50 px-4 py-3 
                                     rounded-xl shadow-sm border border-gray-100 text-sm hover:bg-gray-100 transition-colors"
                        >
                          {/* Product Info */}
                          <div className="flex items-center gap-4">
                            {/* Product Image */}
                            {item.productId?.image && (
                              <img
                                src={item.productId.image}
                                alt={item.productId?.name || "Product"}
                                className="w-16 h-16 rounded-lg object-cover border"
                              />
                            )}
                            <div>
                              <p className="font-medium text-gray-700">
                                {item.productId?.name || "Product"}
                              </p>
                              <p className="text-gray-500 text-sm">
                                Price: ₹{item.productId?.price || 0}
                              </p>
                            </div>
                          </div>

                          {/* Quantity & Subtotal */}
                          <div className="text-right">
                            <p className="text-gray-600 font-medium">Qty: {item.quantity}</p>
                            <p className="text-gray-800 font-semibold">
                              Subtotal: ₹{(item.productId?.price || 0) * item.quantity}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
