<template>
    <scroll @scroll="scroll"
           :listen-scroll="listenScroll"
           :prob-type="probeType"
           :data="singer" 
           class="listview"
           ref="listview">
        <ul>
            <li v-for="group in singer" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li class="list-group-item" v-for="item in group.items" @click="selectItem(item)">
                        <img class="avatar" v-lazy="item.image">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" 
             @touchstart='onShortcutTouchStart' 
             @touchmove.stop.prevent='onShortcutTouchMove'>
            <ul>
                <li v-for="(item, index) in shortcutList" class="item" :class="{'current': currentIndex === index}" :data-index="index">{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">
            <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
        <div v-show="!singer.length" class="loading-container">
            <loading></loading>
        </div>
    </scroll>
</template>

<script type='text/ecmascipt-6'>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import Singer from 'common/js/singer'

import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
import { addClass, getData } from 'common/js/dom'

const HOT_NAME = '热门'
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
let map = {
    title: HOT_NAME,
    items: []
}

export default {
    props: {  //vue会监听props data components
        singer: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            scrollY: -1,
            currentIndex: 0,
            diff: ''
        }
    },
    created() {
        this.touch = {}
        this.listenScroll = true
        this.listHeight = []
        this.probeType = 3
    },
    methods: {
       selectItem(item) {  //点击派发事件
           this.$emit('select', item)
       },    
       onShortcutTouchStart(e) {
           let anchorIndex = getData(e.target, 'index')
           let firstTouch = e.touches[0]
           this.touch.y1 = firstTouch.pageY
           this.touch.anchorIndex = anchorIndex
           this._scrollTo(anchorIndex)
       },
       onShortcutTouchMove(e) {
           let firstTouch = e.touches[0]
           this.touch.y2 = firstTouch.pageY
           let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0  //记录move的位置偏移
           let anchorIndex = parseInt(this.touch.anchorIndex) + delta
           this._scrollTo(anchorIndex)
       },
       scroll(pos) {
           this.scrollY = pos.y
       },
       _scrollTo(index) {
           if(!index && index !== 0){
               return
           }
        //    处理index的边界情况
          if ( index < 0 ) {
              index = 0
          }else if( index > this.listHeight.length - 2 ) {
              index = this.listHeight.length - 2
          }
           this.scrollY = - this.listHeight[index]
           this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
       },
       _calculateHeight() {  //计算每个group的高度
           this.listHeight = []
           const list = this.$refs.listGroup
           let height = 0
           this.listHeight.push(height)
           for( let i=0; i<list.length; i++ ) {
               let item = list[i]
               height += item.clientHeight
               this.listHeight.push(height)
           }
       }
    },
    watch: {
        singer() {
            setTimeout(() => {
                this._calculateHeight()
            }, 20)
        },
        scrollY(newY) {
            const listHeight = this.listHeight
            //  但滚动到顶部 newy》0
            if(newY > 0){
                this.currentIndex = 0
                return
            }
            // 在中间部分滚动
            for( let i=0; i<listHeight.length - 1; i++ ) {
                let height1 = listHeight[i]
                let height2 = listHeight[i+1]
                if( -newY >= height1 && -newY < height2 ){
                    this.currentIndex = i
                    this.diff = height2 + newY
                    return
                }
            }
            // 当滚动到底部 并且.newY大于最后一个元素上限
            this.currentIndex = listHeight.length - 2
        },
        diff(newVal) {
            let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
            if(this.fixedTop === fixedTop) {
                return
            }
            this.fixedTop = fixedTop
            //  修改DOM 
            this.$refs.fixed.style.transform = "translate3d(0, " + fixedTop +"px, 0)"
        }
    },
    computed: {  //计算属性
        shortcutList() {
            return this.singer.map( (group) => {
                return group.title.substr(0, 1)
            })
        },
        fixedTitle() {
            if(this.scrollY > 0) {
                return ''
            }
            return this.singer[this.currentIndex] ? this.singer[this.currentIndex].title : ''
        }
    },
    components: {
        Scroll,
        Loading
    }  
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import '~common/stylus/variable'

    .listview{
        position: relative;
        width:100%;
        height:100%;
        overflow :hidden;
        background :$color-background;
        .list-group{
            padding-bottom: 30px;
            .list-group-title{
                height:30px;
                line-height:30px;
                padding-left:20px;
                font-size:$fomt-size-small;
                color:$color-text-l;
                background :$color-highlight-background;
            }
            .list-group-item{
                display :flex;
                align-items: center;
                padding:20px 0 0 30px;
                .avatar{
                    width:50px;
                    height:50px;
                    border-radius:50%;
                }
                .name{
                    margin-left:20px;
                    color:$color-size-medium;
                }
            }

        }
        .list-shortcut{
            position:absolute;
            z-index :300;
            right:0;
            top:50%;
            transform :translateY(-50%);
            width:20px;
            padding:20px 0;
            border-radius :10px;
            text-align:center;
            background :$color-background-d;
            font-family: Helvetica;
            .item{
                padding:3px;
                line-height:1;
                color:$color-text-l;
                font-size:$font-size-small;
                &.current{
                    color:$color-theme;
                }
            }
        }
        .list-fixed{
            position: absolute;
            top:0;
            left:0;
            width:100%;
            .fixed-title{
                height:30px;
                line-height:30px;
                padding-left:20px;
                font-size:$font-size-small;
                color:$color-text-l;
                background : $color-highlight-background;
            }
        }
        .loading-container{
            position:absolute;
            width:100%;
            top:50%;
            transform translateY(-50%);
        }
        .numList{
            position :absolute;
            right:6px;
            top:0;
            z-index :1000;
            padding:4% 0;
            li{
                text-align: center;
                padding:3px 0;
                font-size: $font-size-small;
                font-weight: 100;
            }
            .active{
                color:$color-theme;
            }
        }
    }
</style>