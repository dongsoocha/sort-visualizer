let renderArray;
// give for value of input array-length
let length;
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", "500")
  .attr("width", "400");

let selected = [];

document.getElementById("array-gen").addEventListener("click", function() {
    length = document.getElementById("array-length").value;
    setup();
});
document.getElementById("bubble").addEventListener("click", function () {
  bubble(renderArray);
});

function setup() {
    // prepare for draw

    length = length || 20;
    renderArray = [];
  for (let i = 0; i < length; i++) {
    renderArray.push(Math.floor(Math.random()*100));
  }
}
// draw should only be called when new array is generated
function draw() {
    // reset 
    svg.selectAll("*").remove();

  svg
    .selectAll("rect")
    .data(renderArray)
    .enter()
    .append("rect")
    .attr("fill", "#999999")
    .attr("height", function (d, i) {
        return d * 5;
    })
    .attr("width", `${250 / length}`)
    .attr("x", function (d, i) {
        return 400 / length * i;
    })
    .attr("y", function (d, i) {
        return 500 - (d * 5);
    });
}



async function bubble(arr) {
  let sorted = false;
  let timeout = document.getElementById("sort-speed").value
  while (!sorted) {
    sorted = true;
    for (let i = 0; i < arr.length - 1; i++) {
        
        if (arr[i + 1] < arr[i]) {
            // swap
            [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
            
            sorted = false;
            await sleep(500/(10 * timeout));
      }
    }
  }
  return arr;
}

// credit to user Dan Dascalescu https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}




