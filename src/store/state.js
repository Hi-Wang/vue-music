// 管理状态的文件
import { playMode } from 'common/js/config'
const state = {
    singer: {},                //歌手
    playing: false,            //暂停播放
    fullScreen: false,         //是否全屏
    playlist: [],              //播放列表
    sequenceList: [],          //顺序列表
    mode: playMode.sequence,   //播放模式
    currentIndex: -1           //当前播放
}

export default state