"use client";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import toast from "react-hot-toast";

export default function Contact() {

  const ContactForm = useFormik({
    initialValues: {
      name: '',
      email: '',
  },
  onSubmit: (values) => {
    console.log(values);
    axios.post('http://localhost:5000/contact/add', values)
    .then((result) => {
      toast.success("Message Sent Successfully");
      console.log(result.data);

      
    }).catch((err) => {
      console.log(err);
      toast.error("Failed to Send Message");

      
    });
  }
})
  return (
    <section className="relative w-full min-h-screen bg-slate-100 flex items-center justify-center px-6 py-20">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl p-10 md:p-16 flex flex-col md:flex-row gap-10">
        
        {/* Left Side: Contact Info */}
        <div className="flex-1 flex flex-col justify-center gap-6">
          <h2 className="text-4xl font-bold text-slate-800 mb-4">Get in Touch</h2>
          <p className="text-slate-600 text-lg">
            Have a question or want to collaborate? Fill out the form or reach us through the info below.
          </p>

          <div className="flex flex-col gap-4 mt-6">
            <div className="flex items-center gap-3 text-slate-700">
              <span className="font-semibold">📍 Address:</span>
              <span>123 Main Street, City, Country</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <span className="font-semibold">📞 Phone:</span>
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-3 text-slate-700">
              <span className="font-semibold">✉ Email:</span>
              <span>contact@ecomexample.com</span>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="flex-1" onSubmit={ContactForm.handleSubmit}>
          <form className="flex flex-col gap-6">
            <label className="text-slate-700 font-semibold">Name</label>
            <input
              type="text"
              id="name"
              value={ContactForm.values.name}
              onChange={ContactForm.handleChange}
              placeholder="Your Name"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 text text-black focus:ring-slate-400"
            />
            <label className="text-slate-700 font-semibold">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              id="email"
              value={ContactForm.values.email}
              onChange={ContactForm.handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none text-black  focus:ring-2 focus:ring-slate-400"
            />
            <label className="text-slate-700 font-semibold">Message</label>
            <textarea
             id="message"
             value={ContactForm.values.message
        
             }
             onChange={ContactForm.handleChange}
              rows="5"
              placeholder="Your Message"
              className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 text-black focus:ring-slate-400 resize-none"
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

      {/* Decorative Shapes */}
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-slate-400 opacity-20 rounded-full blur-3xl"></div>
      <div className="absolute top-0 -right-20 w-72 h-72 bg-slate-300 opacity-10 rounded-full blur-3xl"></div>
    </section>
  );
}
