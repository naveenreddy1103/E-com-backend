const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const dotenv=require('dotenv')
dotenv.config();

const verifyToken=async(req,res,next)=>{
    const token=req.headers.token;
    if(!token){
        return res.status(401).json({message:"token is required"})
    }
    try{
      const decode=jwt.verify(token,process.env.WhatIsYourName);
      const vendor=await Vendor.findById(decode.vendorId);
       
      if(!vendor){
        return res.status(404).json({error:"vendor not found"})
      }

      req.vendorId=vendor._id;
      next();
    }
    catch(error){
       console.error(error);
       res.status(500).json({error:"internal server error"})
    }
}

module.exports=verifyToken;