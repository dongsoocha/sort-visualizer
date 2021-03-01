function partition(arr, start, end) {
    // last element as pivot
    const pivot = arr[end];
    let pivotIdx = start;
    for (let i = start; i < end; i++) {
        if (arr[i] < pivot) {
            // swap elements
            [arr[i], arr[pivotIdx]] = [arr[pivotIdx], arr[i]];
            // move to next ele
            pivotIdx++;
        }
    }

    // pivot value in middle
    [arr[pivotIdx], arr[end]] = [arr[end], arr[pivotIdx]];
    return pivotIdx;
}

function quickSort(arr, start = 0, end = arr.length - 1) {
    if (start >= end) {
        return;
    }

    let idx = partition(arr, start, end);

    quickSort(arr, start, idx - 1);
    quickSort(arr, idx + 1, end);
    return arr;
}