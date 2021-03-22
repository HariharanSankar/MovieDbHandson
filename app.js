const express =require('express')
const request=require('request')
const breaker=require('express-circuit-breaker')
const MOVIE_API="https://api.themoviedb.org/3/movie/now_playing?api_key=b7a195f9d259535f183aa711ffb7b91c&language=en-US&page=1";
const app=express();


app.use('/genre',require('./router/genre'))
app.use('/popularity',require('./router/popularity'))

const PORT= process.env.PORT||3000;

app.listen(PORT,console.log(`Server is running at port ${PORT}`));




