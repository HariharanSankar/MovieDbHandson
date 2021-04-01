import express, { response } from 'express'
import genreService from '../services/genreService'
import movieService from '../services/movieService'
import CircuitBreaker from '../circuitbreaker/Circuitbreaker'


const router = express.Router();


//Get Request to Fetch movie data
router.get('/', (req, res) => {    
        try{
        new CircuitBreaker(Promise.all([movieService, genreService])).fire()
        .then((responses)=> {
            return Promise.all(responses.map((response)=> {
                return response.data;
            }));
        })
        .then((data) =>{
            let genreId = [];
            let filteredMovies = [];
            let genresHeader = req.headers['genre'].split(',');
            const [movieapi,genreapi] = [...data];
            let movies = movieapi.results;
            let genres = genreapi.genres;
            genres.forEach(element => {
                if (genresHeader.includes(element.name)) {
                    genreId.push(element.id);
                }
            })
            console.log(genreId);
            //filtering genre ids from whole movie list by filter method
            movies.filter(movie => {
                genreId.forEach(id => {
                    if (movie.genre_ids.includes(id)) {
                        filteredMovies.push(movie)
                    }
                })
            }
            )
            console.log(`Movies filtered from ${movies.length} to ${filteredMovies.length}`);
            res.send(filteredMovies);
        }).catch(err=>res.sendStatus(500).res.send(err));
    }
    catch(err){
        res.sendStatus(500).res.send(err);
    }


})

export default router;