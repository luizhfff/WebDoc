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
        url: 'http://' + document.domain + ':8010/getAllPatientsNamesSorted',
        success: populatePatients
    });

    // function to load all doctor to be selected for appointment creation
    $.ajax({
        type: 'POST',
        url: 'http://' + document.domain + ':8010/getAllDoctorsNamesSorted',
        success: populateDoctors
    });

    // Utilizing dataTables plugin
    $('#physiciansTable').DataTable({
        "searching": true,
        "search": {
            "smart": true
          }
    });
    $('#patientsTable').DataTable({
        "searching": true,
        "search": {
            "smart": true
          }
    });
    
    // On click function add new patient
    $("#submitNewPatient").click(() => { 
        
        $.ajax({
            type: 'POST',
            url: 'http://' + document.domain + ':8010/submitNewPatient',
            data: {
                fname: $('#fname').val(),
                lname: $('#lname').val(),
                age: $('#age').val(),
                gender: $('#gender').val(),
            }
        });
        $("#regNewPatientModal").modal("toggle");
    });

    // On click function search patient
    $("#searchPatient").click(() => { 
        
        $.ajax({
            type: 'POST',
            url: 'http://' + document.domain + ':8010/searchPatient',
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

    // Get full patient data for creating appointment on google calendar (UNFINISHED)
    // $("#createAppointment").click(() => {

    //     $.ajax({
    //         type: 'POST',
    //         url: 'http://' + document.domain + ':8010/searchByID',
    //         data: {
    //             patientID: $("#appointmentPatient").val()
    //         },
    //         success: createAppointment
    //     });
    // });

    //Creating new event using google api
    $("#createAppointment").click(() => {

        $.ajax({
            type: 'POST',
            url: 'http://' + document.domain + ':8010/createSimpleAppointment',
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
            $("#appointmentPatient").append(`<option value='${row.ID}'> ${row.Fname} ${row.Lname}</option>`);
        });

    }

    function populateSelectionDoctors(dataRequested) {
        let data = JSON.parse(dataRequested);

        $.each(data, (key, row) => {
            $("#appointmentDoctor").append(`<option value='${row.ID}'> ${row.Fname} ${row.Lname} | ${row.Speciality}</option>`);
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
    
    $('#appointmentDate').datepicker({
        format: "dd/mm/yyyy"
    });

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
    }

    function populatePatients(dataRequested) {
        populatePatientsTable(dataRequested);
        populateSelectionPatients(dataRequested);
    }

});
