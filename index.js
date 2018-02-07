var http = require("http");
var express = require("express");
var request = require("request");
var port = process.env.PORT || 5000;

var app = express();

//yahoo public weather api
var weatherURLPart1 = 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22';
var weatherURLPart2 = '%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';

app.use(express.static(__dirname + "/public/"));

app.get('/getWeather', function(req, res, next) {
    console.log('===server :: GET :: /getWeather');

    var query = req.query;
    var city = query.city || '';
    var urlWithQuery = weatherURLPart1 + city + weatherURLPart2;

    request(urlWithQuery, function(err, resp, body){
        if (err) {
            throw err;
        } else {
            var info = JSON.parse(body);
            res.send(info);
        }
    });
});

app.listen(80); //port 80 need to run as root

console.log("app listening on %d ", 80);

var server = http.createServer(app);
server.listen(port);

console.log("http server listening on %d", port);