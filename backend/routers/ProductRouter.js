const express = require('express');
const Model = require('../models/ProductModel');
const router = express.Router();
const { model } = require('mongoose');

//add new product

router.post('/add', (req, res) => {


    console.log(req.body);

    new Model(req.body).save()
        .then((result) => {
            res.status(200).json(result);


        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err);

        });
});

//getall the products
router.get('/getall', (req, res) => {


    Model.find()
        .then((result) => {
            res.status(200).json(result);

        }).catch((err) => {
            console.log(err);

            res.status(500).json(err);
        });
});

//  find  by get by id
router.get('/getbyid/:id', async (req, res) => {

    Model.findById(req.params.id)
        .then((product) => {
            console.log(product);

            if (!product) {
                res.status(404).json({ message: "Product not found" });
            }
            res.json(product);
        }).catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete using id parameter
router.delete('/delete/:id', (req, res) => {


    Model.findByIdAndDelete(req.params.id)
        .then((result) => {
            res.status(200).json(result);

        }).catch((err) => {
            console.log(err);

            res.status(500).json(err);

        });
});

//update the product by id
router.put('/update/:id', (req, res) => {
    Model.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then((result) => {
            res.status(200).json(result);

        }).catch((err) => {
            console.log(err);

            res.status(500).json(err);

        });
});

module.exports = router;