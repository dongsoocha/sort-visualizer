let renderArray1;
let renderArray2;
// give for value of input array-length
let length;

// color values
let base;
let selected;
let compared;

// statistics variables
let counter1 = 0;
let counter2 = 0


// initialize SVG's
var svg1 = d3
  .select(".svgs")
  .append("svg")
  .attr("height", "250")
  .attr("width", "800")
  .attr("fill", "#222222");
var svg2 = d3
  .select(".svgs")
  .append("svg")
  .attr("height", "270")
  .attr("width", "800")
  .attr("fill", "#222222");

let selected1 = [];
let selected2 = [];

let current1;
let current2;

// add comparisons

// breaker
let running = false;

// change label for range
function changeLabel() {
  var arrSize = document.getElementById("array-length").value;
  document.getElementById("input-disp").innerHTML = arrSize;
  
}

// BUTTONS
document.getElementById("stop-sort").addEventListener("click", function() {
  running = false;
})
document.getElementById("array-gen").addEventListener("click", function() {
  running = false;
    length = document.getElementById("array-length").value;
    setup();
});

document.getElementById("array-sort").addEventListener("click", function () {
  running = true;
  const sort1 = document.getElementById("sort-1").value;
  const sort2 = document.getElementById("sort-2").value;
  switch (sort1) {
    case "bubble":
      bubble(renderArray1, 1);
      break;
    case "insertion":
      insertion(renderArray1, 1);
      break;
    case "merge":
      mergeSort(renderArray1, 1);
      break;
    case "quick":
      quickSort(renderArray1, 0, length - 1, 1);
      break;
    case "selection":
      selection(renderArray1, 1);
      break;
  };
  switch (sort2) {
    case "bubble":
      bubble(renderArray2, 2);
      break;
    case "insertion":
      insertion(renderArray2, 2); 
      break;
    case "merge": 
      mergeSort(renderArray2, 2);
      break;
    case "quick":
      quickSort(renderArray2, 0, length - 1, 2);
      break;
    case "selection":
      selection(renderArray2, 2);
      break;
  }
})

function setup() {
    // prepare for draw

    length = length || 30;
    selected1 = [];
    selected2 = [];
    current1 = null;
    current2 = null;
    renderArray1 = [];
    renderArray2 = [];
  for (let i = 0; i < length; i++) {
    let num = Math.floor(Math.random() * 99 + 1);
    renderArray1.push(num);
    renderArray2.push(num);
  }
}

function draw() {
    // reset 
    base = document.getElementById("base").value;
    selected = document.getElementById("selected").value;
    compared = document.getElementById("compared").value;
    svg1.selectAll("*").remove();
    svg2.selectAll("*").remove();

  svg1
    .selectAll("rect")
    .data(renderArray1)
    .enter()
    .append("rect")
    .attr("fill", function (d, i) {
        return current1 === i
          ? `${selected}`
          : selected1.includes(i)
          ? `${compared}`
          : `${base}`;
    })
    .attr("height", function (d, i) {
        return d * 2.5;
    })
    .attr("width", `${400 / length}`)
    .attr("x", function (d, i) {
        return 800 / length * (i) + 200 / length;
    })
    .attr("y", function (d, i) {
        return 250 - (d * 2.5);
    });

  svg2
    .selectAll("rect")
    .data(renderArray2)
    .enter()
    .append("rect")
    .attr("fill", function (d, i) {
      return current2 === i
        ? `${selected}`
        : selected2.includes(i)
        ? `${compared}`
        : `${base}`;
    })
    .attr("height", function (d, i) {
      return d * 2.5;
    })
    .attr("width", `${400 / length}`)
    .attr("x", function (d, i) {
      return (800 / length) * i + 200 / length;
    })
    .attr("y", function (d, i) {
      return 20;
    });
}

// bubble

async function bubble(arr, type) {
  let sorted = false;
  let timeout = document.getElementById("sort-speed").value
  let counter = 0;
  while (!sorted) {
    sorted = true;
    switch (type) {
      case 1:
        selected1 = [];
        break;
      case 2:
        selected2 = [];
    }
    for (let i = 0; i < arr.length - 1 - counter; i++) {
      if (!running) return false;
      switch(type) {
        case 1:
          selected1.push(i);
          break
        case 2:
          selected2.push(i);
      }
      if (arr[i + 1] < arr[i]) {
        // swap
            switch(type) {
              case 1:
                current1 = i + 1;
                break
              case 2:
                current2 = i + 1;
                break;
            }
          // selected2.push(i);
            [arr[i + 1], arr[i]] = [arr[i], arr[i + 1]];
            
            sorted = false;
          }
          await sleep(500/(10 * timeout));
        }
        counter++;
  }
  return arr;
}

