$(document).ready( () => {
    
    $.ajax({
        type: 'POST',
        url: 'http://' + document.domain + ':8010/getAllPatientsNamesSorted',
        success: populateSelectionPatients
    });

    // function to load all doctor to be selected for appointment creation
    $.ajax({
        type: 'POST',
        url: 'http://' + document.domain + ':8010/getAllDoctorsNamesSorted',
        success: populateSelectionDoctors
    });
    
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

    function populateSelectionPatients(dataRequested) {
        let data = JSON.parse(dataRequested);

        $.each(data, (key, row) => {
            $("#appointmentPatient").append(`<option value='${row.Fname} ${row.Lname}'> ${row.Fname} ${row.Lname}</option>`);
            
        });

    }

    function populateSelectionDoctors(dataRequested) {
        let data = JSON.parse(dataRequested);

        $.each(data, (key, row) => {
            $("#appointmentDoctor").append(`<option value='${row.Fname} ${row.Lname}'> ${row.Fname} ${row.Lname} | ${row.Speciality}</option>`);
            
        });

    }
});