import express from 'express'
import genreService   from '../services/genreService'
import movieService   from '../services/movieService'
import breaker from 'express-circuit-breaker'

const router=express.Router();

//Circuit breaker
var CB = breaker({
    catchError: e => 'trip',
    handleBlockedRequest: (req, res) => res.sendStatus(500)
  })

//Get Request to Fetch movie data
router.get('/',CB,(req,res)=>{
    let genreId=[];
    let movies=[];
    let genreList=[];
    let filteredMovies=[];
    let genres=req.headers.genres;
     genreService.then(data=>
        {
            data.genres.forEach(element=>{
                if(genres.includes(element.name))
                        {
                            genreId.push(element.id);
                        }
            })
            movieService.then(ms=>                
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