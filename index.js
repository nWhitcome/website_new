var express = require('express');
var app = express();
var server = require('http').Server(app);
var port = 3000;

server.listen(port, "127.0.0.1", function () {
});

/*
	Initializes express.
*/
app.use(express.static(__dirname));

/*
	Draws the index.html file as soon as the page loads.
*/
app.get('/', function(request, response){
	response.sendFile(__dirname + '/index.html')
});

