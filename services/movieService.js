const api = require('../constants')
const axios= require('axios')
const https=require('https');
const { request } = require('http');
const agent = new https.Agent({
  rejectUnauthorized: false,//add when working with https sites
});
    const getMovieApi = async () => {
      try {
        //let popularity = req.headers.popularity
        const resp = await axios.get(api.MOVIE_API,{ httpsAgent: agent })
            .then(function (response) {
              return response.data;
            });
          return resp;
    } catch (err) {
          console.error(err);
      }
    };
    
    module.exports = getMovieApi();

