FusionCharts.ready(function() {
  new FusionCharts({
    type: "realtimecolumn",
    id: "salesticker",
    renderAt: "chart-container",
    width: "800",
    height: "600",
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Appointments Per Physician",
        subCaption: "WebDoc",
        showrealtimevalue: "0",
        numdisplaysets: "10",
        theme: "umber",
        labeldisplay: "rotate",
        showValues: "1",
        placeValuesInside: "0",
        plotToolText: "<b>$label</b><br>Appointments: <b>$dataValue</b>"
      },
      categories: [
        {
          category: [
            {
              label: "Start"
            }
          ]
        }
      ],
      dataset: [
        {
          seriesname: "",
          alpha: "100",
          data: [
            {
              value: "12"
            }
          ]
        }
      ]
    },
    events: {
      initialized: function(evt, arg) {
        var chartRef = evt.sender;
        //Format minutes, seconds by adding 0 prefix accordingly
        function formatTime(time) {
          time < 10 ? (time = "0" + time) : (time = time);
          return time;
        }
        //Update Data method
        function updateData() {
          //We need to create a querystring format incremental update, containing
          //label in hh:mm:ss format and a value (random).
          var currDate = new Date(),
            label =
              formatTime(currDate.getHours()) +
              ":" +
              formatTime(currDate.getMinutes()) +
              ":" +
              formatTime(currDate.getSeconds()),
            //Get random number between 1 & 5 - rounded
            transactions = Math.round(Math.random() * 19) + 1,
            strData = "&label=" + label + "&value=" + transactions;

          //Feed it to chart.
          chartRef.feedData(strData);
        }

        chartRef.intervalUpdateId = setInterval(updateData, 1000);
      },

      disposed: function(evt, args) {
        clearInterval(evt.sender.intervalUpdateId);
      }
    }
  }).render();
});
