const express=require('express');
const router=express.Router();
const genreService = require('../services/genreService');
const movieService = require('../services/movieService');

router.get('/',(req,res)=>{
    let genreId=[];
    let movies=[];
    let genreList=[];
    let filteredMovies=[];
    let genres=req.headers['genre'].split(',');  
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


        
module.exports=router;