'use strict';

const path = require("path");

const configs = {
    baseUrl: 'https://api.prime.date/', // api前缀
    cookieOutPutFileName: 'temp/cookie.txt', // cookie输出文件名
    xlsxOutPutPath: 'build/', // xlsx输出文件名
    resolve: {
        "@": path.join(__dirname, "../src"),
        "app": path.join(__dirname, "../src/outputs"),
        "outputs": path.join(__dirname, "../src/outputs"),
        "api": path.join(__dirname, "../src/api"),
        'config': path.join(__dirname, "../config"),
        'utils': path.join(__dirname, "../src/utils"),
    },
}
module.exports = configs