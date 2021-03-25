import express from 'express'
import breaker from 'express-circuit-breaker'
import movieService  from '../services/movieService'

const router=express.Router();


//Circuit breaker
var CB = breaker({
  catchError: e => 'trip',
  handleBlockedRequest: (req, res) => res.sendStatus(500)
})

//Get Request to Fetch movie data
router.get('/',CB,(req,res)=>{
  movieService.then(data=>{
    let popularity = req.headers.popularity;
    const rating=data.results.filter(results=>results.popularity>popularity);
    res.send(rating.sort());
  }).catch(err => res.sendStatus(500))
})


export default router;