"use client";
import axios from "axios";
import { useFormik } from "formik";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const LoginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    onSubmit: (values) => {
      axios
        .post("http://localhost:5000/user/authenticate", values)
        .then((result) => {
          toast.success("Login Successful");

          // ✅ Store user separately
          localStorage.setItem("user", JSON.stringify(result.data.user));

          // ✅ Store token separately
          localStorage.setItem("token", result.data.token);

          // Redirect to home or cart page
          router.push("/"); 
        })
        .catch((err) => {
          toast.error("Login Failed");
          console.log(err);
        });
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <motion.div
        className="bg-gray-800/90 backdrop-blur-xl p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-700"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Heading */}
        <motion.h1
          className="text-4xl font-extrabold mb-8 text-center text-blue-400"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          Welcome Back
        </motion.h1>

        {/* Form */}
        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-5"
          onSubmit={LoginForm.handleSubmit}
        >
          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"                    // ✅ name added
              autoComplete="email"            // ✅ autocomplete added
              onChange={LoginForm.handleChange}
              value={LoginForm.values.email}
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 outline-none"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"                 // ✅ name added
              autoComplete="current-password" // ✅ autocomplete added
              onChange={LoginForm.handleChange}
              value={LoginForm.values.password}
              placeholder="Enter your password"
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 outline-none"
              required
            />
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold text-lg shadow-md transition"
          >
            Sign In
          </motion.button>
        </motion.form>

        {/* Extra */}
        <p className="text-gray-400 text-sm text-center mt-6">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-400 hover:underline">
            Sign up
          </a>
        </p>
      </motion.div>
    </div>
  );
}
