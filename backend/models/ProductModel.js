const { Schema, model } = require('../connection');

const productSchema = new Schema({
  name: { type: String, required: true },
  brand: String,
  category: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  tags: [String],
  description: { type: String, required: true },
  images: [String],   // array of image URLs
  createdAt: { type: Date, default: Date.now }
});

module.exports = model('products', productSchema);