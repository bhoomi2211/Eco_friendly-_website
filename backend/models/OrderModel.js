const { Schema, model } = require('../connection');

const orderSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'user', required: true },

  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'products', required: true },
      quantity: { type: Number, required: true, min: 1 }
    }
  ],

  totalAmount: { type: Number, required: true },

  // ✅ Added "Paid" in status options
  status: { 
    type: String, 
    enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },

  createdAt: { type: Date, default: Date.now }
});

// ✅ Export model
module.exports = model('orders', orderSchema);
