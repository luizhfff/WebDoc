/**
 * Filename: app.js
 * Author: Luiz Henrique Ferreira Facanha Filho
 * Student ID: 100320002
 * CPSC-2261 - Web Technology Course Project (WebDoc)
*/

const express = require('express');
const app = express();
const port = 8010;
const expressLayouts = require('express-ejs-layouts');

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

const fs = require("fs");
const bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
const db = require('./DB');
const googleapi = require("./js/googleapi");

// Using passport module
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(session({
  secret: 'hateCats', 
  resave: false, 
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());


passport.use(new LocalStrategy(
  
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

var server = app.listen(port, () => {
    console.log('server is listening on port', server.address().port);
});



// Root route for the WebApp
app.put('/', (request, response) =>{
  
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login' }));

// Route for creating new patient on DB
app.post('/submitNewPatient', (request, response) =>{
    console.log(`Patient: ${request.body.fname} ${request.body.lname} | Age: ${request.body.age} | Gender: ${request.body.gender} `);

    db.newPatient(request,response);
    //response.redirect(req.originalUrl);
		
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

  let startDateTime = `${request.body.appointmentDate}T${request.body.startTimeHour}:${request.body.startTimeMinute}:00`;
  let endDateTime = `${request.body.appointmentDate}T${request.body.endTimeHour}:${request.body.endTimeMinute}:00`;

  let event = {
      'summary': `Patient: ${request.body.patientID} | Doctor: ${request.body.doctorID} | Date: ${request.body.appointmentDate} | Start DateTime: ${startDateTime} | End DateTime: ${endDateTime} `,
      'location': 'Vancouver',
      'description': 'Medical Appointment',
      'start': {
        'dateTime': startDateTime,
        'timeZone': 'Canada/Pacific',
      },
      'end': {
        'dateTime': endDateTime,
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
    console.log(`startDateTime: ${startDateTime}`);
    console.log(`endDateTime: ${endDateTime}`);
  googleapi.createEvent(event, 'entkh4b3cordgtdslbclill8a8@group.calendar.google.com');
  
  //response.redirect(req.originalUrl);
        

});

// Creating exam appointment WebDoc Exam Calendar
app.post('/createExamAppointment', (request, response) =>{

  let startDateTime = `${request.body.appointmentDate}T${request.body.startTimeHour}:${request.body.startTimeMinute}:00`;
  let endDateTime = `${request.body.appointmentDate}T${request.body.endTimeHour}:${request.body.endTimeMinute}:00`;

    let event = {
        'summary': `Patient: ${request.body.patientID} | Doctor: ${request.body.doctorID} | Date: ${request.body.appointmentDate} | Start DateTime: ${startDateTime} | End DateTime: ${endDateTime} `,
        'location': 'Vancouver',
        'description': 'Exam Appointment',
        'start': {
          'dateTime': startDateTime,
          'timeZone': 'Canada/Pacific',
        },
        'end': {
          'dateTime': endDateTime,
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
      console.log(`startDateTime: ${startDateTime}`);
      console.log(`endDateTime: ${endDateTime}`);
    googleapi.createEvent(event, 'v30ich54n69vrq8t2h3lc5sfmk@group.calendar.google.com');
    
    //response.redirect(req.originalUrl);

});

// Route for deleting patient
app.delete('/deletePatient', (request, response) => {
  db.deletePatient(request, response);
  //response.redirect(req.originalUrl);
});
