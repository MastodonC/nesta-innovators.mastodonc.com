
var chart2 = d3.select("#individuals.chart")
	.attr("width", width)
	.attr("height", height);

d3.json("data/innovators.json", function(error, json) {
  if (error) return console.warn(error);
    data = json;
    
    var barHeight2 = height/data.length;
    
var x2 = d3.scale.linear()
    .domain([0, d3.max(data, function(d) { return d.followers; })])
    .range([0, width]);
    
    var bar2 = chart2.selectAll("g")
      .data(data)
    .enter().append("g")
      .attr("transform", function(d, i) { return "translate(0," + i * barHeight2 + ")"; });

  bar2.append("rect")
      .attr("width", function(d) { return x2(d.followers); })
      .attr("height", barHeight2 - 1);

  bar2.append("text")
      .attr("x", function(d) { return x2(d.followers) - 3; })
      .attr("y", barHeight2 / 2)
      .attr("dy", ".35em")
	.text(function(d) { return d.login; });});
