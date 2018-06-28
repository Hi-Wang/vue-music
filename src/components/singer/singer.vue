<template>
    <div class="singer">
        <list-view @select="selectSinger" :singer="singer"></list-view>
        <router-view></router-view>
    </div>
</template>

<script type='text/ecmascipt-6'>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import { addClass } from 'common/js/dom'
import ListView from 'base/listview/listview'
import Singer from 'common/js/singer'
import { mapMutations } from 'vuex'  //对mutation做的封装（语法糖）

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
let map = {
    title: HOT_NAME,
    items: []
}

export default {
    data() {
        return {
            singer: [],
            numList: []
        }
    },
    created() {
        this._getSingerList()
    },
    methods: {
        selectSinger(singer) {  //接收listView的点击事件
            this.$router.push({
                path: '/singer/' + singer.id
            })
            this.setSinger(singer)
        },
        _getSingerList() {
            getSingerList().then((res) => {
                if( res.data.code === ERR_OK ) {
                    let singerlist = res.data.data.list
                    this.singer = this._normalizeSinger(singerlist)
                }else{
                    console.log('歌手列表拉取失败！')
                }
            })
        },
        _normalizeSinger(list) {
            let map = {
                hot: {
                    title: HOT_NAME,
                    items: []
                }
            }
            list.forEach((item, index) => {
                if(index < HOT_SINGER_LEN) {
                    map.hot.items.push(new Singer({
                        id: item.Fsinger_mid,
                        name: item.Fsinger_name
                    }))
                }
                const key = item.Findex
                if(!map[key]) {
                    map[key] = {
                        title: key,
                        items: []
                    }
                }
                map[key].items.push(new Singer({
                    id: item.Fsinger_mid,
                    name: item.Fsinger_name
                }))
            });

             let hot = []
             let ret = []
             for( let key in map ) {
                 let val = map[key]
                 if( val.title.match(/[a-zA-Z]/) ) {
                     ret.push(val)
                 }else if( val.title === HOT_NAME ) {
                     hot.push(val)
                 }
             }
             ret.sort((a ,b) => {
                 return a.title.charCodeAt(0) - b.title.charCodeAt(0)
             })
             return hot.concat(ret)
        },
        ...mapMutations({
            setSinger: 'SET_SINGER'
        })
    },
    components: {
        ListView
    }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';
.singer{
    position: fixed;
    top:88px;
    bottom :0;
    width:100%;
    .left{
        float:left;
        width:90%;
        // height:100%;
        display: inline-block;
        background :red;
    }
    .right{
        float:right;
        width:10%;
        height:100%;
        overflow-y :auto;
        padding:9% 0;
        display:inline-block;
        p{
            text-align :center;
            font-size :10px;
            padding:3px 0;
        }
        .active{
            color:$color-theme;
            border-bottom:2px solid $color-theme;
        }
    }
}
</style>