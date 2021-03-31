import express from 'express'
import genreService   from '../services/genreService'
import movieService   from '../services/movieService'
import CircuitBreaker from '../circuitbreaker/Circuitbreaker'


const router=express.Router();

//Circuit breaker
let breaker = new CircuitBreaker();
//Get Request to Fetch movie data
router.get('/',(req,res)=>{
    let genreId=[];
    let movies=[];
    let genreList=[];
    let filteredMovies=[];
    let genres=req.headers.genres;
    breaker.fire(genreService).then(data=>
        {
            data.genres.forEach(element=>{
                if(genres.includes(element.name))
                        {
                            genreId.push(element.id);
                        }
            })
            breaker.fire(movieService).then(ms=>                
                {
                    ms.results.filter(movie=>{
                    movies.push(movie);                 
                     })
                movies.filter(movie => 
                            {
                                genreId.forEach(id => {
                                    if(movie.genre_ids.includes(id)){
                                        filteredMovies.push(movie)
                                    }
                                })
                            }
                            )                
                            console.log(`Movies filtered from ${movies.length} to ${filteredMovies.length}`) ;           
                            res.send(filteredMovies);
                        })
            }
        )
})


export default router;