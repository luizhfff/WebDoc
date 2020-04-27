$(document).ready( () => {

    // function to load all doctor to be selected for appointment creation
    $.ajax({
        type: 'POST',
        url: 'http://' + document.domain + ':8010/getAllDoctorsNamesSorted',
        success: populateDoctors
    });
    
    function populateDoctors(dataRequested) {
        populateDoctorsTable(dataRequested);
        
        $('#physiciansTable').DataTable({
            "searching": true
        });
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

    
});