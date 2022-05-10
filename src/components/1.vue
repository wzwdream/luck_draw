<!-- 公告栏组件 -->
<template>
    <div class="notice-bar" @click="tipClick">
        <div ref="wrap" class="notice-bar__wrap">
        <div ref="content" class="notice-bar__content" :style="contentStyle">{{ text }}</div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NoticeBar',
    props: {
        text: {
        type: String,
        default: ''
        },
        speed: {
        type: Number,
        default: 50
        },
        defaultWidth: {
        type: Number,
        default: 375
        }
    },
    data () {
        return {
            contentStyle: {
                transitionDuration: '0s',
                transform: 'translateX(0px)'
            },
            wrapWidth: 0,
            contentWidth: 0,
            time: 0,
            timer: null,
            convertSpeed: 1
        }
    },
    created () {},
    mounted () {
        if (this.text) {
            this.init()
        }
    },
    watch: {
        text () {
            this.init()
        }
    },
    methods: {
        init () {
            const _width = window.innerWidth
            this.convertSpeed = _width / this.defaultWidth * this.speed  // 根据分辨率转化成不同的速度
            this.wrapWidth = this.$refs.wrap.offsetWidth
            this.contentWidth = this.$refs.content.offsetWidth
            this.startAnimate()
            this.timer = setInterval(() => {
                this.startAnimate()
            }, this.time * 1000)
            this.$once('hook:beforeDestroy', () => {
                clearInterval(this.timer)
                this.timer = null
            })
        },
        startAnimate () {
            this.contentStyle.transitionDuration = '0s'
            this.contentStyle.transform = 'translateX(' + this.wrapWidth + 'px)'
            this.time = (this.wrapWidth + this.contentWidth) / this.convertSpeed
            setTimeout(() => {
                this.contentStyle.transitionDuration = this.time + 's'
                this.contentStyle.transform = 'translateX(-' + this.contentWidth + 'px)'
            }, 200)
        },
        tipClick () {
            this.$emit('click')
        }
    }
}
</script>
<style scoped>
    .notice-bar {
        position: relative;
        width: 100%;
        height: 20px;
        padding-left: 0;
        padding-right: 0;
        font-size: 10px;
        color: #868DAA;
        display: flex;
        align-items: center;
    }
    .notice-bar__wrap {
    position: relative;
    display: flex;
    flex: 1;
    height: 100%;
    align-items: center;
    overflow: hidden;
    }
    .notice-bar__content {
        position: absolute;
        white-space: nowrap;
        transition-timing-function: linear;
    }
</style>
