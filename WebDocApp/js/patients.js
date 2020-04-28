$(document).ready( () => {
    // function to load all patients to be selected for appointment creation
    $.ajax({
        type: 'POST',
        url: 'https://' + document.domain + '/getAllPatientsNamesSorted',
        success: populatePatients
    });

    // On click function add new patient
    $("#submitNewPatient").click(() => { 
        if ($('#fname').val() == "" || $('#lname').val() == "" || $('#age').val() < 0 || $('#gender').val() == "" ) {
            $("#patientAddModalAlertInside").remove();
            $("#patientAddModalAlert").append('<div class="alert alert-danger" role="alert" id="patientAddModalAlertInside"> Patient could not be inserted! Please fill all the fields! </div>');
        }
        else {

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
            location.reload(true);

            $("#patientAlertInside").remove();
            $("#patientAlert").append('<div class="alert alert-success" role="alert" id="patientAlertInside"> Patient could not be inserted! Please fill all the fields! </div>');
        }
    });

    // On click function delete patient
    $("#deletePatient").click(() => { 
        if ( !$('#deleteID').val()) {
            $("#patientDeleteModalAlertInside").remove();
            $("#patientDeleteModalAlert").append('<div class="alert alert-danger" role="alert" id="patientDeleteModalAlertInside"> Please provide patient ID! </div>');
        } else {

            $.ajax({
                type: 'DELETE',
                url: 'https://' + document.domain + '/deletePatient',
                data: {
                    patientID: $('#deleteID').val(),
                },
                success: populatePatients
            });
            $("#deletePatientModal").modal("toggle");
            location.reload(true);

            $("#patientAlertInside").remove();
            $("#patientAlert").append('<div class="alert alert—check" role="alert" id="patientAlertInside"> Patient removed! </div>');
        }
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

    function populatePatients(dataRequested) {
        populatePatientsTable(dataRequested);

        $('#patientsTable').DataTable({
            "searching": true
        });
    }
});