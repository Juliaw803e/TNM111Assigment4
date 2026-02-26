//najs: https://d3-graph-gallery.com/graph/network_basic.html
//stars: https://www.madrasacademy.com/create-a-dynamic-starry-night-background-with-html-css-and-javascript/
//Dropwdown with checkbox example: https://readymadeui.com/tailwind/component/dropdown-with-checkbox
//Draw: 
// set the dimensions and margins of the graph based on box
function drawData(boxID, dataToUse){
    var box = document.getElementById(boxID);
    
    var margin = { top: 1, right: 50, bottom: 100, left: 50 },
        width = box.clientWidth - 100,
        height = box.clientHeight; 
    
    var svg = d3.select(box)
      .append("svg")
      .attr("width", box.clientWidth)
      .attr("height", box.clientHeight)
      .append("g")
      .attr("transform", "translate(" + margin.right + "," + margin.top+ ")");
    
      // Initialize the links
      var link = svg
        .selectAll("line")
        .data(dataToUse.links)
        .enter()
        .append("line")
        .style("stroke", "#dddddd")
        .style("stroke-width",d => (d.value*0.15 + 2))
        .on("mouseover", function(event, d) {
            d3.select(this)
              .style("stroke", "red")
              .style("stroke-width", d => (d.value*0.2+ 3));
            node
              .filter(n => n === d.source || n === d.target)
              .style("stroke", "red")
              .style("stroke-width", 3);
    
             // linked brushing: highlight in other graph
            if (window.linkedGraphs) {
                window.linkedGraphs.forEach(g => {
                    if (g !== svg) { 
                        g.selectAll("circle")
                        .filter(n => n.name === d.source.name || n.name === d.target.name)
                        .style("stroke", "red")
                        .style("stroke-width", 3);
    
                        g.selectAll("line")
                        .filter(l => l.source.name === d.source.name && l.target.name === d.target.name)
                        .style("stroke", "red")
                        .style("stroke-width", l => (l.value*0.2+3));

                        //Tooltip for links: 
                        //test tooltip2way: 
                        const linkedSel = g.selectAll("line")
                        .filter(l =>
                            (l.source.name === d.source.name && l.target.name === d.target.name) ||
                            (l.source.name === d.target.name && l.target.name === d.source.name)
                        );
                        console.log("före"); 
                        if(linkedSel != null){
                            const linkedDatum = linkedSel.datum();
                            const nodeEl = linkedSel.node();
                            console.log("efter");

                            if (linkedDatum && nodeEl) {
                                const rect = nodeEl.getBoundingClientRect();

                                tooltip2
                                    .style("opacity", 1)
                                    .html(`<strong>${linkedDatum.source.name} & ${linkedDatum.target.name}</strong><br>Count: ${linkedDatum.value}`)
                                    .style("left", rect.x + "px")
                                    .style("top", rect.y + "px");
                            } 
                        }
                        //test tooltip2way: 
                    }
                });
            }
            console.log("innan riktiga tool");
            //tooltip test: 
            tooltip.transition().duration(100).style("opacity", 1);
            tooltip.html(`<strong>${d.source.name} & ${d.target.name}</strong><br>Count: ${d.value}`)
               .style("left", (event.pageX + 10) + "px")
               .style("top", (event.pageY - 28) + "px");
          })
        .on("mouseout", function(event, d) {
            d3.select(this)
              .style("stroke", "#dddddd")
              .style("stroke-width", d.value * 0.15 + 2);
        
            node
              .style("stroke", "none");
    
            if (window.linkedGraphs) {
                window.linkedGraphs.forEach(g => {
                  if (g !== svg) {
                    g.selectAll("circle")
                    
                      .style("stroke", "none");
        
                    g.selectAll("line")
                      .style("stroke", "#dddddd")
                      .style("stroke-width", l => l.value * 0.15 + 2);
                  }
                  //test tooltip2way: 
                  tooltip2.transition().duration(100).style("opacity", 0);
          });
        }
    
         //tooltip test: 
         tooltip.transition().duration(100).style("opacity", 0);
    }); 
    
      // Initialize the nodes
      var node = svg
        .selectAll("circle")
        .data(dataToUse.nodes)
        .enter()
        .append("circle")
        .attr("r", d => (d.value*0.2 + 5))
        .style("fill",  d => d.colour)
        .on("mouseover", function(event, d) {
            d3.select(this)
              .style("stroke", "red")
              .style("stroke-width", 2);
            link
                .filter(l => l.source === d || l.target === d)
                .style("stroke", "#dd7777")
                .style("stroke-width", 3);
                 // linked brushing: highlight in other graph
            if (window.linkedGraphs) {
                window.linkedGraphs.forEach(g => {
                if (g !== svg) { 
                    g.selectAll("circle")
                    .filter(n => n.name === d.name)
                    .style("stroke", "red")
                    .style("stroke-width", 2);
    
                    g.selectAll("line")
                    .filter(l => l.source.name === d.name || l.target.name === d.name)
                    .style("stroke", "#dd7777")
                    .style("stroke-width", 3);

                    //test tooltip2way: 
                    const linkedSel = g.selectAll("circle")
                    .filter(n => n.name === d.name);
                  
                    const linkedDatum = linkedSel.datum();
                    const nodeEl = linkedSel.node();
                    
                    if (linkedDatum && nodeEl) {
                        const rect = nodeEl.getBoundingClientRect();

                        tooltip2
                        .style("opacity", 1)
                        .html(`<strong>${linkedDatum.name}</strong><br>Count: ${linkedDatum.value}`)
                        .style("left", (rect.x) + "px")
                        .style("top", (rect.y) + "px");
                    }
                    //test tooltip2way: 
                }
               
                });
            }
    
            //tooltip: 
            tooltip.transition().duration(100).style("opacity", 1);
            tooltip.html(`<strong>${d.name}</strong><br>Count: ${d.value}`)
               .style("left", (event.pageX + 5) + "px")
               .style("top", (event.pageY - 10) + "px");
        })
        .on("mouseout", function(event, d) {
          d3.select(this)
            .style("stroke", null)
            .style("stroke-width", 0);
    
          link.style("stroke", "#dddddd")
              .style("stroke-width", d => d.value * 0.15 + 2);
    
          if (window.linkedGraphs) {
            window.linkedGraphs.forEach(g => {
              if (g !== svg) {
                g.selectAll("circle")
                  .filter(n => n.name === d.name)
                  .style("stroke", null)
                  .style("stroke-width", 0);
    
                g.selectAll("line")
                  .style("stroke", "#dddddd")
                  .style("stroke-width", l => l.value * 0.15 + 2);

                  //test tooltip2way: 
                  tooltip2.transition().duration(100).style("opacity", 0);
                
              }
            });
          }
    
          //tooltip test: 
          tooltip.transition().duration(100).style("opacity", 0);
        });
        
          /*})
          .on("mouseout", function(event, d) {
            d3.select(this)
              .style("stroke", "none");
            link
              .style("stroke", "#dddddd");
          });*/
    
      // Let's list the force we wanna apply on the network
      var simulation = d3.forceSimulation(dataToUse.nodes)
      .force("link", d3.forceLink(dataToUse.links))
      .force("charge", d3.forceManyBody().strength(-100))
      .force("center", d3.forceCenter(width / 2, height / 2))
       .force("collision", d3.forceCollide().radius(d => d.value * 0.4 + 25))
      .on("tick", ticked);
    
      // This function is run at each iteration of the force algorithm, updating the nodes position.
      var r = 40; // eller d.value om du vill
    
      function ticked() {
        node
          .attr("cx", d => d.x = Math.max(r, Math.min(width - r, d.x)))
          .attr("cy", d => d.y = Math.max(r, Math.min(height - r, d.y)));
      
        link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
      }
      return svg; //end of drawData!
    }

