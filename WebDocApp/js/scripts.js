/**
 * Filename: scripts.js
 * Author: Luiz Henrique Ferreira Facanha Filho
 * Student ID: 100320002
 * CPSC-2261 - Web Technology Course Project (WebDoc)
*/


// jQuery global function
$(document).ready( () => {
    
    // function to load all patients to be selected for appointment creation
    $.ajax({
        type: 'POST',
        url: 'https://' + document.domain + '/getAllPatientsNamesSorted',
        success: populatePatients
    });

    // function to load all doctor to be selected for appointment creation
    $.ajax({
        type: 'POST',
        url: 'https://' + document.domain + '/getAllDoctorsNamesSorted',
        success: populateDoctors
    });
    

    // On click function add new patient
    $("#submitNewPatient").click(() => { 
        
        $.ajax({
            type: 'POST',
            url: 'https://' + document.domain + '/submitNewPatient',
            data: {
                fname: $('#fname').val(),
                lname: $('#lname').val(),
                age: $('#age').val(),
                gender: $('#gender').val(),
            },
            success: populatePatients
        });
        $("#regNewPatientModal").modal("toggle");
    });

    // On click function search patient
    $("#searchPatient").click(() => { 
        
        $.ajax({
            type: 'POST',
            url: 'https://' + document.domain + '/searchPatient',
            data: {
                fname: $('#fnameSearch').val(),
                lname: $('#lnameSearch').val(),
                minAge: $('#ageSearchMin').val(),
                maxAge: $('#ageSearchMax').val(),
                gender: $('#genderSearch').val(),
            },
            success: display
        });
        $("#searchPatientModal").modal("toggle");
    });

    // On click function delete patient
    $("#deletePatient").click(() => { 
        
        $.ajax({
            type: 'DELETE',
            url: 'https://' + document.domain + '/deletePatient',
            data: {
                patientID: $('#deleteID').val(),
            },
            success: populatePatients
        });
        $("#deletePatientModal").modal("toggle");
    });

    //Creating new event using google api
    $("#createAppointment").click(() => {

        $.ajax({
            type: 'POST',
            url: 'https://' + document.domain + '/createSimpleAppointment',
            data: {
                patientID: $('#appointmentPatient').val(),
                doctorID: $('#appointmentDoctor').val(),
                appointmentDate: $('#appointmentDate').val(),
                startTimeHour: $('#appointmentTimeStartHour').val(),
                startTimeMinute: $('#appointmentTimeStartMinute').val(),
                endTimeHour: $('#appointmentTimeEndHour').val(),
                endTimeMinute: $('#appointmentTimeEndMinute').val()
            }
        });
    });

    //Creating new exam appointment using google api
    $("#createExamAppointment").click(() => {

        $.ajax({
            type: 'POST',
            url: 'https://' + document.domain + '/createExamAppointment',
            data: {
                patientID: $('#appointmentExamPatient').val(),
                doctorID: $('#appointmentExamDoctor').val(),
                appointmentDate: $('#appointmentExamDate').val(),
                startTimeHour: $('#appointmentExamTimeStartHour').val(),
                startTimeMinute: $('#appointmentExamTimeStartMinute').val(),
                endTimeHour: $('#appointmentExamTimeEndHour').val(),
                endTimeMinute: $('#appointmentExamTimeEndMinute').val()
            }
        });
    });

    function display(dataRequested) {
                
        let data = JSON.parse(dataRequested);
                    
        let header_set = false;
        let h = "";
        let v = "";    

        $.each(data, (key, theRow) => {
            console.log(key + " , " + theRow); 
                       
            v += "<tr>" ;
            $.each(theRow, (theKeyInTheRow, theValueInTheRow) => {
                if (!header_set)
                    h += "<th>" + theKeyInTheRow + "</th>";
                v += "<td>" + theValueInTheRow + "</td>";
            });
                       
            if (!header_set) {
                h = "<tr>" + h + "</tr>";
                header_set = true;
            }
            v += "</tr>" ;
                   
        });
                    
        
        // displaying the data
        $("#patientsTable thead > tr").remove();
        $("#patientsTable thead").append(h);
        $("#patientsTable tbody > tr").remove();
        $("#patientsTable tbody").append(v);
                    
    }

    function populateSelectionPatients(dataRequested) {
        let data = JSON.parse(dataRequested);

        $.each(data, (key, row) => {
            $("#appointmentPatient").append(`<option value='${row.Fname} ${row.Lname}'> ${row.Fname} ${row.Lname}</option>`);
            $("#appointmentExamPatient").append(`<option value='${row.Fname} ${row.Lname}'> ${row.Fname} ${row.Lname}</option>`);
        });

    }

    function populateSelectionDoctors(dataRequested) {
        let data = JSON.parse(dataRequested);

        $.each(data, (key, row) => {
            $("#appointmentDoctor").append(`<option value='${row.Fname} ${row.Lname}'> ${row.Fname} ${row.Lname} | ${row.Speciality}</option>`);
            $("#appointmentExamDoctor").append(`<option value='${row.Fname} ${row.Lname}'> ${row.Fname} ${row.Lname} | ${row.Speciality}</option>`);
        });

    }

    function createAppointment(dataRequested) {
        let data = JSON.parse(dataRequested);

        let patientID = data.ID;
        let firstName = data.Fname;
        let lastName = data.Lname;
        let gender = data.Gender;
        let age = data.Age;
        let appointmentDate = $("#appointmentDate").val();
        let doctor = $("#selectDoctor").val();
        


        var event = {
            'summary': patientID + " | " + firstName + " | " + lastName + " | " + gender + " | " + age,
            'location': '',
            'description': 'Medical Appointment',
            'start': {
              'date': appointmentDate,
              'timeZone': 'Canada/Pacific',
            },
            'end': {
              'date': appointmentDate,
              'timeZone': 'Canada/Pacific',
            },
            'attendees': [
              {'email': 'lpage@example.com'}
            ],
            'reminders': {
              'useDefault': false,
              'overrides': [
                {'method': 'email', 'minutes': 24 * 60},
                {'method': 'popup', 'minutes': 10},
              ],
            },
          };
    }
    
    // $('#appointmentDate').datepicker({
    //     format: "YYYY-MM-DD"
    // });

    function populatePatientsTable(dataRequested) {
        let data = JSON.parse(dataRequested);

        let header_set = false;
        let h = "";
        let v = "";    

        $.each(data, (key, theRow) => {
            console.log(key + " , " + theRow); 
                       
            v += "<tr>" ;
            $.each(theRow, (theKeyInTheRow, theValueInTheRow) => {
                if (!header_set)
                    h += "<th>" + theKeyInTheRow + "</th>";
                v += "<td>" + theValueInTheRow + "</td>";
            });
                       
            if (!header_set) {
                h = "<tr>" + h + "</tr>";
                header_set = true;
            }
            v += "</tr>" ;
                   
        });
                    
        
        // displaying the data
        $("#patientsTable thead > tr").remove();
        $("#patientsTable thead").append(h);
        $("#patientsTable tbody > tr").remove();
        $("#patientsTable tbody").append(v);
    }

    function populateDoctorsTable(dataRequested) {
        let data = JSON.parse(dataRequested);

        let header_set = false;
        let h = "";
        let v = "";    

        $.each(data, (key, theRow) => {
            console.log(key + " , " + theRow); 
                       
            v += "<tr>" ;
            $.each(theRow, (theKeyInTheRow, theValueInTheRow) => {
                if (!header_set)
                    h += "<th>" + theKeyInTheRow + "</th>";
                v += "<td>" + theValueInTheRow + "</td>";
            });
                       
            if (!header_set) {
                h = "<tr>" + h + "</tr>";
                header_set = true;
            }
            v += "</tr>" ;
                   
        });
                    
        
        // displaying the data
        $("#physiciansTable thead > tr").remove();
        $("#physiciansTable thead").append(h);
        $("#physiciansTable tbody > tr").remove();
        $("#physiciansTable tbody").append(v);
    }

    function populateDoctors(dataRequested) {
        populateSelectionDoctors(dataRequested);
        populateDoctorsTable(dataRequested);
        
        $('#physiciansTable').DataTable({
            "searching": true
        });
    }

    function populatePatients(dataRequested) {
        populatePatientsTable(dataRequested);
        populateSelectionPatients(dataRequested);

        $('#patientsTable').DataTable({
            "searching": true
        });
    }

});
