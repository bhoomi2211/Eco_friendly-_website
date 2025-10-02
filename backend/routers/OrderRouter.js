const express = require('express');
const Model = require('../models/OrderModel');
const verifyToken = require('../middlewares/auth');
const isAdmin = require('../middlewares/isadmin');
const router = express.Router();

// Add new order (user)
router.post('/add', verifyToken, async (req, res) => {
  try {
    req.body.userId = req.user._id;
    const order = new Model(req.body);
    const savedOrder = await order.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get all orders (admin only)
router.get('/getall', verifyToken, isAdmin, async (req, res) => {
  try {
    const orders = await Model.find().populate("userId items.productId");
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get orders of logged-in user
router.get('/myorders', verifyToken, async (req, res) => {
  try {
    const orders = await Model.find({ userId: req.user._id }).populate("items.productId");
    res.status(200).json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Update order status (admin only)
router.put('/updatestatus/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const updatedOrder = await Model.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
