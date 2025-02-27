const Vendor=require('../models/Vendor');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv').config();
const jwtkey=process.env.WhatIsYourName;

const vendorRegister= async(req,res)=>{
    const {username,email,password}=req.body;

    try{
        const vendorEmail=await Vendor.findOne({email});
        if(vendorEmail){
            return res.status(400).json("email already taken");
        }
        const hashedPassword=await bcrypt.hash(password,10);

        const newVendor=new Vendor({
            username,
            email,password:hashedPassword
        })
        await newVendor.save();
        res.status(201).json({message:"Vendor Register successfully"});
        console.log("registerd")
    }
    catch(err){
        res.status(500).json({err:"Internal server error"})
      console.error(err);
    }

}

const vendorLogin=async(req,res)=>{
    const{email,password}=req.body;
    try{
        
        const vendor=await Vendor.findOne({email});
        if(!vendor|| !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error:"vendor not exist may be email or password mismatch"})
        }

        const token=jwt.sign({vendorId:vendor._id},jwtkey,{expiresIn:"1h"})

        res.status(200).json({message:"Login success",token})
        console.log(vendor.email)
    }
    catch(error){
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
}

const getAllVendors=async (req,res)=>{
    try{
        const vendors=await Vendor.find().populate('firm');
        res.json({vendors});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"getting vendors issue"})
    }
}

const getVendorById=async(req,res)=>{
    const vendorId=req.params.id;
    try{
        const vendor=await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return res.status(404).json({error:"vendor id not found"})
        }
        res.status(200).json({vendor})
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server issue"})
    }
}

module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}