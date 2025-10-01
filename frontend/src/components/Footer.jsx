import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400 py-12 mt-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Branding */}
        <div>
          <div className="text-2xl font-bold text-white mb-2">E-market Place </div>
          <p className="text-gray-500">
            Your one-stop shop for everything you need. Discover, shop, and save with us!
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <a href="#" className="hover:text-blue-400 transition">Privacy Policy</a>
          <a href="#" className="hover:text-blue-400 transition">Terms of Service</a>
          <a href="#" className="hover:text-blue-400 transition">Contact</a>
          <a href="#" className="hover:text-blue-400 transition">Support</a>
        </div>

        {/* Social & Subscribe */}
        <div>
          <h3 className="text-white font-semibold mb-2">Stay Connected</h3>
          <div className="flex gap-4 mb-4">
            <a href="#" className="hover:text-blue-400 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-blue-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-blue-400 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-400 transition"><FaLinkedinIn /></a>
          </div>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Your email"
              className="p-2 rounded-md text-black flex-1"
            />
            <button
              type="submit"
              className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} E-Market place. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
