var express = require('express');
var app = express();
const fs = require('fs');
var port = process.env.PORT || 3000;
var server = require('http').createServer(app);

app.use(express.static(__dirname));
app.get('/', function(request, response) {
    response.sendFile(__dirname + '/src/index.html');
});

server.listen(port);
console.log("listening on port " + port);

/*server.listen(port, "127.0.0.1", function () {
});
*/
