(async function () {
    // 预告片
    require('../../config');

    const _getCookie = await require('utils/_checkCookie');
    global.setCookie = _getCookie && JSON.parse(_getCookie); // 获取本地cookie
    const searchApi = new (require('api/SearchApi.js'));
    const { outXlsx } = require('utils/tools');
    // 正片开始

    function CreateInit() {
        console.log('22222')
        this._saveParamskeys = null;
        this.paramskeys = {
            name: 'Name',
            id: 'Id',
            age: 'Age'
        };

        this.count = 0; // 总数量
        this.listData = null; // 当前接口的列表总数
        this.collectData = []; // 收集全部的列表数据
        this.time = null // 记录下个

        // 列表参数(请求)
        this.searchParams = {
            filters: { ageFrom: null, ageTo: null, countries: [], withPhoto: false, moreChildren: false },
            limit: 50,
            page: 1
        }
        this.random = (lower, upper) => {
            return (Math.floor(Math.random() * (upper - lower)) + lower) * 1000;
        }
        this._calculatedNum = () => {
            const { limit, page } = this.searchParams
            return this.count - limit * page
        }


        // 过滤所需要的数据
        this._setUserData = () => {
            this.listData.map((value) => {
                const result = this._saveParamskeys.map(item => value[item])
                this.collectData.push(result)
            })
        }

        // 开始请求搜索用户的列表
        this._postSearch = async () => {
            this.time = this.random(5, 10)
            console.log(`正在请求第${this.searchParams.page}页user列表数据 下个请求等待时间为${this.time / 1000}秒`);
            const result = await searchApi.postSearch(this._getSearchParam);
            const { count, users } = JSON.parse(result).data
            this.count = count;
            this.listData = users;
            let _residualNum = this._calculatedNum(); // 累加页数和总数量

            // 动态添加数据
            this._setUserData()
            console.log(`成功处理第${this.searchParams.page}页user列表数据,共${this.count}条数量;剩余数量${_residualNum}`);
            this.searchParams.page++;
            if (_residualNum <= 0) {
                this.collectData.unshift(Object.values(this.paramskeys));
                outXlsx('search_users-亚洲', this.collectData);
                return
            } else {
                setTimeout(() => {
                    this._postSearch()
                }, this.time)
            }
        }

    }

    // 获取实例对象
    const getInstance = (function () {
        console.log('1111111')
        let instance = null;
        return function (name) {
            if (!instance) {
                instance = new CreateInit(name);
            }
            return instance;
        }
    })();

    const app = new getInstance();
    app._saveParamskeys = Object.keys(app.paramskeys);
    app._postSearch();

})()