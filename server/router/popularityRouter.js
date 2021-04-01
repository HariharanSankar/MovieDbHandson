import express from 'express'
import movieService from '../services/movieService'
import CircuitBreaker from '../circuitbreaker/Circuitbreaker'
const router = express.Router(); 

router.get('/', (req, res) => {
  try{
    new CircuitBreaker(movieService).fire().then(response => {
    let movies = response.data;
    let popularity = req.headers.popularity;
    let rating = movies.results.filter(movie => 
                            movie.popularity > popularity);
    res.send(rating.sort());
  }).catch(err => res.sendStatus(500))}
  catch(err){
    res.sendStatus(500).res.send(err);
  }
})

export default router;