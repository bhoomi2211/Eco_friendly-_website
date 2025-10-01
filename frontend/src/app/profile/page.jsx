"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const Profile = () => {
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("user")) : null;
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", city: "" });

  useEffect(() => {
    if (!user) return;
    axios
      .get(`http://localhost:5000/user/profile`, {
        headers: { Authorization: `Bearer ${user?.token}` },
      })
      .then((res) => {
        setUserData(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          city: res.data.city || "",
        });
      })
      .catch(() => {
        toast.error("Failed to fetch profile");
      });
  }, []);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/user/update/${userData._id}`, formData);
      setUserData({ ...userData, ...formData });
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (!userData) return <div className="text-center py-20 text-gray-400">Loading profile...</div>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4 py-12">
      <div className="relative w-full max-w-md bg-gray-800/90 backdrop-blur-xl p-10 rounded-2xl shadow-xl border border-gray-700 overflow-hidden">
        {/* Floating Circle Decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full opacity-20 blur-3xl" />

        {/* Heading */}
        <h1 className="text-4xl font-extrabold mb-2 text-center text-blue-400">My Profile</h1>
        <p className="text-gray-400 text-sm text-center mb-6">
          {isEditing ? "Edit your details below" : "View your account information"}
        </p>

        {/* Profile Form */}
        <form onSubmit={handleUpdate} className="flex flex-col gap-5">
          {["name", "email", "city"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block mb-2 text-sm text-gray-300 capitalize">
                {field}
              </label>
              {isEditing ? (
                <input
                  type={field === "email" ? "email" : "text"}
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 outline-none"
                  placeholder={`Enter your ${field}`}
                />
              ) : (
                <p className="text-gray-200 p-3 bg-gray-700 rounded-lg border border-gray-600">{userData[field]}</p>
              )}
            </div>
          ))}

          {/* Buttons */}
          <div className="flex justify-between mt-4">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-3 rounded-lg bg-gray-700 border border-gray-600 text-gray-200 hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition shadow-md"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="w-full px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition shadow-md"
              >
                Edit Profile
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
