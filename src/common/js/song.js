export default class Song {
    constructor({id, mid, singer, name, album, duration, image, url}) {
        this.id = id
        this.mid = mid
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
        this.name = name
        this.singer = singer
    }
}

export function createSong(musicData) {
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
        // http://dl.stream.qqmusic.qq.com/C400003OUlho2HcRHC.m4a
    })
}

// 对歌手数据做处理
function filterSinger(singer) {
    let ret = []
    if(!singer) {
        return ''
    }
    singer.forEach((s) => {
        ret.push(s.name)
    });
    return ret.join('/')
}