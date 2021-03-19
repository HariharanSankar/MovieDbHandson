const express =require('express')
const request=require('request')
const MOVIE_API="https://api.themoviedb.org/3/movie/now_playing?api_key=b7a195f9d259535f183aa711ffb7b91c&language=en-US&page=1";
const GENREAPI="https://api.themoviedb.org/3/genre/movie/list?api_key=b7a195f9d259535f183aa711ffb7b91c&language&language=en-US";
const app=express()


let options1={
    url:MOVIE_API,
    strictSSL:false,
     rejectUnauthorized: false,//add when working with https sites
     requestCert: false,//add when working with https sites
     agent: false,
    secureProtocol:'TLSv1_method'
}

let options2={
    url:GENREAPI,
    strictSSL:false,
     rejectUnauthorized: false,//add when working with https sites
     requestCert: false,//add when working with https sites
     agent: false,
    secureProtocol:'TLSv1_method'

}
app.get('/', async (req,res)=>{       
        await request.get(options1,(err,response,body)=>{
            if(err)
            console.log(err);
            else{
              let popularityRating=req.headers['popularity'];
              let content= 0||JSON.parse(body);
              if(content){
                  getMovieWithGenre(content);
               // getMoviesWithPopularity(content,popularityRating)
                  //res.send(content)
              }
              else{
                  res.send("Error with Fetching the data")
              }
            }
        })
        // const getMoviesWithPopularity=(data,popularityRating)=>{
        //     let results=data.results;         
        //     const rating=results.filter(results=>results.popularity>popularityRating)
        //   res.send(rating.sort())
        // }

       const getMovieWithGenre=(movielist)=>{
             request.get(options2,(err,response,body)=>{
                if(err)
                console.log(err);
                else{
                  let genreId=[];
                  let genreList= 0||JSON.parse(body).genres; 
                  let genres=req.headers['genre'];      
                    res.json({message:"Fetched Data"})
                  genreList.forEach(element => {
                      if(element.name===genres)
                      {
                          genreId.push(element.id);
                          console.log(genreId)
                        //  movielist.results.forEach(movies=>{
                        //      if(movies.genre_ids.includes(genreId)){
                        //          console.log(movies)
                        //      }
                        //  })
                      }
                  });
                }
            })
        }
}
)

const PORT= process.env.PORT||3000;

app.listen(PORT,console.log(`Server is running at port ${PORT}`));
