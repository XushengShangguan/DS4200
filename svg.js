const ecar =  d3.csv("Electric Vehicle Population Data.csv");

ecar.then(function(data) {
    data.forEach(function(d) {
        d.Model = +d.Model;
        d.ElectricRange = +d.ElectricRange
    });

    // define the dimensions and margins for the SVG
    const margin = {top:50, right:20, bottom: 50, left:20};
    const width = 1000 - margin.left - margin.right;
    const height = 500 - margin.top - margin.bottom;

    const svg = d3.select("#scatterplot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    // add color scales and scakes
    const colorScale = d3.scaleOrdinal()
    .domain(ecar.map(d => d.Make))
    .range(d3.schemeCatagory10);

    const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.Model))
    .range([0, width]);

    const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.ElectricRange))
    .range([height, 0]);

    // Add circles for each data point
    svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("cx", d => xScale(d.Model))
    .attr("cy", d => yScale(d.ElectricRange))
    .attr("r", 3)
    .style("fill", d => colorScale(d.Make));
    

    // Add x-axis label
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .append("text")
    .attr("x", width / 2)
    .attr("y", 30)
    .style("fill", "black")
    .style("text-anchor", "middle")
    .text("Petal Length");

    

    // Add y-axis label
    svg.append("g")
    .call(d3.axisLeft(yScale))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -30)
    .attr("x", -height / 2)
    .style("fill", "black")
    .style("text-anchor", "middle")
    .text("Petal Width");
    

    // Add legend
    const legend = svg.selectAll(".legend")
        .data(colorScale.domain())
        .enter().append("g")
        .attr("class", "legend")
        .attr("transform", (d, i) => "translate(0," + i * 20 + ")");
    
        legend.append("circle")
        .attr("cx", width+10)  
        .attr("cy", 6)
        .attr("r", 3)
        .style("fill", colorScale);

        legend.append("text")
        .attr("x", width+30)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", "start")
        .text(d => d);

});