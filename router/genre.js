const express=require('express')
const router=express.Router();

router('/',(req,res)=>{
    res.send({message:"Movies"})
})