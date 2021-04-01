import express, { response } from 'express'
import genreService   from '../services/genreService'
import movieService   from '../services/movieService'
import CircuitBreaker from '../circuitbreaker/Circuitbreaker'


const router=express.Router();

//Circuit breaker
let breaker = new CircuitBreaker(genreService);
//Get Request to Fetch movie data
router.get('/',(req,res)=>{
    let genreId=[];
    let movies=[];
    let genreList=[];
    let filteredMovies=[];
    let genresHeader=req.headers.genres;
        //              Promise.all(
        //             [axios.get(api1, {
        //                 httpsAgent: agent
        //             }), axios.get(api2, {
        //                 httpsAgent: agent
        //             })]).then(function (responses) {
        //             return Promise.all(responses.map(function (response) {
        //                 return response.data;
        //             }));
        //         }).then(function (data) {data[0] data[1]}
 
    
    breaker.fire().then(response=>
        {
            let genres=response.data;           
          genres.forEach(element=>{
                if(genresHeader.includes(element.name))
                        {
                            genreId.push(element.id);
                            console.log(element.id)
                        }
            })
            movieService.then(ms=>                
                {
                    ms.data.results.filter(movie=>{
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