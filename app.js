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
var googleapi = require("./js/googleapi");

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

// Route for get all existent patient on DB
app.post('/getAllPatientsNamesSorted', (request, response) =>{

    db.getAllPatientsNamesSorted(request,response);
		
});

// Route for get all existent doctors on DB
app.post('/getAllDoctorsNamesSorted', (request, response) =>{

    db.getAllDoctorsNamesSorted(request,response);
		
});

// 
app.post('/searchByID', (request, response) =>{

    db.searchByID(request,response);
		
});

// Creating appointment WebDoc Appointments Calendar
app.post('/createSimpleAppointment', (request, response) =>{

    let event = {
        'summary': request.body.doctorID + " | " + request.body.appointmentDate + " | " + request.body.startTimeHour + " | " + request.body.startTimeMinute + " | " + request.body.endTimeHour + " | " + request.body.endTimeMinute,
        'location': 'Vancouver',
        'description': 'Medical Appointment',
        'start': {
          'date': request.body.appointmentDate,
          'timeZone': 'Canada/Pacific',
        },
        'end': {
          'date': request.body.appointmentDate,
          'timeZone': 'Canada/Pacific',
        },
        'reminders': {
          'useDefault': false,
          'overrides': [
            {'method': 'email', 'minutes': 24 * 60},
            {'method': 'popup', 'minutes': 10},
          ],
        },
      };

    googleapi.createEvent(event, 'entkh4b3cordgtdslbclill8a8@group.calendar.google.com');
        

});
