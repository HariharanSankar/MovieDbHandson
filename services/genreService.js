const express=require('express')
const request=require('request')
const app=express()
const GENREAPI="https://api.themoviedb.org/3/genre/movie/list?api_key=b7a195f9d259535f183aa711ffb7b91c&language&language=en-US";

//URL to get the Genre List
let options={
    url:GENREAPI,
    strictSSL:false,
     rejectUnauthorized: false,//add when working with https sites
     requestCert: false,//add when working with https sites
     agent: false,
    secureProtocol:'TLSv1_method'
}

        request.get(options,(err,response,body)=>{
               if(err)
               console.log(err);
               else{
                 let genreId=[];
                 let movies=[];
                 let filteredMovies=[];
                 let genreList= 0||JSON.parse(body).genres; 
                 let genres=req.headers['genre'].split(',');   
                 if(genres.length!==0){
                 genreList.forEach(element => {
                     if(genres.includes(element.name))
                     {
                         genreId.push(element.id);
                     }
                 });
                movieapi.results.filter(movie=>{
                 movies.push(movie)
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
                 console.log(`Total Movies Filtered from ${movieapi.results.length} to ${filteredMovies.length}` )
                 response.send(filteredMovies);

               }
               else{
                console.log("Error")
               }
             }
            
           })
       
