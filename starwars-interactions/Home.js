

// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 30, left: 40},
  width = 400 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#box1")
.append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
.append("g")
  .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

//Hämta data
Promise.all([
    d3.json("starwars-episode-1-interactions-allCharacters.json"),
    d3.json("starwars-episode-2-interactions-allCharacters.json"),
    d3.json("starwars-episode-3-interactions-allCharacters.json")
  ]).then(function([data1, data2, data3]) {
      console.log("Data1:", data1);  // should now print {nodes: [...], links: [...]}
      console.log("Data1 nodes:", data1.nodes);
      console.log("Data1 links:", data1.links);
  

  // Initialize the links
  var link = svg
    .selectAll("line")
    .data(data1.links)
    .enter()
    .append("line")
      .style("stroke", "#aaa")

  // Initialize the nodes
  var node = svg
    .selectAll("circle")
    .data(data1.nodes)
    .enter()
    .append("circle")
      .attr("r", 20)
      .style("fill",  d => d.colour)

  // Let's list the force we wanna apply on the network
  var simulation = d3.forceSimulation(data1.nodes)
  .force("link", d3.forceLink(data1.links))
  .force("charge", d3.forceManyBody().strength(-400))
  .force("center", d3.forceCenter(width / 2, height / 2))
  .on("tick", ticked);

  // This function is run at each iteration of the force algorithm, updating the nodes position.
  function ticked() {
    link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
  
    node
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  }

});