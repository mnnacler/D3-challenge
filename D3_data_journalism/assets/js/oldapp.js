var svgwidth = 960;
var svgheight = 500;
var margin = {
    top: 20,
    bottom: 60,
    right: 40,
    left: 50
}
var width = svgwidth - margin.left - margin.right;
var height = svgheight - margin.top - margin.bottom;

var svg = d3.select("#scatter").append("svg").attr("width", svgwidth).attr("height", svgheight);
var chartGroup = svg.append("g").attr("transform", `translate${margin.left}, ${margin.top}`);

d3.csv("/assets/data/data.csv").then(function(healthData){
    console.log(healthData);
    //var state = healthData.map(data=> data.state);
    healthData.forEach(function(data){
        data.income =+ data.income;
        data.smokes =+ data.smokes;
        console.log(data.income);
        console.log(data.smokes);
        console.log(data.state);
    });
    
    var xLinear = d3.scaleLinear()
                    .domain([d3.min(healthData, d => d.income),d3.max(healthData, d => d.income)])
                    .range([0,width]);

    var yLinear = d3.scaleLinear()
                    .domain([d3.min(healthData, d => d.smokes),d3.max(healthData, d => d.smokes)])
                    .range([height,0]);

    var bottomAxis = d3.axisBottom(xLinear);
    var leftAxis = d3.axisLeft(yLinear);
                  
    chartGroup.append("g").attr("transform", `translate(0, ${height})`).call(bottomAxis);
    chartGroup.append("g").call(leftAxis);
    
    var elem = chartGroup.selectAll("g")
        .data(healthData)

    var elemEnter = elem.enter()
        .append("g")

    var circles = elemEnter.append("circle")
        .attr("cx", d => xLinear(d.income) )
        .attr("cy", d => yLinear(d.smokes) )
        .attr("r", 7.5)
        .style("fill", "blue")
        
    elemEnter.append("text")
        .text(function(d){
            return d.state;
        })
      

    
        
    var toolTip = d3.tip()
    .attr("class", "tooltip")
    .offset([80, -60])
    .html(function(d) {
        return (`<strong>${d.state}<strong>`);
    });

    chartGroup.call(toolTip);
    
    circles.on("click", function(d) {
        toolTip.show(d);
    })

        .on("mouseout", function(d, index) {
            toolTip.hide(d);
        });

}).catch(function(error) {
    console.log(error);
});
