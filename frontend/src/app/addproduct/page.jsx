'use client';
import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const AddProduct = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  // ✅ Safe admin check
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    const u = JSON.parse(storedUser);
    setUser(u);
    setLoading(false);
  }, [router]);

  // ✅ Formik + Yup
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
    validationSchema: Yup.object({
      name: Yup.string().required('Product name is required'),
      category: Yup.string().required('Category is required'),
      price: Yup.number().required('Price is required').positive('Must be positive'),
      stock: Yup.number().required('Stock is required').min(0, 'Cannot be negative'),
      description: Yup.string().required('Description is required'),
      images: Yup.string().required('At least one image is required'),
    }),
    onSubmit: (values, { resetForm }) => {
      const token = localStorage.getItem('token');
      axios
        .post('http://localhost:5000/product/add', values, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then(() => {
          toast.success('Product Added Successfully');
          resetForm();
        })
        .catch(() => toast.error('Failed to Add Product'));
    },
  });

  // ✅ Image upload
  const uploadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('cloud_name', 'dn1wpxm8j');
    formData.append('upload_preset', 'Bhoomi');

    axios
      .post('https://api.cloudinary.com/v1_1/dn1wpxm8j/image/upload', formData)
      .then((res) => {
        toast.success('Image Uploaded Successfully');
        ProductForm.setFieldValue('images', res.data.url);
      })
      .catch(() => toast.error('Failed to upload image'));
  };

  // 🔹 Render checks
  if (loading) return <div className="text-center py-20">Loading...</div>;
  if (!user || user.role !== 'admin') return <div className="text-center py-20 text-red-500">Access Denied</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-start py-12 px-4">
      <form
        className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-8 space-y-6"
        onSubmit={ProductForm.handleSubmit}
      >
        <h1 className="text-3xl font-bold text-gray-900 text-center">Add New Product</h1>

        {/* Product Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-1">Product Name *</label>
            <input
              type="text"
              name="name"
              value={ProductForm.values.name}
              onChange={ProductForm.handleChange}
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Product Name"
            />
            {ProductForm.errors.name && ProductForm.touched.name && (
              <p className="text-red-500 text-sm">{ProductForm.errors.name}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Brand</label>
            <input
              type="text"
              name="brand"
              value={ProductForm.values.brand}
              onChange={ProductForm.handleChange}
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="Brand"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Category *</label>
            <select
              name="category"
              value={ProductForm.values.category}
              onChange={ProductForm.handleChange}
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            >
              <option value="">Select category</option>
              <option value="electronics">Electronics</option>
              <option value="home">Home & Decoration</option>
              <option value="footwear">Footwear</option>
              <option value="sports">Sports & Fitness</option>
              <option value="beauty">Beauty & Care</option>
              <option value="books">Books & Media</option>
              <option value="fashion">Fashion</option>
            </select>
            {ProductForm.errors.category && ProductForm.touched.category && (
              <p className="text-red-500 text-sm">{ProductForm.errors.category}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Price *</label>
            <input
              type="number"
              name="price"
              value={ProductForm.values.price}
              onChange={ProductForm.handleChange}
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              placeholder="0.00"
            />
            {ProductForm.errors.price && ProductForm.touched.price && (
              <p className="text-red-500 text-sm">{ProductForm.errors.price}</p>
            )}
          </div>
        </div>

        {/* Stock & Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 mb-1">Stock Quantity *</label>
            <input
              type="number"
              name="stock"
              value={ProductForm.values.stock}
              onChange={ProductForm.handleChange}
              placeholder="e.g. 100"
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
            {ProductForm.errors.stock && ProductForm.touched.stock && (
              <p className="text-red-500 text-sm">{ProductForm.errors.stock}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 mb-1">Tags</label>
            <input
              type="text"
              name="tags"
              value={ProductForm.values.tags}
              onChange={ProductForm.handleChange}
              placeholder="e.g. new, bestseller"
              className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700 mb-1">Description *</label>
          <textarea
            name="description"
            value={ProductForm.values.description}
            onChange={ProductForm.handleChange}
            rows="4"
            placeholder="Write product description..."
            className="w-full px-4 py-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
          />
          {ProductForm.errors.description && ProductForm.touched.description && (
            <p className="text-red-500 text-sm">{ProductForm.errors.description}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-gray-700 mb-2">Product Images *</label>
          <input
            type="file"
            accept="image/*"
            onChange={uploadFile}
            className="w-full file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-900 file:text-white hover:file:bg-gray-700 transition"
          />
          {ProductForm.errors.images && ProductForm.touched.images && (
            <p className="text-red-500 text-sm">{ProductForm.errors.images}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
