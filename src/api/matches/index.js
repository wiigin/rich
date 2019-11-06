import api from '../index'
import urls from './urls'

const header = {}

export default {
    init(params) {
        // return出去了一个promise
        return api.get(urls.init, params, header)
    },
    game(params) {
        // return出去了一个promise
        return api.get(urls.game, params, header)
    },
    apiprize(params){
        // return出去了一个promise
        return api.get(urls.apiprize, params, header)
    },
    checkMyPrize(params){
        // return出去了一个promise
        return api.get(urls.checkMyPrize, params, header)
    }
}
