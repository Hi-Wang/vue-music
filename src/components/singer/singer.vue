<template>
    <div class="singer">
        <list-view :data="singer"></list-view>
        <!-- <div class="left">
            index
        </div>
        <div class="right">
            <p v-for="(item, index) in numList" v-on:click="numListClick(item)">{{item.name}}</p>
        </div> -->
    </div>
</template>

<script type='text/ecmascipt-6'>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import { addClass } from 'common/js/dom'
import ListView from 'base/listview/listview'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'
export default {
    data() {
        return {
            singer: [],
            numList: []
        }
    },
    created() {
        let index = -100
        this._getSingerList(index)
    },
    methods: {
        _getSingerList(index) {

            getSingerList(index).then((res) => {
                console.log(res)
                if( res.statusText === 'OK' ) {
                    this.singer = res.data.singerList.data.singerlist
                    this.numList = res.data.singerList.data.tags.index
                    this._normalizeSinger(this.singer)
                    // console.log(this.singer)
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
                    map.hot.items.push({
                        id: '1',
                        name: 'zhang',
                        image: ''
                    })
                }

                // const key = 
            });
        },
        // 点击字母
        numListClick(item) {
            let index = item.id
            console.log(index)
        }
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