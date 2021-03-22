const express=require('express')
const router=express.Router();

router('/',(req,res)=>{
    let results=data.results;         
    const rating=results.filter(results=>results.popularity>popularityRating)
    res.send(rating.sort())
})