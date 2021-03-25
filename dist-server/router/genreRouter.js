"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _genreService = _interopRequireDefault(require("../services/genreService"));

var _movieService = _interopRequireDefault(require("../services/movieService"));

var _expressCircuitBreaker = _interopRequireDefault(require("express-circuit-breaker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //Circuit breaker


var CB = (0, _expressCircuitBreaker["default"])({
  catchError: function catchError(e) {
    return 'trip';
  },
  handleBlockedRequest: function handleBlockedRequest(req, res) {
    return res.sendStatus(500);
  }
}); //Get Request to Fetch movie data

router.get('/', CB, function (req, res) {
  var genreId = [];
  var movies = [];
  var genreList = [];
  var filteredMovies = [];
  var genres = req.headers.genres;

  _genreService["default"].then(function (data) {
    data.genres.forEach(function (element) {
      if (genres.includes(element.name)) {
        genreId.push(element.id);
      }
    });

    _movieService["default"].then(function (ms) {
      ms.results.filter(function (movie) {
        movies.push(movie);
      });
      movies.filter(function (movie) {
        genreId.forEach(function (id) {
          if (movie.genre_ids.includes(id)) {
            filteredMovies.push(movie);
          }
        });
      });
      console.log("Movies filtered from ".concat(movies.length, " to ").concat(filteredMovies.length));
      res.send(filteredMovies);
    });
  });
});
var _default = router;
exports["default"] = _default;