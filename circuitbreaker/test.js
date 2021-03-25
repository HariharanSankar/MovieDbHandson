const CircuitBreaker = require('./CircuitBreaker.js')
const api = require('../constants')
const axios = require('axios')
const https=require('https')
const agent = new https.Agent({
  rejectUnauthorized: false,//add when working with https sites
});

const axios1=axios.get(api.MOVIE_API,{ httpsAgent: agent });
const axios2=axios.get(api.GENRE_API,{ httpsAgent: agent });

  const fetchMovie =  () => {
    return Promise.all([axios1,axios2]);      
}
const breaker = new CircuitBreaker(fetchMovie)
setInterval(() => {
    breaker.fire().then(console.log("Data Fetched")).catch(console.log("Failed"));
  }, 5000 )


  // const unstableRequest = () => {
  //   return new Promise((resolve, reject) => {
  //     if (5<6) {
  //       resolve({data: "Success"})
  //     } else {
  //       reject({data: "Failed"})
  //     }
  //   })
  // }
  // const breaker = new CircuitBreaker(unstableRequest)

  // setInterval(() => {
  //   breaker.fire().then(console.log).catch(console.error);
  // }, 1000 )