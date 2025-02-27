const express=require('express');
const firmController=require('../controllers/firmController');
const verifyToken=require('../middlewares/verifytoken');

const Router=express.Router();

Router.post('/add-firm',verifyToken,firmController.addFirm);

Router.get('/uploads/:imageName',(req,res)=>{
    const imageName=req.params.imageName;
    req.headersSent('Content-Type','image/jpeg');
    res.sendFile(path.join(__dirname,'..','uploads',imageName));
});

Router.delete('/:firmid',firmController.deleteFirmById);

module.exports=Router;