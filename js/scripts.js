/**
 * Filename: scripts.js
 * Author: Luiz Henrique Ferreira Facanha Filho
 * Student ID: 100320002
 * CPSC-2261 - Web Technology Course Project (WebDoc)
*/

// jQuery global function
$(document).ready( () => {
    
    // On click function
    $("#submitNewPatient").click(() => { 
        
        $.ajax({
            type: 'POST',
            url: 'http://' + document.domain + ':8010/submitNewPatient',
            data: {
                fname: $('#fname').val(),
                lname: $('#lname').val(),
                age: $('#age').val(),
                gender: $('#gender').val()
            }
        });
        console.log("onclick called!");
    });

});
