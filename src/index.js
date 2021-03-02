let renderArray;
// give for value of input array-length
let length;
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", "500")
  .attr("width", "800");

document.getElementById("array-gen").addEventListener("click", function() {
    setup();
});

function setup() {
    // prepare for draw

    length = 20;
    renderArray = [];
  for (let i = 0; i < length; i++) {
    renderArray.push(Math.floor(Math.random()*100));
  }
  draw();
}

function draw() {
    // reset 
    svg.selectAll("*").remove();

  svg
    .selectAll("rect")
    .data(renderArray)
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
}

// let length = document.getElementById("array-length").value;
// let dataArray;
// document.getElementById("array-gen").addEventListener("click", () => {
//     length = document.getElementById("array-length").value;
//     dataArray = [];
//     for (let i = 0; i < length; i++) {
//         dataArray.push(Math.floor(Math.random()*100));
//     }
//     draw();
// });

// var svg = d3
//   .select("body")
//   .append("svg")
//   .attr("height", "300px")
//   .attr("width", "400px");

// function draw() {
//     svg
//       .selectAll("rect")
//       .data(dataArray)
//       .enter()
//       .append("rect")
//       .attr("height", function (d, i) {
//         return d * 5;
//       })
//       .attr("width", `${250 / length}`)
//       .attr("x", function (d, i) {
//         return 400 / length * i;
//       })
//       .attr("y", function (d, i) {
//         return 300 - (d * 5);
//       });
// }