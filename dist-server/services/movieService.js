"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _constants = _interopRequireDefault(require("../constants"));

var _axios = _interopRequireDefault(require("axios"));

var _https = _interopRequireDefault(require("https"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var agent = new _https["default"].Agent({
  rejectUnauthorized: false //add when working with https sites

});

var getMovieApi = function getMovieApi() {
  try {
    //let popularity = req.headers.popularity
    var resp = _axios["default"].get(_constants["default"].MOVIE_API, {
      httpsAgent: agent
    });

    return resp;
  } catch (err) {
    console.error(err);
  }
};

var _default = getMovieApi();

exports["default"] = _default;