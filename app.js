/**
 * Filename: app.js
 * Author: Luiz Henrique Ferreira Facanha Filho
 * Student ID: 100320002
 * CPSC-2261 - Web Technology Course Project (WebDoc)
*/

var fs = require("fs");
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var port = 8010;
var db = require('./DB');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));

var server = app.listen(port, () => {
    console.log('server is listening on port', server.address().port);
});

// Root route for the WebApp
app.put('/', (request, response) =>{
	
});

// Route for creating new patient on DB
app.post('/submitNewPatient', (request, response) =>{
    console.log(`Patient: ${request.body.fname} ${request.body.lname} | Age: ${request.body.age} | Gender: ${request.body.gender} `);

    db.newPatient(request,response);
		
});
