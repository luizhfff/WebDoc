/**
 * Filename: app.js
 * Author: Luiz Henrique Ferreira Facanha Filho
 * Student ID: 100320002
 * CPSC-2261 - Web Technology Course Project (WebDoc)
 * 
 * -- Main server for serving the application
*/

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 8010;
const session = require('express-session');

// Using mongoose for creating user model and storing credentials on MongoDB
const mongoose = require('mongoose');

// Using Bcrypt
const bcrypt = require('bcryptjs');

// Express session
app.use(
  session({
    secret: 'mySecret',
    resave: true,
    saveUninitialized: true
  })
);

const fs = require("fs");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
const db = require('./DB');
const googleapi = require("./js/googleapi");

// Using passport module
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Adding necessaries middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Custom middleware setting global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});


// MongoDB configuration
const mongoDB = 'mongodb+srv://lhfff:Aspargos2020@@!!@cluster0-zmfge.mongodb.net/WebDoc?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose
  .connect(
    mongoDB,
    { useNewUrlParser: true }
  )
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views',__dirname);


// Creating User schema using mongoose
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.model('User', UserSchema);

passport.use(
  new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    // Match user
    User.findOne({
      email: email
    }).then(user => {
      if (!user) {
        return done(null, false, { message: `E-mail isn't registered` });
      }

      // Match password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Wrong password' });
        }
      });
    });
  })
);

// Using serialize user for storing userID in session
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

// Using deserialize user for finding user id in session
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

// SERVER listening on port 8010
var server = app.listen(port, () => {
    console.log('server is listening on port', server.address().port);
});


/*
######################################
------  Application Routes ---------
######################################
*/

// Root route for the WebApp
app.get('/', (req, res) => {
  res.render('login');
});

// Login Page
app.get('/login', (req, res) => {
  res.render('login');
});

// Register Page
app.get('/register', (req, res) => {
  res.render('register');
});


// Register POST
app.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => {
                req.flash(
                  'success_msg',
                  'You are now registered and can log in'
                );
                res.redirect('/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login POST with redirecting routes
app.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect('/login'); }
    req.logIn(user, (err) => {
      app.use(express.static(__dirname));
      if (err) { return next(err); }
      return res.redirect('/chart.html');
    });
  })(req,res,next);
});

// Logout
app.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/login');
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
    
});

// Route for deleting patient
app.delete('/deletePatient', (request, response) => {
  db.deletePatient(request, response);
});

// Route for getting appointments using google api
app.post('/getAppointments', (request, response) => {
  googleapi.listAppointments(request, response);
});

// Route for getting males
app.post('/getMale', (request, response) => {
  db.getMalePatients(request, response);
});

// Route for getting females
app.post('/getFemale', (request, response) => {
  db.getFemalePatients(request, response);
});
