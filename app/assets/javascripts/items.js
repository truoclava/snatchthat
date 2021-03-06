 var margin = {top: 30, right: 20, bottom: 35, left: 50},
     width = 600 - margin.left - margin.right,
     height = 270 - margin.top - margin.bottom;

 var parseTime = d3.time.format("%I-%M-%H").parse;

 var x = d3.time.scale().range([0, width]);
 var y = d3.scale.linear().range([height, 0]);

 var xAxis = d3.svg.axis()
     .scale(x)
     .orient("bottom")
     .ticks(5);

 var yAxis = d3.svg.axis()
     .scale(y)
     .orient("left")
     .ticks(5);

 var area = d3.svg.area()
     .x(function(d) { return x(d.time); })
     .y0(height)
     .y1(function(d) { return y(d.time); });

 var valueline = d3.svg.line()
     .x(function(d) { return x(d.time); })
     .y(function(d) { return y(d.close); });

 var svg = d3.select("body")
     .append("svg")
         .attr("width", width + margin.left + margin.right)
         .attr("height", height + margin.top + margin.bottom)
     .append("g")
         .attr("transform",
               "translate(" + margin.left + "," + margin.top + ")");

 // function for the x grid lines
 function make_x_axis() {
     return d3.svg.axis()
         .scale(x)
         .orient("bottom")
         .ticks(5)
 }

 // function for the y grid lines
 function make_y_axis() {
   return d3.svg.axis()
       .scale(y)
       .orient("left")
       .ticks(5)
 }

 // Get the data
 d3.json("public/data.json", function(error, data) {
     data.forEach(function(d) {
         d.time = parseTime(d.time);
         d.close = +d.close;
     });

     // Scale the range of the data
     x.domain(d3.extent(data, function(d) { return d.time; }));
     y.domain([0, d3.max(data, function(d) { return d.close; })]);

     // Add the filled area
     svg.append("path")
         .datum(data)
         .attr("class", "area")
         .attr("d", area);

     // Draw the x Grid lines
     svg.append("g")
         .attr("class", "grid")
         .attr("transform", "translate(0," + height + ")")
         .call(make_x_axis()
             .tickSize(-height, 0, 0)
             .tickFormat("")
         )

     // Draw the y Grid lines
     svg.append("g")
         .attr("class", "grid")
         .call(make_y_axis()
             .tickSize(-width, 0, 0)
             .tickFormat("")
         )

     // Add the valueline path.
     svg.append("path")
         .attr("d", valueline(data));

     // Add the X Axis
     svg.append("g")
         .attr("class", "x axis")
         .attr("transform", "translate(0," + height + ")")
         .call(xAxis);

     // Add the Y Axis
     svg.append("g")
         .attr("class", "y axis")
         .call(yAxis);

     // Add the text label for the X axis
     svg.append("text")
         .attr("transform",
               "translate(" + (width/2) + " ," +
                              (height+margin.bottom) + ")")
         .style("text-anchor", "middle")
         .text("Time");

     // Add the white background to the y axis label for legibility
     svg.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("x", margin.top - (height / 2))
         .attr("dy", ".71em")
         .style("text-anchor", "end")
         .attr("class", "shadow")
         .text("Price ($)");

     // Add the text label for the Y axis
     svg.append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("x", margin.top - (height / 2))
         .attr("dy", ".71em")
         .style("text-anchor", "end")
         .text("Price ($)");

     // Add the title
     svg.append("text")
         .attr("x", (width / 2))
         .attr("y", 0 - (margin.top / 2))
         .attr("text-anchor", "middle")
         .style("font-size", "16px")
         .style("text-decoration", "underline")
         .text("Price over Time Graph");

 });
