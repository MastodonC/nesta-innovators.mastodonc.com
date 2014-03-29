var width = 500,
    barHeight = 20;

var x = d3.scale.linear ()
	.range ([0, width]);

var padding = 30;

var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

function individuals (div, data) {
    var x_extent = d3.max(data, function(d){return d[2];});
    var x_scale = d3.scale.linear()
            .range([0,400])
            .domain([0, x_extent]);

    var xAxis1 = d3.svg.axis()
	.scale(x_scale)
	    .orient ("bottom");

    var svg = d3.select(div)
	    .attr("width", width + margin.left + margin.right)
	    .attr("height", height + margin.top + margin.bottom)
	    .append("g")
	    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var tip = d3.tip()
	    .attr('class', 'd3-tip')
	    .offset([-10, 0])
	    .html(function(d) {
		return "<strong>Name:</strong> <span style='color:red'>" + d[1] +
		    "</span> <strong>No of Followers: </strong> <span style='color:red'>"
		    + d[2] + "</span>";});

    svg.call(tip);

    svg.selectAll("div")
	    .data(data)
	.enter().append("div")
	.on("click", function(){alert("hi");})
	    .style("width", function(d) {return x_scale(d[2]);})
	    .style ("height", "20px")
	    .style ("font-size", "16px")
	.text(function(d) { return d[1]; })
	.on('mouseover', tip.show)
	.on('mouseout', tip.hide);

    svg.append("g")
	.attr("class", "axis")
	.attr("id", "ind-axis")
	.attr("transform", "translate(0," + height + ")")
	.call (xAxis1);
    
};

function chart (div, data) {
    var x_extent = d3.max(data, function(d){return d[1];});
    var x_scale = d3.scale.linear()
            .range([0,400])
            .domain([0, x_extent]);

    var fixed = d3.format ("f");
    
     var xAxis1 = d3.svg.axis()
	     .scale(x_scale)
	     .ticks(10)
	     .orient ("bottom");


    var svg = d3.select(div)
	    .attr ("width", width)
	    .attr ("height", barHeight);
    	   
    
    svg.selectAll("div")
	.data(data)
	.enter().append("div")
	.style("width", function(d) {return x_scale(d[1]);})
	.style ("height", "20px")
	.text(function(d) { return d[0]; })
	.style ("font-size", "16px");

    svg.append("g")
	.attr("class", "axis")
	.attr("id", "chart-axis")
	    .call (xAxis1);
}


