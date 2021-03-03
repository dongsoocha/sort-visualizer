let renderArray;
// give for value of input array-length
let length;
var svg = d3
  .select(".app")
  .append("svg")
  .attr("height", "200")
  .attr("width", "400")
  .attr("fill", "#222222");

let selected = [];
let current;

// add comparisons

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
  mergeSort(renderArray, 0, length - 1);
});
document.getElementById("quick").addEventListener("click", function () {
  quickSort(renderArray);
});
document.getElementById("selection").addEventListener("click", function () {
  selection(renderArray);
});

function setup() {
    // prepare for draw

    length = length || 30;
    selected = [];
    current = null;
    renderArray = [];
  for (let i = 0; i < length; i++) {
    renderArray.push(Math.floor(Math.random()* 99 + 1));
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
    .attr("width", `${200 / length}`)
    .attr("x", function (d, i) {
        return 400 / length * (i) + 100 / length;
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
// needed bottom up iterative implementation
// credit to https://blog.benoitvallon.com/sorting-algorithms-in-javascript/the-merge-sort-algorithm/

async function mergeSort(array) {
  var step = 1;
  while (step < array.length) {
    var left = 0;
    while (left + step < array.length) {
      await merge(array, left, step);
      left += step * 2;
    }
    step *= 2;
  }
  return array;
}

async function merge(array, left, step) {
  let timeout = document.getElementById("sort-speed").value;
  var right = left + step;
  var end = Math.min(left + step * 2 - 1, array.length - 1);
  var leftMoving = left;
  var rightMoving = right;
  var temp = [];
  selected = [];
  for (var i = left; i <= end; i++) {
    selected.push(i);
    if (
      (array[leftMoving] <= array[rightMoving] || rightMoving > end) &&
      leftMoving < right
    ) {
      temp[i] = array[leftMoving];
      leftMoving++;
    } else {
      temp[i] = array[rightMoving];
      rightMoving++;
    }
    await sleep(1000 / (10 * timeout));
  }

  for (var j = left; j <= end; j++) {
    selected.push(j);
    array[j] = temp[j];
    await sleep(1000 / (10 * timeout));
  }
}

// quicksort 

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
        await sleep(1000/(10 * timeout));
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




