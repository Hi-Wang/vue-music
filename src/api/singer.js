import jsonp from 'common/js/jsonp'
import axios from 'axios'
import { commonParams, options } from './config'

export function getSingerList(index) {
    const url = '/api/getSingerList'

    const item = {
        "comm": {'ct': 24, 'cv': 10000},
        "singerList": {'module': 'Music.SingerListServer', 'method': 'get_singer_list', 'param': {'area': -100,'sex': -100,'genre': -100, 'index': index, 'sin': 0, 'cur_page': 1}}
    }
    const data = Object.assign({}, commonParams, {
        channel: 'singer',
        page: 'list',
        key: 'all_all_all',
        pagesize: 100,
        pagenum: 1,
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq'
    })
    console.log(data)
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res)
    })
}

export function getSingerDetail(singerId) {
    const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

    console.log(singerId)
    const data = Object.assign({}, commonParams, {
        hostUin: 0,
        needNewCode: 0,
        platform: 'yqq',
        order: 'listen',
        num: 100,
        begin: 0,
        songstatus: 1,
        singermid: singerId,
        g_tk: 1664029744
    })

    return jsonp(url, data, options)
}