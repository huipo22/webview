let dCreateTime = value => {
    var date = new Date(parseInt(value + '000'));
    var Y = date.getFullYear() + "-";
    var M =
        (date.getMonth() + 1 < 10
            ? "0" + (date.getMonth() + 1)
            : date.getMonth() + 1) + "-";
    var D = date.getDate() + " ";
    // var h = date.getHours() + ":";
    // var m = date.getMinutes() + ":";
    // var s = date.getSeconds();
    // var df = Y + M + D + h + m + s;
    var df = Y + M + D;
    return df;
}
export default {
    dCreateTime
}