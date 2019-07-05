// Node Server

var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8010;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

var server = app.listen(port, () => {
    console.log('server is listening on port', server.address().port);
});

// Root route for the WebApp
app.put('/', (request, response) =>{
	
});

// POST routes
// app.post('', (request, response) =>{
    
		
// });
