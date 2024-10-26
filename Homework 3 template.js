// Load the data
const iris = d3.csv("iris.csv");

// Once the data is loaded, proceed with plotting
penguins.then(function(data) {
    // Convert string values to numbers
    data.forEach(function(d) {
        d.PetalLength = +d.PetalLength;
        d.PetalWidth = +d.PetalWidth;
    });

    // Define the dimensions and margins for the SVG
    const margin = { top: 20, right: 30, bottom: 50, left: 50 };
    const width = 800 - margin.left - margin.right;
    const height = 600 - margin.top - margin.bottom;


    // Create the SVG container
    const svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);
    
    
    // Set up scales for x and y axes
    // d3.min(data, d => d.bill_length_mm)-5

    const colorScale = d3.scaleOrdinal()
        .domain(data.map(d => d.Species))
        .range(d3.schemeCategory10);

    // Add scales
    const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.PetalLength))
    .range([0, width]);

    const yScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.PetalWidth))
    .range([height, 0]);

    

    // Add circles for each data point
    svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("cx", d => xScale(d.PetalLength))
    .attr("cy", d => yScale(d.PetalWidth))
    .attr("r", 5)
    .style("fill", d => colorScale(d.Species));
    

    // Add x-axis label
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .append("text")
    .attr("x", width / 2)
    .attr("y", 40)
    .style("fill", "black")
    .style("text-anchor", "middle")
    .text("Petal Length");

    

    // Add y-axis label
    svg.append("g")
    .call(d3.axisLeft(yScale))
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", -40)
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

});

penguins.then(function(data) {
    // Convert string values to numbers
    

    // Define the dimensions and margins for the SVG
    

    // Create the SVG container
    

    // Set up scales for x and y axes
    

    // Add scales     
    

    // Add x-axis label
    

    // Add y-axis label
    

    const rollupFunction = function(groupData) {
        const values = groupData.map(d => d.PetalLength).sort(d3.ascending);
        const q1 = d3.quantile(values, 0.25);
        return { q1};
    };

    const quartilesBySpecies = d3.rollup(data, rollupFunction, d => d.Species);

    quartilesBySpecies.forEach((quartiles, Species) => {
        const x = xScale(Species);
        const boxWidth = xScale.bandwidth();

        // Draw vertical lines
        
        // Draw box
        
        // Draw median line
        
        
    });
});