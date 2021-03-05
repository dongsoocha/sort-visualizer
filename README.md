![Demo](https://github.com/Chubbibanana/sort-visualizer/blob/main/assets/demosort.gif)

[Go to live site!](https://chubbibanana.github.io/sort-visualizer/)

## Instructions

This project was built to demonstrate a few common sorting algorithms dynamically using bar graphs. Experiment with different algorithms on varying array sizes by changing the size in the top bar, generating a new array, selecting your sorting method of choice, and clicking the green 'Play' button. In addition, select different colors to visualize the sorting in your favorite colors! Before running a new sort, ensure that it is stopped by pressing the red button.

## Project details

The only library used was d3.js to generate the bar graphs. Otherwise, this application was built purely in Javascript, HTML5, and CSS.

## Technical Challenges

### Async JS
There were a few challenges getting the graph to render upon every iteration of the algorithm. By creating a sleep function, and utilizing async-await, afixing the sleep length to the user input, the draw is then able to render  upon the sleep, allowing for a smooth and consistent realtime display of the drawn arrays. 

The sleep function was taken from Dan Dascalescu at [Stack Overflow](https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep), and called within the sort function.
``` 
async function bubble(arr, type) {
  // sort-speed is the user input speed
    let timeout = document.getElementById("sort-speed").value

    ...
    for (let i = 0; i < arr.length - 1 - counter; i++) {
      ...
      await sleep(500/(10 * timeout));
    }
  counter++;
}
```



### Different color selections for different sorts

Another challenge was adding colors to the array without mixing them up. This was acheieved using 2 separate versions of variables, and a case-switch statement within each sort to determine the right variable to store the index position in.

```
async function partition(arr, start, end, type) {
  let timeout = document.getElementById("sort-speed").value;
  // last element as pivot
  const pivot = arr[end];
  let pivotIdx = start;
  // set current to end so it displays pivot
  switch (type) {
      case 1:
        current1 = end;
        break;
      case 2:
        current2 = end;
  }
  
  for (let i = start; i < end; i++) {
    if (!running) return false;
    // push in so graph will display with colors which elements have been parsed
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
  ...
}
```

### Todos

* Algo comparison stats
* Button flicker/warning flicker
* Style buttons to look more '3d'
* Different visual representations
