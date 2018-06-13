<template>
<div ref="wrapper">
    <slot></slot>
</div>
</template>

<script type="text/script">
import BScroll from 'better-scroll'
export default {
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true  //class needsclick 可解决click点击冲突的问题
        },
        data: {
            type: Array,
            default: null
        },
        listenScroll: { //判断scroll是否监听滚动位置
            type: Boolean,
            default: false
        }
    },
    mounted() {
        setTimeout( () => {
            this._initScroll()
        }, 20)
    },
    methods: {
        _initScroll() {
            if(!this.$refs.wrapper) {
                return
            }
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            })
            if(this.listenScroll) {  //监听滚动事件
                let me = this
                this.scroll.on('scroll', (pos) => {
                    me.$emit('scroll', pos)
                })
            }
        },
        enable() {
            this.scroll && this.scroll.enable()
        },
        disable() {
            this.scroll && this.scroll.disable()
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        scrollTo() {
            this.scroll && this,scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    },
    watch: {
        data() {
            setTimeout(() => {
                this.refresh()
            }, 20)
        }
    }
}
</script>

<style scoped lang="stylus" rel='stylesheet/stylus'>

</style>

