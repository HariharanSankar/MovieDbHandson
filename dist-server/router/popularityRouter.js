"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _Circuitbreaker = _interopRequireDefault(require("../../circuitbreaker/Circuitbreaker"));

var _movieService = _interopRequireDefault(require("../services/movieService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var router = _express["default"].Router(); //Circuit breaker
//Get Request to Fetch movie data


router.get('/', function (req, res) {
  _movieService["default"].then(function (data) {
    var popularity = req.headers.popularity;
    var rating = data.results.filter(function (results) {
      return results.popularity > popularity;
    });
    res.send(rating.sort());
  })["catch"](function (err) {
    return res.sendStatus(500);
  });
});
var _default = router;
exports["default"] = _default;