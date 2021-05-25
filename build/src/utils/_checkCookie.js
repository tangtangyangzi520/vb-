
//  获取本地cookie
const { readFileSync } = require('utils/tools');
const configs = require('config/base.config');
module.exports = readFileSync(`${configs.cookieOutPutFileName}`)
