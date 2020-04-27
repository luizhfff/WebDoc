/**
 * Filename: DB.js
 * Author: Luiz Henrique Ferreira Facanha Filho
 * Student ID: 100320002
 * CPSC-2261 - Web Technology Course Project (WebDoc)
*/

// Importing mysql node module
const mysql = require('mysql');

// Creating DB connection
const pool = mysql.createPool({
    connectionLimit : 100,
    host: 'gfsolucoesti.com.br',
    user: 'gfsol916_doc_db',
    password: 'doc_db_2019',
    database: 'gfsol916_doc_db',
    port: 3306
});
//connection.connect();

// Method to request data from DB
function getAllPatientsNamesSorted(request, response) {
    pool.query('SELECT ID, Fname, Lname, Gender, Age FROM Patients ORDER BY Fname, Lname ASC', (error, results) => {
        if (error) throw error;
        //console.log(JSON.stringify(results));
        response.send(JSON.stringify(results));
    });
    //connection.end();
}

//Get male
function getMalePatients(request, response) {
    pool.query(`SELECT * FROM Patients WHERE Gender='M'`, (error, results) => {
        if (error) throw error;
        //console.log(JSON.stringify(results));
        response.send(JSON.stringify(results));
    });
    //connection.end();
}

// Get female
function getFemalePatients(request, response) {
    pool.query(`SELECT * FROM Patients WHERE Gender='F'`, (error, results) => {
        if (error) throw error;
        //console.log(JSON.stringify(results));
        response.send(JSON.stringify(results));
    });
    //connection.end();
}

// Method to request data from DB
function getAllDoctorsNamesSorted(request, response) {
    pool.query('SELECT ID, Fname, Lname, Speciality FROM Physicians ORDER BY Fname, Lname, Speciality ASC', (error, results) => {
        if (error) throw error;
        //console.log(JSON.stringify(results));
        response.send(JSON.stringify(results));
    });
    //connection.end();
}

// Method to register a new patient on DB
function newPatient(request, response) {
    
    let values = [];
    let data = [];
    values.push(request.body.fname);
    values.push(request.body.lname);
    values.push(request.body.gender);
    values.push(request.body.age);
    data.push(values);

    let query = `INSERT INTO Patients (Fname, Lname, Gender, Age) VALUES  ? `;
    console.log(`Query: ${query}`);

    pool.query(query, [data], (error, results) => {
        if (error) throw error;
        //console.log(results);
        console.log('Row inserted:' + results.affectedRows);
        response.send(JSON.stringify(results));
    });
    //connection.end();
}

function searchByID(request, response) {

    let patientID = request.body.patientID;
    let query = `SELECT * from Patients WHERE ID=?`;

    pool.query(query, patientID, (error, results) => {
        if (error) throw error;
        //console.log(results);
        console.log('Row inserted:' + results.affectedRows);
        response.send(JSON.stringify(results));
    });

}

function deletePatient(request, response) {
    let patientID = request.body.patientID;
    let query = `DELETE FROM Patients WHERE ID=? `;

    pool.query(query, patientID, (error, results) => {
        if (error) throw error;
        //console.log(results);
        console.log('Row deleted:' + results.affectedRows);
        response.send(JSON.stringify(results));
    });
    //connection.end();
}

// Exporting modules to be used by the Application
exports.getAllPatientsNamesSorted = getAllPatientsNamesSorted;
exports.newPatient = newPatient;
exports.searchByID = searchByID;
exports.getAllDoctorsNamesSorted = getAllDoctorsNamesSorted;
exports.deletePatient = deletePatient;
exports.getMalePatients = getMalePatients;
exports.getFemalePatients = getFemalePatients;

