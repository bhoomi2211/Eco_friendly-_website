const express=require('express');
const app=express();
const UserRouter=require('./routers/UserRouter');
const ProductRouter=require('./routers/ProductRouter');
const OrderRouter=require('./routers/OrderRouter');
const ContactRouter=require('./routers/ContactRouter');
const mongoose=require('./connection');
const dotenv = require('dotenv').config();


const cors=require('cors');



const port = 5000;

//middleware
app.use(cors({
    origin:['http://localhost:3000']
}));
app.use(express.json());
app.use("/user",UserRouter);


//endpoint

//product middleware router start
app.use("/product",ProductRouter);
//end
//order middleware router start
app.use("/order",OrderRouter);
//end
//contact middleware router start
app.use("/contact",ContactRouter);
//end

//middleware  for profile router end
  

   
//endpoints



app.get('/',(req ,res)=>{
    res.send('response from express');
});
app.get('/add',(req ,res)=>{
    res.send('response from add ');
});

//getall
app.get('/getall',(req ,res)=>{
    res.send('response from getall');
});
//delete
app.get('/delete',(req ,res)=>{
    res.send('response from delete');
});


//starting the server

app.listen(port, () => {
    console.log("Server started");
});