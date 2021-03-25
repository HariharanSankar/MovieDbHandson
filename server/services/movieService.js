import api from '../constants'
import axios from 'axios'
import https from 'https'


const agent = new https.Agent({
  rejectUnauthorized: false,//add when working with https sites
});
    const getMovieApi =  () => {
      try {
        //let popularity = req.headers.popularity
        const resp =  axios.get(api.MOVIE_API,{ httpsAgent: agent })
            .then(function (response) {
              return response.data;
            });
          return resp;
    } catch (err) {
          console.error(err);
      }
    };
    
    export default getMovieApi();

