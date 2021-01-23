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
var chartGroup = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("/assets/data/data.csv").then(function(healthData){
    //console.log(healthData);
    //var state = healthData.map(data=> data.state);
    healthData.forEach(function(data){
        data.income =+ data.income;
        data.smokes =+ data.smokes;
        //console.log(data.income);
        //console.log(data.smokes);
        //console.log(data.state);
    });
    //x axis
    var xLinear = d3.scaleLinear()
                    .domain([d3.min(healthData, d => d.income)-10000,d3.max(healthData, d => d.income)+10000])
                    .range([0,width]);


    var yLinear = d3.scaleLinear()
                    .domain([0,d3.max(healthData, d => d.smokes)+2])
                    .range([height,0]);

    var bottomAxis = d3.axisBottom(xLinear);
    var leftAxis = d3.axisLeft(yLinear);
                  
    chartGroup.append("g").attr("transform", "translate(0," + height + ")").call(bottomAxis);
    chartGroup.append("g").call(leftAxis);

    var circles = chartGroup.selectAll("circle")
        .data(healthData)
        .enter()
        .append("circle")
        .attr("cx", d => xLinear(d.income) )
        .attr("cy", d => yLinear(d.smokes) )
        .attr("r", 7.5)
        .attr("class", "stateCircle")
    
    //add axis titles
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", svgwidth/2)
        .attr("y", height + margin.top + 50)
        .text("Avg. Yearly Income")
        .attr("class", "aText")

    svg.append("text")
        .attr("x", -svgheight/2)
        .attr("y", margin.left-35)
        .attr("transform", "rotate(-90)")
        .text("Percentage of Smokers")
        .attr("class", "aText")

    chartGroup.selectAll("text")
        .data(healthData)
        .enter()
        .append("text")
        .attr("text-anchor", "middle")
        .attr("x", d => xLinear(d.income))
        .attr("y", d => yLinear(d.smokes))
        .text(function(d){
            return d.abbr;
        })
        .attr("class", "stateText")

}).catch(function(error) {
    console.log(error);
});
