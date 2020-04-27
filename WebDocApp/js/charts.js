
$(document).ready(() => {
  
  $.ajax({
      type: 'POST',
      url: 'http://' + document.domain + ':8010/getMale',
      success: proccessMales
  });

  $.ajax({
    type: 'POST',
    url: 'http://' + document.domain + ':8010/getFemale',
    success: proccessFemales
  });

  

  function proccessMales(dataFromServer) {
    let data = JSON.parse(dataFromServer);


    $.each(data, (key, theRow) => {
      console.log(key + " , " + theRow); 
      
                 
             
    });
  }

  function proccessFemales(dataFromServer) {
    let data = JSON.parse(dataFromServer);


    $.each(data, (key, theRow) => {
      console.log(key + " , " + theRow); 
      
                 
             
    });
  }
  
  
  $("#appointmentsChart").insertFusionCharts({
        type: "column2d",
        width: "1200",
        height: "600",
        dataFormat: "json",
        dataSource: {
          chart: {
            caption: "Appointments Per Physician",
            subCaption: "WebDoc Medical Group Inc.",
            numdisplaysets: "25",
            theme: "fusion",
          },
          data: [
            {
              label: "Abeau",
              value: "2"
            },
            {
              label: "Avon",
              value: "3"
            },
            {
              label: "Lelievre",
              value: "4"
            },
            {
              label: "Garthside",
              value: "6"
            },
            {
              label: "Collet",
              value: "1"
            },
            {
              label: "Swannie",
              value: "0"
            },
            {
              label: "Franses",
              value: "4"
            },
            {
              label: "Herion",
              value: "7"
            },
            {
              label: "Clingoe",
              value: "3"
            },
            {
              label: "Hargess",
              value: "0"
            },
            {
              label: "Brigham",
              value: "3"
            },
            {
              label: "Stables",
              value: "4"
            },
            {
              label: "Crispin",
              value: "2"
            },
            {
              label: "Goodsir",
              value: "5"
            },
            {
              label: "Durrant",
              value: "5"
            },
            
          ]
      }
   });
});