// insertion

async function insertion(arr, type) {
let timeout = document.getElementById("sort-speed").value;
  for (let i = 1; i < arr.length; i++) {
    switch (type) {
      case 1:
        selected1 = [];
        break;
      case 2:
        selected2 = [];
    }
    let j;
    let temp = arr[i]; // will mutate so need to assign to var
    for (j = i - 1; j >= 0 && arr[j] > temp; j--) {
      if (!running) return false;
      current = null;
      arr[j + 1] = arr[j];
      switch(type) {
        case 1:
          selected1.push(j + 1);
          current1 = j + 1;
          break
        case 2:
          selected2.push(j + 1);
          current2 = j + 1;
      }
      await sleep(500/(10 * timeout));
    }
    arr[j + 1] = temp;
  }

  return arr;
}

// merge 
// needed bottom up iterative implementation
// credit to https://blog.benoitvallon.com/sorting-algorithms-in-javascript/the-merge-sort-algorithm/

async function mergeSort(array, type) {
  var step = 1;
  while (step < array.length) {
    var left = 0;
    while (left + step < array.length) {
      if (!running) return false;
      await merge(array, left, step, type);
      left += step * 2;
    }
    step *= 2;
  }
  return array;
}

async function merge(array, left, step, type) {
  let timeout = document.getElementById("sort-speed").value;
  var right = left + step;
  var end = Math.min(left + step * 2 - 1, array.length - 1);
  var leftMoving = left;
  var rightMoving = right;
  var temp = [];
  switch (type) {
    case 1:
      selected1 = [];
      current1 = null;
      break;
    case 2:
      selected2 = [];
      current2 = null;
  }
  for (var i = left; i <= end; i++) {
    if (!running) return false;
    switch (type) {
      case 1:
        selected1.push(i);
        current1 = i;
        break;
      case 2:
        selected2.push(i);
        current2 = i;
    }
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
  }
  
  for (var j = left; j <= end; j++) {
    if (!running) return false;
    switch (type) {
      case 1:
        current1 = j;
        current1 = j;
        break;
      case 2:
        selected2.push(j);
        current2 = j;
    }
    array[j] = temp[j];
    await sleep(500 / (10 * timeout));
  }
  // await sleep(500 / (10 * timeout));
}

// quicksort 

async function quickSort(arr, start = 0, end = arr.length - 1, type) {
  if (start >= end) {
    return;
  }
  switch (type) {
    case 1:
      selected1 = [];
  
      break;
    case 2:
      selected2 = [];
  }
  if (!running) return false;
  let idx = await partition(arr, start, end, type);
  
  await quickSort(arr, start, idx - 1, type);
  await quickSort(arr, idx + 1, end, type);
  return arr;
}

async function partition(arr, start, end, type) {
  let timeout = document.getElementById("sort-speed").value;
  // last element as pivot
  const pivot = arr[end];
  let pivotIdx = start;
  switch (type) {
      case 1:
        current1 = pivotIdx;
        break;
      case 2:
        current2 = pivotIdx;
  }
  
  for (let i = start; i < end; i++) {
    if (!running) return false;
    switch (type) {
      case 1:
        selected1.push(i);
        break;
      case 2:
        selected2.push(i);
    }
    if (arr[i] < pivot) {
      // swap elements
      [arr[i], arr[pivotIdx]] = [arr[pivotIdx], arr[i]];
      // move to next ele
        pivotIdx++;
        await sleep(500 / (10 * timeout));
    }
  }
  
  // pivot value in middle
  [arr[pivotIdx], arr[end]] = [arr[end], arr[pivotIdx]];
  await sleep(500 / (10 * timeout));
  return pivotIdx;
}

// selection

async function selection(arr, type) {
  // find minimum, put at beginning. reverse bubblesort
  let timeout = document.getElementById("sort-speed").value;
  for (let i = 0; i < arr.length - 1; i++) {
    let min = i;
    switch (type) {
      case 1:
        selected1 = [i];

        break;
      case 2:
        selected2 = [i];
        break;
    }
    current = null;
    for (let j = i + 1; j < arr.length; j++) {
      if (!running) return false;
        switch (type) {
          case 1:
            selected1.push(j);

            break;
          case 2:
            selected2.push(j);
        }
        await sleep(500/(10 * timeout));
        if (arr[j] < arr[min]) {
          min = j;
          switch (type) {
            case 1:
              current1 = j;

              break;
            case 2:
              current2 = j
          }
          await sleep(500/(10 * timeout));
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




