#  WebDoc
    Web application for physicians


### HIGHLIGHTS AND INSTRUCTIONS
    
    First step = register an user for using application;
    Using mainly nodejs modules: express, mysql, mongoose, passport and more;
    Authentication implemented using module passport and local strategy;
    User only can access pages after login;
    Using googleapi for creating events, and can be used later all google functionalities;
    Inside google calendar were created two calendars, WebDoc - Appointments and WebDoc - Exams;
    Unfortunately didnt have time to implement fusion chart totally. But the idea was showing number of males and females patients as well as number of appointments and exams;
    
    
    INDEX
        * Redirected to the login page or register page
    
    PATIENTS
         * Register new patient on DB;
         * Search for patient using datatables;
         * Remove existing patient on DB using ID;
    
    PHYSICIANS
         * Show Physician list;
         * search using datatables
    
    APPOINTMENTS
         * Register new appointment using google api { Patient, Doctor, Appointment Date, Appointment Time};
         * Show appointments calendar {google api integration embedded};
    
    EXAMS
         * Register new exam using google api { Patient, Doctor, Appointment Date, Appointment Time};
         * Show exams calendar {google api integration embedded};
