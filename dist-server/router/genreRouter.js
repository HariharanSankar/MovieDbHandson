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

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var router = _express["default"].Router(); //Get Request to Fetch movie data


router.get('/', function (req, res) {
  try {
    new _Circuitbreaker["default"](Promise.all([_movieService["default"], _genreService["default"]])).fire().then(function (responses) {
      return Promise.all(responses.map(function (response) {
        return response.data;
      }));
    }).then(function (data) {
      var genreId = [];
      var filteredMovies = [];
      var genresHeader = req.headers['genre'].split(',');

      var _ref = _toConsumableArray(data),
          movieapi = _ref[0],
          genreapi = _ref[1];

      var movies = movieapi.results;
      var genres = genreapi.genres;
      genres.forEach(function (element) {
        if (genresHeader.includes(element.name)) {
          genreId.push(element.id);
        }
      });
      console.log(genreId); //filtering genre ids from whole movie list by filter method

      movies.filter(function (movie) {
        genreId.forEach(function (id) {
          if (movie.genre_ids.includes(id)) {
            filteredMovies.push(movie);
          }
        });
      });
      console.log("Movies filtered from ".concat(movies.length, " to ").concat(filteredMovies.length));
      res.send(filteredMovies);
    })["catch"](function (err) {
      return res.sendStatus(500).res.send(err);
    });
  } catch (err) {
    res.sendStatus(500).res.send(err);
  }
});
var _default = router;
exports["default"] = _default;