$(document).ready( () => {
    
    $.ajax({
        type: 'POST',
        url: 'https://' + document.domain + '/getAllPatientsNamesSorted',
        success: populateSelectionPatients
    });

    // function to load all doctor to be selected for appointment creation
    $.ajax({
        type: 'POST',
        url: 'https://' + document.domain + '/getAllDoctorsNamesSorted',
        success: populateSelectionDoctors
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

    function populateSelectionPatients(dataRequested) {
        let data = JSON.parse(dataRequested);

        $.each(data, (key, row) => {
            
            $("#appointmentExamPatient").append(`<option value='${row.Fname} ${row.Lname}'> ${row.Fname} ${row.Lname}</option>`);
        });

    }

    function populateSelectionDoctors(dataRequested) {
        let data = JSON.parse(dataRequested);

        $.each(data, (key, row) => {
            
            $("#appointmentExamDoctor").append(`<option value='${row.Fname} ${row.Lname}'> ${row.Fname} ${row.Lname} | ${row.Speciality}</option>`);
        });

    }
});