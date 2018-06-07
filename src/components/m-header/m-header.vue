<template>
    <div class="m-header">
        <div class="icon"></div>
        <h1 class="text">Hi, Music</h1>
    </div>
</template>

<script type='text/ecmascript-6'>
export default {

}
</script>

<style scoped lang='stylus' rel='stylesheet/stylus'>
    @import '~common/stylus/variable'
    @import '~common/stylus/mixin'
    .m-header{
        position: relative;
        top:0;
        height:44px;
        text-align: center;
        color:$color-theme;
        font-size 0;
        .icon{
            display: inline-block;
            vertical-align: top;
            width:20px;
            height 32px;
            margin-right:20px;
            bg-image('logo');
            background-repeat no-repeat;
            background-size : 100%;
            background-position center 10px;

        }
        .text{
            display: inline-block;
            vertical-align: top;
            line-height :44px;
            font-size $font-size-large;
        }
        .mine{
            position :absolute;
            top:0;
            right:0;
            .icon-mine{
                display: block;
                padding:12px;
                font-size: 20px;
                color:$color-theme;
            }
        }
    }

</style>
