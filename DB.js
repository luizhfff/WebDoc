/**
 * Filename: DB.js
 * Author: Luiz Henrique Ferreira Facanha Filho
 * Student ID: 100320002
 * CPSC-2261 - Web Technology Course Project (WebDoc)
*/

// Importing mysql node module
const mysql = require('mysql');

// Creating DB connection
var connection = mysql.createConnection({
    host: gfsolucoesti.com.br,
    user: gfsol916_doc_db,
    password: doc_db_2019,
    database: gfsol916_doc_db,
    port: 3306
});
connection.connect();

// Method to request data from DB
function requestData(request, response) {
    connection.query('SELECT * FROM Patients', (err, rows) => {
        if (!err) {
            response.send(JSON.stringify(rows));
        }
        else {
            console.log(err);
        }
    });
    connection.end();
}

// Method to register a new patient on DB
function requestData(request, response) {
    let values = {};
    
    
    connection.query('INSERT INTO Patients (Fname, Lname, Gender, Age) VALUES ( ? )', (err, rows) => {
        if (!err) {
            response.send(JSON.stringify(rows));
        }
        else {
            console.log(err);
        }
    });
    connection.end();
}

// Exporting modules to be used by the Application
exports.requestData = requestData;

