window.onload = function(){

  console.log("test3")
  
  document.getElementById("th_one").addEventListener("click", function() {sortTable(0);});
  document.getElementById("th_two").addEventListener("click", function() {sortTable(1);});
  document.getElementById("th_three").addEventListener("click", function() {sortTable(2);});
  document.getElementById("th_four").addEventListener("click", function() {sortTable(3);});

  function sortTable(n) { 
    var table, i, x, y; 
    table = document.getElementById("table1"); 
    var switching = true; 

    // Run loop until no switching is needed 
    while (switching) { 
        switching = false; 
        var rows = table.rows; 

        // Loop to go through all rows 
        for (i = 1; i < (rows.length - 2); i++) { 
            var Switch = false; 

            // Fetch 2 elements that need to be compared 
            x = rows[i].getElementsByTagName("TD")[n]; 
            y = rows[i + 1].getElementsByTagName("TD")[n]; 

            // Check if 2 rows need to be switched 
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) 
                { 

                // If yes, mark Switch as needed and break loop 
                Switch = true; 
                break; 
            } 
        } 
        if (Switch) { 
            // Function to switch rows and mark switch as completed 
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); 
            switching = true; 
        } 
    } 
  }

  
  resetButton = document.getElementById("reset");

  resetButton.addEventListener("click", resetForm);

  function resetForm(){
      var xhttpreset = new XMLHttpRequest();

      xhttpreset.open("GET", "https://wt.ops.labs.vu.nl/api20/14d61d4c/reset", true);
      xhttpreset.send();
  }

  // __________________________________________

}



//first add an event listener for page load
          document.addEventListener( "DOMContentLoaded", get_json_data, false ); // get_json_data is the function name that will fire on page load

          //this function is in the event listener and will execute on page load
          function get_json_data(){

              // Relative URL of external json file
              var json_url = "https://wt.ops.labs.vu.nl/api20/14d61d4c/";

              //Build the XMLHttpRequest (aka AJAX Request)
              xmlhttp = new XMLHttpRequest();
              xmlhttp.onreadystatechange = function() { 
                  console.log(this.readyState + " " + this.status);
                  if (this.readyState == 4 && this.status == 200) {//when a good response is given do this

                      var data = JSON.parse(this.responseText); // convert the response to a json object
                      append_json(data);// pass the json object to the append_json function
                  }
              }
              //set the request destination and type
              xmlhttp.open("GET", json_url, true);
              //set required headers for the request
              xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
              // send the request
              xmlhttp.send(); // when the request completes it will execute the code in onreadystatechange section
          }

          //this function appends the json data to the table 'gable'
          function append_json(data){
              var table = document.getElementById("table1");
              console.log(JSON.stringify(data));
              data.forEach(function(object) {
                  var tr = document.createElement('tr');
                  tr.innerHTML = '<td>' + object.brand + '</td>' +
                  '<td>' + object.model + '</td>' +
                  '<td>' + object.os + '</td>' +
                  '<td>' + object.screensize + '</td>' +
                  '<td>' + object.image + '</td>';
                  table.insertBefore(tr, document.getElementById("form_row"));
              });
          }