//Checkbox: 
let show = true;
function showCheckboxes() {
    let checkboxes = document.getElementById("checkBoxes");
     if (show) {
        checkboxes.style.display = "block";
        show = false;
     } else {
        checkboxes.style.display = "none";
        show = true;
    }
}
function showCheckboxes2() {
    let checkboxes = document.getElementById("checkBoxes2");
     if (show) {
        checkboxes.style.display = "block";
        show = false;
     } else {
        checkboxes.style.display = "none";
        show = true;
    }
}



function updateGraph(datasets) {
    const checkedBoxes = document.querySelectorAll("#checkBoxes input[type='checkbox']:checked");
    const selectedEpisodes = [...checkedBoxes].map(cb => parseInt(cb.value, 10)); // extract episode numbers
    
    const checkedBoxes2 = document.querySelectorAll("#checkBoxes2 input[type='checkbox']:checked");
    const selectedEpisodes2= [...checkedBoxes2].map(cb => parseInt(cb.value, 10)); // extract episode numbers

    console.log("Selected episodes:", selectedEpisodes);

    let dataToUse;
    let dataToUse2;

    //box 1
    if (selectedEpisodes.length == 6 || selectedEpisodes.length == 0) {
      dataToUse = datasets[7];//dataAll
      console.log("alla episoder"); 
    }
    else { 
      dataToUse = mergeEpisodes(selectedEpisodes, datasets); // merge only the selected episodes
      console.log("efter merge episoder"); 
    }; 

    //box2
    if (selectedEpisodes2.length == 6 || selectedEpisodes2.length == 0) {
        dataToUse2 = datasets[7];//dataAll
        console.log("alla episoder"); 
    }
    else { 
        dataToUse2 = mergeEpisodes(selectedEpisodes2, datasets); // merge only the selected episodes
        console.log("efter merge episoder"); 
    }; 

    // now draw with D3
    // REMOVE old SVGs first (to avoid duplicates)
  d3.select("#box1 svg").remove();
  d3.select("#box2 svg").remove();

  // now draw the graphs
  var svg1 = drawData("box1", dataToUse);
  var svg2 = drawData("box2", dataToUse2);

  // update linkedGraphs global
  window.linkedGraphs = [svg1, svg2];
}

