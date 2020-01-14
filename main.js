var tableHeader = document.getElementById("th1");

tableHeader.addEventListener("click", sortTable)

function sortTable() { 
  var table, i, x, y; 
  table = document.getElementById("table1"); 
  var switching = true; 

  // Run loop until no switching is needed 
  while (switching) { 
      switching = false; 
      var rows = table.rows; 

      // Loop to go through all rows 
      for (i = 1; i < (rows.length - 1); i++) { 
          var Switch = false; 

          // Fetch 2 elements that need to be compared 
          x = rows[i].getElementsByTagName("TD")[0]; 
          y = rows[i + 1].getElementsByTagName("TD")[0]; 

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
