"use strict";
exports.__esModule = true;
var app_1 = require("./app");
var http = require("http");
var fs = require("fs");
require('dotenv').config();
var PORT = process.env.PORT || 3000;
var httpsOptions = {
    key: fs.readFileSync('config/key.pem'),
    cert: fs.readFileSync('config/cert.pem')
};
http.createServer(app_1["default"]).listen(PORT, function () {
    console.log('Express server listening on port ' + PORT);
});
