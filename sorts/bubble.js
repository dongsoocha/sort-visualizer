function bubble(arr){
    let sorted = false;
    while (!sorted) {
        sorted = true;
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i + 1] < arr[i]) {
                // swap
                [arr[i+1], arr[i]] = [arr[i], arr[i+1]];
                sorted = false;
            }
        }
    };
    return arr;

}