//merge episodes test: 
function mergeEpisodes(selectedEpisodes, datasets) {
    const uniqueNodes = [];
    const uniqueLinks = [];
    const nodeMap = new Map(); // nodeName -> node object
  
    selectedEpisodes.forEach(ep => {
      const data = datasets[ep - 1];
  
      // Merge nodes
      data.nodes.forEach((currNode, idx) => {
        if (!nodeMap.has(currNode.name)) {
          const newNode = {...currNode};
          nodeMap.set(currNode.name, newNode);
          uniqueNodes.push(newNode);
        } else {
          nodeMap.get(currNode.name).value += currNode.value;
        }
      });
  
      // Merge links
      data.links.forEach(currLink => {
        const sourceNode = data.nodes[currLink.source]; // index → node object
        const targetNode = data.nodes[currLink.target];
  
        // Map to uniqueNodes
        const sourceUnique = nodeMap.get(sourceNode.name);
        const targetUnique = nodeMap.get(targetNode.name);
  
        // Merge if link exists
        const key = [sourceUnique.name, targetUnique.name].sort().join("__");
        let existing = uniqueLinks.find(l => [l.source.name, l.target.name].sort().join("__") === key);
  
        if (existing) {
          existing.value += currLink.value;
        } else {
          uniqueLinks.push({
            source: sourceUnique,
            target: targetUnique,
            value: currLink.value
          });
        }
      });
    });
  
    return { nodes: uniqueNodes, links: uniqueLinks };
  }

//Tooltip: 
var tooltip = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "#fff") // white background
      .style("border", "1px solid #333")
      .style("border-radius", "4px")
      .style("padding", "5px 10px")
      .style("pointer-events", "none") // so it doesn't block mouse
      .style("opacity", 0); // hidden initially

var tooltip2 = d3.select("body")
      .append("div")
      .attr("class", "tooltip")
      .style("position", "absolute")
      .style("background-color", "#fff") // white background
      .style("border", "1px solid #333")
      .style("border-radius", "4px")
      .style("padding", "5px 10px")
      .style("pointer-events", "none") // so it doesn't block mouse
      .style("opacity", 0); // hidden initially

//Hämta data: 
Promise.all([
        d3.json("starwars-episode-1-interactions-allCharacters.json"),
        d3.json("starwars-episode-2-interactions-allCharacters.json"),
        d3.json("starwars-episode-3-interactions-allCharacters.json"), 
        d3.json("starwars-episode-4-interactions-allCharacters.json"),
        d3.json("starwars-episode-5-interactions-allCharacters.json"),
        d3.json("starwars-episode-6-interactions-allCharacters.json"), 
        d3.json("starwars-episode-7-interactions-allCharacters.json"), 
        d3.json("starwars-full-interactions-allCharacters.json")
      ]).then(([data1, data2, data3, data4, data5, data6, data7, dataAll]) => {

const datasets = [data1, data2, data3, data4, data5, data6, data7, dataAll]; 
      
// Keep a global list of all SVGs for linked brushing
window.linkedGraphs = [];
/*var svg1 = drawData("box1", data1);
var svg2 = drawData("box2", data2);*/
//event listener
document.querySelectorAll("#checkBoxes input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", () => updateGraph(datasets));
});
document.querySelectorAll("#checkBoxes2 input[type='checkbox']").forEach(cb => {
    cb.addEventListener("change", () => updateGraph(datasets));
});

updateGraph(datasets); 
});
/*window.linkedGraphs.push(svg1);
window.linkedGraphs.push(svg2);*/

//Function to create multiple stars: --------------------------
function createStars() {
    const numberOfStars = 100; // Adjust for more or fewer stars
    for (let i = 0; i < numberOfStars; i++) {
      const star = document.createElement('div');
      star.classList.add('star');
  
      // Random size, position, and animation duration for each star
      const size = Math.random() * 3 + 1;
      star.style.width = `${size}px`;
      star.style.height = `${size}px`;
      star.style.left = `${Math.random() * 100}vw`;
      star.style.top = `${Math.random() * 100}vh`;
      star.style.animationDuration = `${Math.random() * 2 + 1}s`;
  
      document.body.appendChild(star);
    }
  }
  createStars();
