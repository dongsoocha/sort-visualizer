function selection(arr) {
    // find minimum, put at beginning. reverse bubblesort
    for (let i = 0; i < arr.length - 1; i++) {
        let min = i;

        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        if (min !== i) {
            [arr[i], arr[min]] = [arr[min], arr[i]];
        }
    }
    return arr;
}

var arr = [5, 4, 3, -5, 2, 8, 1, 10];
let sorted = selection(arr);
console.log(sorted);