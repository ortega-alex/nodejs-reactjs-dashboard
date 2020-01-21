export function encryptPassword(pass) {
    var sum = 0;
    for (let i = 0; i < pass.length; i++) {
        sum += pass.charCodeAt(i);
    }
    return sum;
}

export function ordenarArrDesc(arr, name) {
    arr.sort(function (a, b) {
        if (a[name] < b[name]) {
            return 1;
        }
        if (a[name] > b[name]) {
            return -1;
        }
        return 0;
    });
}

export function ordenarArrAcs(arr, name) {
    arr.sort(function (a, b) {
        if (a[name] > b[name]) {
            return 1;
        }
        if (a[name] < b[name]) {
            return -1;
        }
        return 0;
    });
}

export function cleanUrlYouTube(url){
    var arr = url.split('=');
    console(arr);
}