'use client'
import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
// import { imageConfigDefault } from 'next/dist/shared/lib/image-config';
const AddProduct = () => {

  const addProductValidationSchema = Yup.object().shape({
    name: Yup.string().required('Product name is required'),
    category: Yup.string().required('Category is required'),
    price: Yup.number().required('Price is required').positive('Price must be positive'),
    stock: Yup.number().required('Stock quantity is required').min(0, 'Stock cannot be negative'),
    description: Yup.string().required('Description is required'),
    images: Yup.string().required('At least one image is required')
  });

  const ProductForm = useFormik({
    initialValues: {
      name: '',
      brand: '',
      category: '',
      price: '',
      stock: '',
      tags: '',
      description: '',
      images: '',
    },

    onSubmit: (values, { resetForm }) => {

      console.log(values);
      axios.post('http://localhost:5000/product/add', values)
        .then((result) => {
          toast.success("Product Added Successfully");
          console.log(result.data);
          resetForm();
        }).catch((err) => {
          toast.error("Failed to Add Product");
          console.log(err);
        });
    },
    validationSchema: addProductValidationSchema,
  })
  // console.log(ProductForm.errors);

  const uploadFile = (e) => {
    const file = e.target.files[0];
    console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('cloud_name', "dn1wpxm8j");
    formData.append('upload_preset', "Bhoomi");

    axios.post("https://api.cloudinary.com/v1_1/dn1wpxm8j/image/upload", formData)
      .then((result) => {
        console.log(result.data);
        toast.success("Image Uploaded Successfully");
        ProductForm.setFieldValue('images', result.data.url);
      }).catch((err) => {
        console.log(err);
        toast.error("Failed to upload image");
      });

  }

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center items-start py-12 px-4">
      <form className="w-full max-w-3xl bg-white shadow-sm rounded-2xl p-8 space-y-8" onSubmit={ProductForm.handleSubmit}>
        <h1 className="text-3xl font-bold text-slate-900">Add New Product</h1>

        {/* Basic Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-slate-700 mb-1 block">Product Name *</label>
            <input type="text" name="name" value={ProductForm.values.name}
              onChange={ProductForm.handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="Product Name" />
          </div>
          <div>
            <label className="text-slate-700 mb-1 block">Brand</label>
            <input type="text" name="brand"
              value={ProductForm.values.brand}
              onChange={ProductForm.handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="Brand" />
          </div>
          <div>
            <label className="text-slate-700 mb-1 block">Category *</label>
            <select name="category"
              value={ProductForm.values.category}
              onChange={ProductForm.handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-500">
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="Home & Decoration ">Home & Decoration</option>
              <option value="Footwear">Footwear</option>
              <option value="Sports &Fitness">Sports & Fitness</option>
              <option value="Beauty & Care">Beauty & Care</option>
              <option value="Books & Media">Books & Media</option>
              <option value="Fashion">Fashion</option>
            </select>
          </div>
          <div>
            <label className="text-slate-700 mb-1 block">Price *</label>
            <input name="price"
              value={ProductForm.values.price}
              onChange={ProductForm.handleChange}
              type="number"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="$0.00" />
          </div>
        </div>

        {/* Stock & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-slate-700 mb-1 block">Stock Quantity *</label>
            <input type="number" name="stock"
              value={ProductForm.values.stock}
              onChange={ProductForm.handleChange}
              placeholder="e.g. 100"
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500" />
          </div>
          <div>
            <label className="text-slate-700 mb-1 block">Tags</label>
            <input type="text" name="tags"
              value={ProductForm.values.tags}
              onChange={ProductForm.handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="e.g. new, bestseller" />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="text-slate-700 mb-1 block">Description *</label>
          <textarea name="description"
            value={ProductForm.values.description}
            onChange={ProductForm.handleChange}
            rows="4"
            className="w-full px-4 py-3 border border-slate-300 rounded-lg text-slate-900 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-slate-500" placeholder="Write product description..." />
        </div>

        {/* Images Upload */}
        <div>
          <label className=" text-black mb-2 block">Product Images</label>
          <input type="file" accept='image/*'
            onChange={uploadFile}
            className="mb-4 w-full file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-black file:text-black-800 hover:file:bg-black transition" />

        </div>

        <button type="submit" className="w-full py-3 bg-slate-600 hover:bg-slate-700 text-gray-50 font-semibold rounded-xl shadow hover:shadow-lg transition-all">
          Add Product
        </button>
      </form>
    </div>
  )
}

export default AddProduct;
