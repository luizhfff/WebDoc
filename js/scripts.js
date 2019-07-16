/**
 * Filename: scripts.js
 * Author: Luiz Henrique Ferreira Facanha Filho
 * Student ID: 100320002
 * CPSC-2261 - Web Technology Course Project (WebDoc)
*/

// jQuery global function
$(document).ready( () => {

    $('#appointmentDate').datepicker({
        format: "dd/mm/yyyy"
    });
    
    $('#appointmentTimeB').datetimepicker({
        format: 'LT'
    });

    $('#appointmentTimeE').datetimepicker({
        format: 'LT'
    });
    
    // function to load all patients to be selected for appointment creation
    $.ajax({
        type: 'POST',
        url: 'http://' + document.domain + ':8010/getAllPatientsNamesSorted',
        success: populateSelection
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
            },
            success: display
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

    x

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

    function populateSelection(dataRequested) {
        let data = JSON.parse(dataRequested);

        $.each(data, (key, row) => {
            $("#selectPatient").append(`<option value='${row.ID}'> ${row.Fname} ${row.Lname}</option>`);
        });

    }

    

});
