const express=require('express');
const app=express();
const dotenv=require('dotenv').config();
const mongoose=require("mongoose")

const PORT=process.env.PORT ||4000;
const vendorRoutes=require('./routes/vendorRoutes');
const bodyParser=require('body-parser');
const firmRoutes=require('./routes/firmRoutes');
const productRoute=require('./routes/productRoutes');
const path=require('path')


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB connected")
}).catch((err)=>console.log(err));

app.use(bodyParser.json());

app.use('/vendor',vendorRoutes);

app.use('/firm',firmRoutes);

app.use('/product',productRoute);

app.use('/uploads',express.static('uploads'))



app.use('/',(req,res)=>{
    res.send("<h1>welcome to swiggy</h1>")
})

app.listen(PORT,()=>{
    console.log(`server started: http://127.0.0.1:${PORT}`);
})