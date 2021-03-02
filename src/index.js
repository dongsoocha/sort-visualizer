let length = document.getElementById("array-length").value;
var dataArray = [];
for (let i = 0; i < length; i++) {
    dataArray.push(Math.floor(Math.random()*100));
}

var svg = d3
  .select("body")
  .append("svg")
  .attr("height", "300px")
  .attr("width", "400px");

svg
  .selectAll("rect")
  .data(dataArray)
  .enter()
  .append("rect")
  .attr("height", function (d, i) {
    return d * 5;
  })
  .attr("width", `${250 / length}`)
  .attr("x", function (d, i) {
    return 400 / length * i;
  })
  .attr("y", function (d, i) {
    return 300 - (d * 5);
  });
