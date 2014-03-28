
var chart3 = d3.select("#companies.chart")
	.attr("width", width)
	.attr("height", height);

d3.json("data/by-company.json", function(error, json) {
  if (error) return console.warn(error);
    data3 = json;
    
    var barHeight3 = height/data3.length;
    
var x3 = d3.scale.linear()
    .domain([0, d3.max(data3, function(d) { return d.Count; })])
    .range([0, width]);
    
    var bar3 = chart3.selectAll("g")
      .data(data3)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight3 + ")"; });

  bar3.append("rect")
      .attr("width", function(d) { return x3(d.Count); })
      .attr("height", barHeight3 - 1);

  bar3.append("text")
      .attr("x", function(d) { return x3(d.Count) - 3; })
      .attr("y", barHeight3 / 2)
      .attr("dy", ".35em")
	.text(function(d) { return d.Company; });});
