const host = "https://gh.jishanhengrui.com";
const imgAddress = "https://gh.jishanhengrui.com/upload/";
const ContentType = "application/x-www-form-urlencoded"
const deviceType = "android";
const token = "e1db3b8577be483c476ee9932551c21f00d1a1b32becb95513284eed1e5d8387"
const dataURLtoFile = (dataurl, filename) => {
    //将base64转换为文件
    var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, {
        type: mime
    });
}

export default {
    host,//域名
    ContentType,//请求头contenttype
    deviceType,//请求头device_type
    imgAddress,
    token,
    dataURLtoFile,
}