let renderArray;
// give for value of input array-length
let length;
var svg = d3
  .select(".app")
  .append("svg")
  .attr("height", "200")
  .attr("width", "300")
  .attr("fill", "#222222");

let selected = [];
let current;

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
    .attr("fill", function (d, i) {
        return current === i ? 'red' : selected.includes(i) ? 'green' : '#777777';
    })
    .attr("height", function (d, i) {
        return d * 2;
    })
    .attr("width", `${150 / length}`)
    .attr("x", function (d, i) {
        return 300 / length * (i) + 75 / length;
    })
    .attr("y", function (d, i) {
        return 200 - (d * 2);
    });
}

// bubble

async function bubble(arr) {
  let sorted = false;
  let timeout = document.getElementById("sort-speed").value
  while (!sorted) {
    sorted = true;
    selected = [];
    for (let i = 0; i < arr.length - 1; i++) {
        selected.push(i);
        if (arr[i + 1] < arr[i]) {
            // swap
            current = i + 1;
            [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
            
            sorted = false;
            await sleep(1000/(10 * timeout));
      }
    }
  }
  return arr;
}

// insertion

async function insertion(arr) {
let timeout = document.getElementById("sort-speed").value;
  for (let i = 1; i < arr.length; i++) {
    selected = [];
    let j;
    let temp = arr[i]; // will mutate so need to assign to var
    for (j = i - 1; j >= 0 && arr[j] > temp; j--) {
      current = null;
      arr[j + 1] = arr[j];
      selected.push(j + 1);
      current = j + 1;
      await sleep(1000/(10 * timeout));
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
    selected = [];
    if (arr[i] < pivot) {
      // swap elements
      [arr[i], arr[pivotIdx]] = [arr[pivotIdx], arr[i]];
    //   selected = Array.from(new Array(pivotIdx - i + 1));
        selected.push(i, pivotIdx);
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
    selected = [];
    current = null;
    for (let j = i + 1; j < arr.length; j++) {
        selected.push(j);
        if (arr[j] < arr[min]) {
            min = j;
            current = j;
            await sleep(1000/(10 * timeout));
      }
    }
    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];

    }
  }
  return arr;
}


// credit to user Dan Dascalescu https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}




