var express = require('express');
var app = express();

//Request
//Reponse
app.get('/', function (req, res) {
  res.sendfile(__dirname + '/index.html');
});

app.use(express.static(__dirname));

app.get('/Galaga-GET', function(req, res){
	res.json({url: "https://www.youtube.com/embed/MyIPBufxl30"});
});

app.get('/Frogger-GET', function(req, res){
	res.json({url: "https://www.youtube.com/embed/WNrz9_Fe-Us"});
});

app.get('/Pac-Man-GET', function(req, res){
	res.json({url: "https://www.youtube.com/embed/dScq4P5gn4A"});
});

app.get('/DonkeyKong-GET', function(req, res){
	res.json({url: "https://www.youtube.com/embed/Pp2aMs38ERY"});
});

app.get('/ExciteBike-GET', function(req, res){
	res.json({url: "https://www.youtube.com/embed/ajb4AeyzDGI"});
});



app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});