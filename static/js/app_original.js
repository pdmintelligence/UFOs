//This is used to transition data from an array into table in js


// import the data from data.js
const tableData = data;

// Reference the HTML table using d3
//d3 is a javascript library that has dynamic graphics*. 
var tbody = d3.select("tbody");

//creating new function - 11.5.1*.
//NOTE: buildtable is a standard native js function*. 
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
      }
    );
  });
}

//adding a click button for filtering effects***.
//with select #datetime - you are telling it to look for this HTML tag*. 
//chaining .property("value"); to d3 function, you are not only looking for where oure date values are stored 
//but to actually grabt that info and hold it in the 'date variable*.


function handleClick() {
  // Grab the datetime value from the filter
  let date = d3.select("#datetime").property("value");
  let filteredData = tableData;

   // Check to see if a date was entered and filter the
  // data using that date.
  if (date) {
    // Apply `filter` to the table data to only keep the
    // rows where the `datetime` value matches the filter value
    filteredData = filteredData.filter(row => row.datetime === date);
  }

   // Rebuild the table using the filtered data
  // @NOTE: If no date was entered, then filteredData will
  // just be the original tableData.
  buildTable(filteredData);
}

// Attach an event to listen for the form button
d3.selectAll("#filter-btn").on("click", handleClick);

// Build the table when the page loads
buildTable(tableData);










