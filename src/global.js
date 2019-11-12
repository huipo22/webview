const host = "https://gh.jishanhengrui.com";
const imgAddress = "https://gh.jishanhengrui.com/upload/";
const ContentType = "application/x-www-form-urlencoded"
const deviceType = "android";
const token = "2e5f7137db69c5228c8d088ea7772174623c21c839bf26cd30f364ae6c8e4088"
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