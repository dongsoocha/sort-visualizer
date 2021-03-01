function insertion(arr) {
    for (let i = 1; i < arr.length; i++) {
        let j;
        let temp = arr[i]; // will mutate so need to assign to var
        for (j = i - 1; j >= 0 && arr[j] > temp; j--) {
            arr[j + 1] = arr[j];
        }
        arr[j + 1] = temp;
    }

    return arr
}


var arr = [5, 4, 3, -5, 2, 8,1,10];
let sorted = insertion(arr);
console.log(sorted);