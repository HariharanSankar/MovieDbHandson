import express from 'express'
//import breaker from 'express-circuit-breaker'
import movieService   from '../services/movieService'
import CircuitBreaker from '../circuitbreaker/Circuitbreaker'
const router=express.Router();
let breaker = new CircuitBreaker(movieService);
router.get('/',(req,res)=>{
breaker.fire().then(response=>{
  let movies=response.data;
  let popularity = req.headers.popularity;                                   
  let rating=movies.results.filter(movie=>movie.popularity>popularity);
  res.send(rating.sort());
}).catch(err => res.sendStatus(500))
})  

export default router;