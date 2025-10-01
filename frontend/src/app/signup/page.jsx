"use client";
import axios from "axios";
import { useFormik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

// ✅ Validation schema
const SignupSchema = Yup.object().shape({
  name: Yup.string().min(2, "Too Short!").max(50, "Too Long!").required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Min 6 characters required"),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

const Signup = () => {
  const signupForm = useFormik({
    initialValues: { name: "", email: "", password: "", confirmPassword: "" },
    onSubmit: (values, { resetForm }) => {
      axios
        .post("http://localhost:5000/user/add", values)
        .then(() => {
          toast.success("User registered successfully 🎉");
          resetForm();
        })
        .catch(() => {
          toast.error("Something went wrong ❌");
        });
    },
    validationSchema: SignupSchema,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="bg-gray-800/90 backdrop-blur-xl p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-700 relative overflow-hidden">
        
        {/* Floating Circle Decoration */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600 rounded-full opacity-20 blur-3xl" />

        {/* Heading */}
        <h1 className="text-4xl font-extrabold mb-2 text-center text-blue-400">
          Create Account
        </h1>
        <p className="text-gray-400 text-sm text-center mb-6">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Sign in
          </a>
        </p>

        {/* Form */}
        <form onSubmit={signupForm.handleSubmit} className="flex flex-col gap-5">
          {/* Full Name */}
          <div>
            <label htmlFor="name" className="block mb-2 text-sm text-gray-300">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              onChange={signupForm.handleChange}
              value={signupForm.values.name}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 outline-none"
              placeholder="Enter your name"
            />
            {signupForm.touched.name && signupForm.errors.name && (
              <p className="text-sm text-red-500 mt-1">{signupForm.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block mb-2 text-sm text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              onChange={signupForm.handleChange}
              value={signupForm.values.email}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 outline-none"
              placeholder="you@example.com"
            />
            {signupForm.touched.email && signupForm.errors.email && (
              <p className="text-sm text-red-500 mt-1">{signupForm.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block mb-2 text-sm text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              onChange={signupForm.handleChange}
              value={signupForm.values.password}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 outline-none"
              placeholder="••••••••"
            />
            {signupForm.touched.password && signupForm.errors.password && (
              <p className="text-sm text-red-500 mt-1">{signupForm.errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block mb-2 text-sm text-gray-300">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              onChange={signupForm.handleChange}
              value={signupForm.values.confirmPassword}
              className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-blue-500 focus:ring focus:ring-blue-500/30 outline-none"
              placeholder="Re-enter password"
            />
            {signupForm.touched.confirmPassword && signupForm.errors.confirmPassword && (
              <p className="text-sm text-red-500 mt-1">{signupForm.errors.confirmPassword}</p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-center text-sm text-gray-400">
            <input
              type="checkbox"
              id="terms"
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="terms" className="ml-2">
              I accept the{" "}
              <a href="#" className="text-blue-400 hover:underline">
                Terms & Conditions
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold text-lg shadow-md transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
