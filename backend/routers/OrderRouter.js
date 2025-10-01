const express = require('express');
const Model = require('../models/OrderModel');
const verifyToken = require('../middlewares/auth');
const router = express.Router();

//add new order
router.post('/add', verifyToken, (req, res) => {
    req.body.userId = req.user._id; // Set userId from verified token
    console.log(req.body);
    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});

//getall orders
router.get('/getall', (req, res) => {
    Model.find()
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});

//get orders by userId
router.get('/getbyuser/:userid', verifyToken,(req, res) => {
    Model.find({ userId: req.params.userid })
        .then((result) => {
            res.status(200).json(result);
        }).catch((err) => {
            res.status(500).json(err);
            console.log(err);
        });
});

module.exports = router;
