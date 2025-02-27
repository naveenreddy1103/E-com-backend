const express=require('express');
const productController=require('../controllers/productControllers');

const router=express.Router();


router.post('/add-product/:firmid',productController.addProduct);
router.get('/:firmid/products',productController.getProductByFirm);
router.delete('/:productid',productController.deleteProductById);

router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    req.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});

module.exports=router;