<template>
    <div class="singer">
        <div class="left">
            index
        </div>
        <div class="right">
            <p v-for="item in numList">{{item.name}}</p>
        </div>
    </div>
</template>

<script type='text/ecmascipt-6'>
import { getSingerList } from 'api/singer'
import { ERR_OK } from 'api/config'
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
        _getSingerList() {
            getSingerList().then((res) => {
                console.log(res)
                if( res.data.code === ERR_OK ) {
                    this.singer = res.data.singerList.data.singerlist
                    this.numList = res.data.singerList.data.tags.index
                }
            })
        }
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
    padding-right:10%;
    .left{
        width:90%;
        display: inline-block;
        background :red;
    }
    .right{
        width:10%;
        height:100%;
        overflow-y :auto;
        margin-right:-10%;
        display:inline-block;
        p{
            text-align :center;
            font-size :$font-size-small-s;
            padding:5px 0;
        }
    }
}
</style>