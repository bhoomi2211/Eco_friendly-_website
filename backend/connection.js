const { log } = require('console');
const mongoose = require('mongoose');

const url = "mongodb+srv://bhoomi1812:1812@cluster0.uzh1ckn.mongodb.net/eco-friendly?retryWrites=true&w=majority&appName=Cluster0"

mongoose.connect(url)
    .then((result) => {
        console.log("Database connected successfully");


    }).catch((err) => {
        console.log(err);


    });

module.exports = mongoose;