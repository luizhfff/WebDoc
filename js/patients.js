$(document).ready( () => {
    // function to load all patients to be selected for appointment creation
    $.ajax({
        type: 'POST',
        url: 'http://' + document.domain + ':8010/getAllPatientsNamesSorted',
        success: populatePatients
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
            success: populatePatients
        });
        $("#regNewPatientModal").modal("toggle");
    });

    // On click function delete patient
    $("#deletePatient").click(() => { 
        
        $.ajax({
            type: 'DELETE',
            url: 'http://' + document.domain + ':8010/deletePatient',
            data: {
                patientID: $('#deleteID').val(),
            },
            success: populatePatients
        });
        $("#deletePatientModal").modal("toggle");
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