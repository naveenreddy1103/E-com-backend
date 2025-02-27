const Firm=require('../models/Firm');
const Vendor=require('../models/Vendor');
const multer=require('multer');


 // multer standard function
 const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+path.extname(file.originalname));
    }
})
const upload=multer({storage:storage})
// this


// adding firm
const addFirm=async(req,res)=>{
   try{
    const {firmName,area,category,region,offer}=req.body;

    const image=req.file?req.file.filename:undefined;

   
    const vendor=await Vendor.findById(req.vendorId);

    if(!vendor){
        return res.status(404).json({message:"vendor not found"})
    }
    const firm=new Firm({
        firmName,area,category,region,offer,image,vendor:vendor._id
    });

  const saveFirm=  await firm.save();
 
  vendor.firm.push(saveFirm)
  await vendor.save();
    return res.status(200).json({message:"firm added successfully"});
   }
   catch(error){
    console.error(error);
    res.status(500).json({error:'vendor firm related issue'})
   }
    
}

// deleted firm based on firm ObjectId

const deleteFirmById=async(req,res)=>{
    try{
        const firmId=req.params.firmid;
        const deletedFirm=await Firm.findByIdAndDelete(firmId);

        if(!deletedFirm){
            return res.status(404).json({error:"firm id not found"});
        }

        res.status(200).json({message:`${deletedFirm.firmName} deleted`})
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"Internal server at deleted firm id"})
    }
}

module.exports={addFirm:[upload.single('image'),addFirm],deleteFirmById}