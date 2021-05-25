const xlsx = require('node-xlsx').default;
const fs = require('fs');
const configs = require('config/base.config');
// 生成xlsx文件
const outXlsx = (fileName, data) => {
    var buffer = xlsx.build([{ name: "mySheetName", data }]);
    fs.writeFileSync(`${configs.xlsxOutPutPath}${fileName}.xlsx`, buffer, 'binary');
    console.log(`保存文件 ${fileName}.xlsx 成功!`)
}


// 写入文件

const writeFile = (content, path, cb) => {
    return new Promise((resolve, reject) => {
        const data = new Uint8Array(Buffer.from(content));
        fs.writeFile(path, data, (err) => {
            if (err) throw err;
            console.log(path + ' 文件已被保存');
            resolve()
        });
    })
}

// 载入文件

const readFileSync = (path) => {
    return new Promise((resolve, reject) => {
        const hasCookieFile = existsSync(path)
        if (hasCookieFile) {
            const getCookieFile = fs.readFileSync(path);
            const buf = Buffer.from(getCookieFile);
            const result = buf.toString();
            // 判断如果存在cookie文件但是内容为空
            result ? resolve(result) : resolve('')
        } else {
            console.log('获取本地cookie失败');
            console.log('找不到 ' + path + ' 文件');
            resolve('')
        }
    })
}

// 判断文件是否存在

const existsSync = (path) => {
    return fs.existsSync(path)
}

module.exports = { outXlsx, writeFile, readFileSync, existsSync }