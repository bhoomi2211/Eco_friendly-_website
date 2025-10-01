const express = require('express');
const Model = require('../models/contactModel');
const router = express.Router();
const { model } = require('mongoose');

//add new contact
 router.post('/add',(req,res)=>{
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
//getall contacts
    router.get('/getall',(req,res)=>{
        Model.find()
        .then((result) => {
            res.status(200).json(result);
        })
        .catch((err) => {
            res.status(500).json(err);
            console.log(err); 
        }); 
    });


module.exports = router;
