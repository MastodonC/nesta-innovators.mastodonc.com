var width = 500;
var height = 500;

var chart = d3.select("#location.chart");
//	 .attr("width", width)
//	 .attr("height", height);

d3.json("data/by-location.json", function(error, json) {
    if (error) return console.warn(error);

    data2 = json;
    
    var barHeight = height/data2.length;
    
    var x = d3.scale.linear()
	    .domain([0, d3.max(data2, function(d) { return d.Count; })])
	    .range([0, width]);
    
    var xAxis1 = d3.svg.axis()
     	    .scale(x)
     	    .orient ("bottom");
    
    var bar = chart.selectAll("g")
	    .data(data2)
	    .enter().append("g")
	    .attr("transform", function(d, i) { return "translate(0," + i * barHeight + ")"; });
    
    bar.append("rect")
	.attr("width", function(d) { return x(d.Count); })
	.attr("height", barHeight - 1);
    
    bar.append("text")
	.attr("x", function(d) { return x(d.Count) - 3; })
	.attr("y", barHeight / 2)
	.attr("dy", ".35em")
	.text(function(d) { return d.Location; });

});
