window.onload = function(){
  
     document.getElementById("th1").addEventListener("click", function(){ sortTable(0, 1)});
     document.getElementById("th2").addEventListener("click", function(){ sortTable(1, 1)});
     document.getElementById("th3").addEventListener("click", function(){ sortTable(2, 1)});
     document.getElementById("th4").addEventListener("click", function(){ sortTable(3, 1)});
  
     document.getElementById("th2.1").addEventListener("click", function(){ sortTable(0, 2)});
     document.getElementById("th2.2").addEventListener("click", function(){ sortTable(1, 2)});
     document.getElementById("th2.3").addEventListener("click", function(){ sortTable(2, 2)});
   
     //implementation of bubblesort on a table
     function sortTable(n, tableNumber) { 
         console.log("done");
         var table, i, x, y; 
         table = document.getElementById("tablebody" + tableNumber); 
         var switching = true; 
  
         // Run loop until no switching is needed 
         while (switching) { 
             switching = false; 
             var rows = table.rows; 
  
             // Loop to go through all rows 
             for (i = 0; i < (rows.length - 1); i++) { 
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
    
    var resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", resetForm);
  
    function resetForm(){
        var xhttpreset = new XMLHttpRequest();
  
        xhttpreset.open("GET", "https://wt.ops.labs.vu.nl/api20/14d61d4c/reset", true);
        xhttpreset.send();
    }
    
    setTableData();
    window.setInterval(setTableData, update)
  
    function setTableData(){
        // Relative URL of external json file
        var json_url = "https://wt.ops.labs.vu.nl/api20/14d61d4c/";
  
        //Build the XMLHttpRequest (aka AJAX Request)
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() { 
            //when a good response is given do this  
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText); // convert the response to a json object
                updateJson(data);// pass the json object to the append_json function
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
    function updateJson(data){
        var table_body = document.getElementById("tablebody1");
        var table_html = "";
               
        data.forEach(function(object) {
            table_html += '<tr><td>' + object.brand + '</td>' +
            '<td>' + object.model + '</td>' +
            '<td>' + object.os + '</td>' +
            '<td>' + object.screensize + '</td>' +
            '<td> <img class="defaultImg" src="' +  object.image + '"></td></tr>';
        });
      
        table_body.innerHTML = table_html;
    }  
}
