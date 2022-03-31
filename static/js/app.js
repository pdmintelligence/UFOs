// from data.js
const tableData = data;

// get table references
var tbody = d3.select("tbody");

function buildTable(data) {
  // First, clear out any existing data
  tbody.html("");

  // Next, loop through each object in the data
  // and append a row and cells for each value in the row
  data.forEach((dataRow) => {
    // Append a row to the table body
    let row = tbody.append("tr");

    // Loop through each field in the dataRow and add
    // each value as a table cell (td)
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
}

// 1. Create a variable to keep track of all the filters as an object.
var filters = {};

// 3. Use this function to update the filters. 
function updateFilters() {

    // 4a. Save the element that was changed as a variable.
    let Changed_Element = d3.select(this);
    // 4b. Save the value that was changed as a variable.
    let Element_Value = Changed_Element.property("value");
    // 4c. Save the id of the filter that was changed as a variable.
    let Element_ID = Changed_Element.attr("id");
    // 5. If a filter value was entered then add that filterId and value
  if (Element_Value) {
    filters[Element_ID] = Element_Value;
  }
  else {
    delete filters[Element_ID];
  }

    // to the filters list. Otherwise, clear that filter from the filters object.
 
  
    // 6. Call function to apply all filters and rebuild the table
    filterTable();
  
  }

  // 7. Use this function to filter the table when data is entered.
  function filterTable() {
  
    // 8. Set the filtered data to the tableData.
    var Filtered_Data =tableData;
  
    // 9. Loop through all of the filters and keep any data that
    // matches the filter values
    // - NOTE: this section of code was heavily taken from Module 12 examples*. 
    Object.entries(filters).forEach(([key, value]) => {
      Filtered_Data = Filtered_Data.filter(row => row[key] == value);
    });

    //Object.entries(result).forEach(([key, value]) => {
      //PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);

    // 10. Finally, rebuild the table using the filtered data
    buildTable(Filtered_Data);
  }
    
  // 2. Attach an event to listen for changes to each filter
  //--the issue in completing this project was detected ; it was a capitalized 'S' value in SelectAll when it should have been lower case 's'**.
  d3.selectAll("input").on("change", updateFilters);
  
  // Build the table when the page loads
  buildTable(tableData);
  