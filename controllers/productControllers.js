const Firm = require('../models/Firm');
const Product=require('../models/Product');
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

// Adding product
const addProduct=async(req,res)=>{
    try{
        const {productName,price,category,bestseller,description}=req.body;
        const image=req.file ? req.file : undefined;

        const firmId=req.params.firmid;
        const firm=await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"No firm found"})
        };
        const product= new Product({
            productName,price,category,bestseller,description,image,firm: firm._id
        });
        const savedProduct= await product.save();
        firm.products.push(savedProduct);
        await firm.save();
        res.status(200).json(savedProduct);
    }
    catch(error){
         console.error(error);
         res.status(500).json({Error:"Inter error in productController"})
    }
}

// getting products based on firmid
const getProductByFirm=async(req,res)=>{
    try{
        const firmId=req.params.firmid;
        const firm=await Firm.findById(firmId);
        if(!firm){
            return res.status(404).json({error:"firm not found"});

        }
  
        const restarentName=firm.firmName;

        const products=await Product.find({firm:firmId});
        res.status(200).json({restarentName,products})
    }
    catch(error){
        console.error(error);
        res.status(500).json({Error:"Inter error in productController"})
    }
}

// delete product

const deleteProductById=async(req,res)=>{
   try{
    const productId=req.params.productid;
    const deletedProduct =await Product.findByIdAndDelete(productId);
    if(!deletedProduct){
        return res.status(404).json({error:"No product found"})
    }
    res.status(200).json({message:`${deletedProduct.productName} deleted successfully`});
   }
   catch(error){
    console.error(error);
    res.status(500).json({error:"Internal server check onces delete product"});
   }
}

module.exports={addProduct:[upload.single('image'),addProduct],getProductByFirm,deleteProductById}