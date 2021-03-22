const express =require('express')
const request=require('request')
const breaker=require('express-circuit-breaker')
const MOVIE_API="https://api.themoviedb.org/3/movie/now_playing?api_key=b7a195f9d259535f183aa711ffb7b91c&language=en-US&page=1";
const app=express()
//URL to get The Movie List
let options1={
    url:MOVIE_API,
    strictSSL:false,
     rejectUnauthorized: false,//add when working with https sites
     requestCert: false,//add when working with https sites
     agent: false,
    secureProtocol:'TLSv1_method'
}

//Circuit breaker
var CB = breaker({
  catchError: e => 'trip',
  handleBlockedRequest: (req, res) => res.sendStatus(500)
})
//Asynchronous Get Request to Fetch movie data
app.get('/',CB, async (req,res)=>{       
        await request.get(options1,(err,response,body)=>{
            if(err)
            console.log(err);
            else{
              let popularityRating=req.headers['popularity'];
              let content= null ||JSON.parse(body);
            }
        })      
}
)

const PORT= process.env.PORT||3000;

app.listen(PORT,console.log(`Server is running at port ${PORT}`));




