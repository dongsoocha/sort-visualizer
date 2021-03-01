function mergeSort(arr) {
    console.log(arr)
    if (arr.length <= 1) return arr;
    const midIdx = arr.length / 2;

    const left = arr.slice(0, midIdx);
    const right = arr.slice(midIdx);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right) {
    let sorted = [];
    while (left.length && right.length) {
        if (left[0] < right[0]) {
            sorted.push(left.shift());
        } else {
            sorted.push(right.shift());
        }
    }
    return sorted.concat(left, right);
}