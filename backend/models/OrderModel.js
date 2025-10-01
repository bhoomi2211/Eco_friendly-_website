const {Schema, model} = require('../connection');
const ordrerSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'product', required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ],  
    totalAmount: { type: Number, required: true },
    status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now }
});
module.exports = model('orders', ordrerSchema);