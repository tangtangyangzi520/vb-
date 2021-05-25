const request = require('request');
const { writeFile } = require('utils/tools');
const fs = require('fs');
const configs = require('config/base.config.js');
const { USER_LOGIN } = require('config/env.config.js');
module.exports = class BaseRequset {
    // 登录获取Cookie
    _getCookie() {
        return new Promise((resolve, reject) => {
            console.log('cookie已失效,正在重新获取cookie...');
            this.requset({ url: 'auth/login', method: 'POST', data: USER_LOGIN }).then(res => {
                const result = res.headers['set-cookie']
                console.log('获取cookie成功！')
                resolve(result)
            }).catch(err => {
                console.log(err, '获取cookie失败！')
                reject('')
            })
        })
    }
    async  _setCookie(cookie) {
        if (cookie) {
            setCookie = cookie
            const { cookieOutPutFileName } = configs          
            await writeFile(JSON.stringify(cookie), cookieOutPutFileName)
        }
    }

    requset({ url, data, method }) {
        return new Promise((resolve, reject) => {
            request({
                url: configs.baseUrl + url,
                method,
                headers: {
                    Cookie: setCookie,
                    "User-Agent": " Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
                    "content-type": "application/json"
                },
                body: JSON.stringify(data)
            }, async (error, response, body) => {
                if (body && JSON.parse(body).status !== 'error') {                  
                    resolve(setCookie ? body : response)
                    return
                }
                // 跑来这步cookie还是错误证明本地cookie已经过期,需要重新获取。
                if (!setCookie) {
                    const _getCookie = await this._getCookie();
                    await this._setCookie(_getCookie);
                    const result = await this.requset({ url, data, method });
                    resolve(result)
                } else {
                    reject(error)
                }
            })
        })
    }
}