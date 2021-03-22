const express=require('express')
const router=express.Router();
const breaker=require('express-circuit-breaker');
const movieService = require('../services/movieService');



//Circuit breaker
var CB = breaker({
  catchError: e => 'trip',
  handleBlockedRequest: (req, res) => res.sendStatus(500)
})

//Get Request to Fetch movie data
router.get('/',CB,(req,res)=>{
  movieService.then(data=>{
    let popularityRating=req.headers['popularity'];  
    const rating=data.results.filter(results=>results.popularity>popularityRating)
    res.send(rating.sort());
  }).catch(err => res.sendStatus(500))
})


module.exports = router;