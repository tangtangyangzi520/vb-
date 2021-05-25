const BaseRequset = require('./BaseRequset');
module.exports =  class SearchApi extends BaseRequset {
    postSearch(data) {
        return super.requset({ url: 'account/search', method: 'POST', data })
    }
}