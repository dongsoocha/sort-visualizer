let renderArray;
// give for value of input array-length
let length;
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", "500")
  .attr("width", "400");

let selected = [];

// BUTTONS
document.getElementById("array-gen").addEventListener("click", function() {
    length = document.getElementById("array-length").value;
    setup();
});


document.getElementById("bubble").addEventListener("click", function () {
  bubble(renderArray);
});
document.getElementById("insertion").addEventListener("click", function () {
  insertion(renderArray);
});
document.getElementById("merge").addEventListener("click", function () {
  mergeSort(renderArray);
  console.log(renderArray);
});
document.getElementById("quick").addEventListener("click", function () {
  quickSort(renderArray);
});
document.getElementById("selection").addEventListener("click", function () {
  selection(renderArray);
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

// bubble

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

// insertion

async function insertion(arr) {
let timeout = document.getElementById("sort-speed").value;
  for (let i = 1; i < arr.length; i++) {
    let j;
    let temp = arr[i]; // will mutate so need to assign to var
    for (j = i - 1; j >= 0 && arr[j] > temp; j--) {
      arr[j + 1] = arr[j];
      await sleep(500/(10 * timeout));
    }
    arr[j + 1] = temp;
  }

  return arr;
}

// merge

// attempt #2 with iterative merge sort
function mergeSort(arr) {
  
}

// attemp #1 with recursion, not changing anything
// async function mergeSort(arr) {
//     if (arr.length <= 1) return arr;
//     const midIdx = Math.floor(arr.length / 2);

//     const left = await mergeSort(arr.slice(0, midIdx));
//     const right = await mergeSort(arr.slice(midIdx));

//     arr = await merge(left, right);
//     return arr;
// }

// async function merge(left, right) {
//     let sorted = [];
//     while (left.length && right.length) {
//         if (left[0] < right[0]) {
//             sorted.push(left.shift());
//         } else {
//             sorted.push(right.shift());
//         }
//     }

//     return sorted.concat(left, right);
// }

// quick 

async function quickSort(arr, start = 0, end = arr.length - 1) {
  if (start >= end) {
    return;
  }

  let idx = await partition(arr, start, end);

  await quickSort(arr, start, idx - 1);
  await quickSort(arr, idx + 1, end);
  return arr;
}

async function partition(arr, start, end) {
    let timeout = document.getElementById("sort-speed").value;
  // last element as pivot
  const pivot = arr[end];
  let pivotIdx = start;
  for (let i = start; i < end; i++) {
    if (arr[i] < pivot) {
      // swap elements
      [arr[i], arr[pivotIdx]] = [arr[pivotIdx], arr[i]];
      // move to next ele
      pivotIdx++;
      await sleep(1000 / (10 * timeout));
    }
  }

  // pivot value in middle
  [arr[pivotIdx], arr[end]] = [arr[end], arr[pivotIdx]];
  return pivotIdx;
}

// selection

async function selection(arr) {
  // find minimum, put at beginning. reverse bubblesort
  let timeout = document.getElementById("sort-speed").value;
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
        await sleep(1000/(10 * timeout));
    }
  }
  return arr;
}


// credit to user Dan Dascalescu https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}




