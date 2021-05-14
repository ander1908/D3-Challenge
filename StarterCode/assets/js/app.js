// @TODO: YOUR CODE HERE!

//Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. You'll code this graphic in the `app.js` file of your homework directory—make sure you pull in the data from `data.csv` by using the `d3.csv` function. Your scatter plot should ultimately appear like the image at the top of this section.

//* Include state abbreviations in the circles.

//* Create and situate your axes and labels to the left and bottom of the chart.

//* Note: You'll need to use `python -m http.server` to run the visualization. This will host the page at `localhost:8000` in your web browser.
//Setup Chart Area 
var svgWidth = 1000;
var svgHeight = 750;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Setup SVG Wrapper
var svg = d3
  .select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);



// Import Data From CSV
d3.csv("assets/data/data.csv").then(function(statedata){
console.log("State Data",statedata);

//log state names
var states = statedata.map(data => data.state);
console.log("States",states);

//log state abbreviations
var abbr = statedata.map(data => data.abbr);
console.log("Abbreviations", abbr);
//parse data as numbers
statedata.forEach(function(data){
  data.age = +data.age;
  data.smokes = +data.smokes;
}
);


//Scales
  var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(statedata, d => d.smokes)])
    .range([0, width]);

  var yLinearScale = d3.scaleLinear()
    .domain([25, d3.max(statedata, d => d.age)])
    .range([height, 0]);

//axis

  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale);

  chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);


  chartGroup.append("g")
      .call(leftAxis);

  var circlesGroup = chartGroup.selectAll("circle")
      .data(statedata)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.smokes))
      .attr("cy", d => yLinearScale(d.age))
      .attr("r", "20")
      .attr("fill", "cyan")
      .attr("opacity", ".5");
  console.log(statedata);
  console.log("circles", circlesGroup);
  var abbrGroup = chartGroup.selectAll("text")
      .data(statedata)
      .enter()
      .append("text")
      .text((d) => (d.abbr))
      .attr("x", d => xLinearScale(d.smokes)-8)
      .attr("y", d => yLinearScale(d.age)+ 6);
      console.log("abbr", abbr);
  // Create axes labels
  chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left+10
      )
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Age");
  
  chartGroup.append("text")
    .attr("transform", `translate(${width / 2}, ${height + margin.top + 10})`)
    .attr("class", "axisText")
    .text("Percentage of Smokers %");






      
});