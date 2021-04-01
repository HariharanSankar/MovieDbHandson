"use strict";

var _express = _interopRequireDefault(require("express"));

var _popularityRouter = _interopRequireDefault(require("./router/popularityRouter"));

var _genreRouter = _interopRequireDefault(require("./router/genreRouter"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _swagger = _interopRequireDefault(require("../swagger/swagger.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])(); // Swagger docs

app.use("/api-docs", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(_swagger["default"])); //Routers

app.use('/popularity', _popularityRouter["default"]);
app.use('/genre', _genreRouter["default"]);
var PORT = process.env.PORT || 3000;
app.listen(PORT, console.log("Server is running at port ".concat(PORT)));