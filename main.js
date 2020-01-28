window.onload = function(){
  
     document.getElementById("th1").addEventListener("click", function(){ sortTable(0, 1)});
     document.getElementById("th2").addEventListener("click", function(){ sortTable(1, 1)});
     document.getElementById("th3").addEventListener("click", function(){ sortTable(2, 1)});
     document.getElementById("th4").addEventListener("click", function(){ sortTable(3, 1)});
  
     document.getElementById("th2.1").addEventListener("click", function(){ sortTable(0, 2)});
     document.getElementById("th2.2").addEventListener("click", function(){ sortTable(1, 2)});
     document.getElementById("th2.3").addEventListener("click", function(){ sortTable(2, 2)});
  
    // Code used as base for the following function https://www.geeksforgeeks.org/how-to-sort-rows-in-a-table-using-javascript/
   
     //this algorithm uses bubblesort for the tablerows
     function sortTable(n, tableNumber) { 
         console.log("done");
         var table, i, x, y; 
         table = document.getElementById("tablebody" + tableNumber); 
         var switching = true; 
  
         // Run loop until no switching is needed anymore
         while (switching) { 
             switching = false; 
             var rows = table.rows; 
  
             // Loop through all rows 
             for (i = 0; i < (rows.length - 1); i++) { 
                 var Switch = false; 
  
                 // get the 2 rows that are being compared
                 x = rows[i].getElementsByTagName("TD")[n]; 
                 y = rows[i + 1].getElementsByTagName("TD")[n]; 
  
                 // Check if 2 rows need to be switched, for text 
                 if (n != 3 && x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) 
                     { 
                     // If yes, mark Switch as needed and break loop 
                     Switch = true; 
                     break; 
                 }
               
                 // Check if 2 rows need to be switched, for numbers
                 if (n == 3 && parseInt(x.innerHTML) > parseInt(y.innerHTML))
                     { 
                     // If yes, mark Switch as needed and break loop 
                     Switch = true; 
                     break; 
                 } 
             } 
             if (Switch) { 
                 // switch rows, switch is completed
                 rows[i].parentNode.insertBefore(rows[i + 1], rows[i]); 
                 switching = true; 
             } 
         } 
     } 
    
    var resetButton = document.getElementById("reset");
    resetButton.addEventListener("click", resetForm);
  
    function resetForm(){
        var xhttpreset = new XMLHttpRequest();
  
        xhttpreset.open("GET", "https://wt.ops.labs.vu.nl/api20/14d61d4c/reset", true); //send a get request with the reset url
        xhttpreset.send();
    }
    
    var update_time = 2000;
    setTableData();
    window.setInterval(setTableData, update_time)
  
    // Code used as base for the following 2 functions https://stackoverflow.com/questions/51275730/populate-html-table-with-json-data
  
    function setTableData(){
        // url of database
        var json_url = "https://wt.ops.labs.vu.nl/api20/14d61d4c/";
  
        //Build the ajax request
        xmlhttp = new XMLHttpRequest();
        xmlhttp.onreadystatechange = function() { 
            //when correct response, pass the data to the updateJson function 
            if (this.readyState == 4 && this.status == 200) {
                var data = JSON.parse(this.responseText); // convert the response to a json object
                updateJson(data);// pass the json object to the append_json function
            }
        }
      
        //setup the request
        xmlhttp.open("GET", json_url, true);
        //set request headers
        xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded", "Access-Control-Allow-Origin");
        
        xmlhttp.send(); // when the request completes it will execute the code in onreadystatechange section
    }
    
    //this function puts the json data into the table
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
