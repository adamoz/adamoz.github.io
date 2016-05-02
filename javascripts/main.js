console.log('This would be the main JS file.');

// Add svg element.
var svg = d3.select("body")
  .append("svg")
  .attr("height", 1500)
  .attr("width", 1500);

function getNewPoints(n){
  points = new Array();
  for(var it=0; it<n; it++){
    points.push([Math.round(Math.random()*900 + 60), 
          Math.round(Math.random()*900 + 60), 
          Math.round(Math.random()*10),
          Math.round(Math.random()*4)]);
  }
  return points;
}


function redrawPoints(pointsCount){

  var points = []
  var color = ["red", "green", "blue", "yellow"];
  points = getNewPoints(pointsCount);

  // Select circles.
  var circs = svg.selectAll("circle");

  
  // Bind data.
  var bindedCircs = circs.data(points);

  /**********************************************/
  
  // Add.
  var newPlaceholderEnter = bindedCircs.enter();
  newPlaceholderEnter
      .append("circle")
      .attr("cx", function(d){return d[0];})
      .attr("cy", function(d){return d[1];})
      .attr("r", function(d){return d[2];})
      .attr("fill", function(d){return color[d[3]];});

  // Update.
  bindedCircs
    .transition()
    .duration(500)
      .attr("cx", function(d){return d[0];})
      .attr("cy", function(d){return d[1];})
      .attr("r", function(d){return d[2];});
      //.attr("fill", function(d){return color[d[3]];});

  // Remove.
  var newPlaceholderExit = bindedCircs.exit();
  newPlaceholderExit.remove();
  
  /**********************************************/
}

var timeout = 0;
while(timeout < 1000000){
  timeout += 500
  setTimeout(function(){redrawPoints(Math.round(Math.random()*1300));}, timeout);
}
