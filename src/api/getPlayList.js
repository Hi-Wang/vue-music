import jsonp from 'common/js/jsonp'
import { getPalyList, getPlayListOptions } from './config'
import axios from 'axios';

export function getPlayList () {
    const url = "/api/getDiscList"
    const data = Object.assign({}, getPalyList, {
        platform: 'yqq',
        sin: 0,
        ein: 29,
        needNewCode: 0
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res)
    })
}