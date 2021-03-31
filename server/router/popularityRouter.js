import express from 'express'
//import breaker from 'express-circuit-breaker'
import movieService   from '../services/movieService'
import CircuitBreaker from '../circuitbreaker/Circuitbreaker'
const router=express.Router();

//Circuit breaker
// var CB = breaker({
//   catchError: e => 'trip',
//   handleBlockedRequest: (req, res) => res.sendStatus(500)
// })
//Get Request to Fetch movie data


let breaker = new CircuitBreaker();
router.get('/',(req,res)=>{
breaker.fire(movieService).then(data=>{
  let popularity = req.headers.popularity;
  const rating=data.results.filter(results=>results.popularity>popularity);
  res.send(rating.sort());
}).catch(err => res.sendStatus(500))
})


export default router;