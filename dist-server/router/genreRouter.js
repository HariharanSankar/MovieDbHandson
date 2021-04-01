"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireWildcard(require("express"));

var _genreService = _interopRequireDefault(require("../services/genreService"));

var _movieService = _interopRequireDefault(require("../services/movieService"));

var _Circuitbreaker = _interopRequireDefault(require("../circuitbreaker/Circuitbreaker"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var router = _express["default"].Router(); //Circuit breaker


var breaker = new _Circuitbreaker["default"](_genreService["default"]); //Get Request to Fetch movie data

router.get('/', function (req, res) {
  var genreId = [];
  var movies = [];
  var genreList = [];
  var filteredMovies = [];
  var genresHeader = req.headers.genres;
  breaker.fire().then(function (response) {
    var genres = response.data;
    genres.forEach(function (element) {
      if (genresHeader.includes(element.name)) {
        genreId.push(element.id);
        console.log(element.id);
      }
    });

    _movieService["default"].then(function (ms) {
      ms.data.results.filter(function (movie) {
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