<!--
 * input：message 公告内容
 * @Description: 公告栏组件
-->
<template>
    <div class="small-scroll">
        <!-- 左侧图标 -->
        <div class="msg-icon">
            <img src="../../../assets/images/gg.png" alt="">
        </div>
        <!-- 公告滚动 -->
        <div class="scoll">
            <div class="notice-bar" @click="tipClick">
                <div ref="wrap" class="notice-bar__wrap">
                    <div ref="content" class="notice-bar__content" :style="contentStyle">
                        <div v-for="(item ,index) in message" :key="index" :style="`margin-left: ${index !== 0 ? '275px' : '0px'};`">{{ item }}</div>
                    </div>
                </div>
            </div>
        </div>
        <!-- 右侧图标 -->
        <div class="right-msg" @click="playRulesClick">
            <img src="../../../assets/images/gz.png" alt="">
            <span>玩法规则</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MessageBar',
    props: {
        // 公告消息
        message: {
            type: Array,
            default: () => []
        },
        // 滚动速率
        speed: {
            type: Number,
            default: 20
        },

    },
    watch: {
        message () {
            this.init()
        }
    },
    data() {
        return {
            // 公告滚动动画样式
            contentStyle: {
                transitionDuration: '0s',
                transform: 'translateX(0px)'
            },
            wrapWidth: 0,
            contentWidth: 0,
            // 滚动间隔
            time: 0,
            timer: null,
            convertSpeed: 1
        }
    },
    mounted () {
        if (this.message) {
            this.init()
        }
    },
    methods: {
        // 初始化滚动内容
        init () {
            const _width = window.innerWidth
            this.convertSpeed = _width / 375 * this.speed  // 根据分辨率转化成不同的速度
            this.wrapWidth = this.$refs.wrap.offsetWidth
            this.contentWidth = this.$refs.content.offsetWidth * 2
            this.startAnimate()
            this.timer = setInterval(() => {
                this.startAnimate()
            }, this.time * 1000)
            this.$once('hook:beforeDestroy', () => {
                clearInterval(this.timer)
                this.timer = null
            })
        },
        // 动画效果
        startAnimate () {
            this.contentStyle.transitionDuration = '0s'
            this.contentStyle.transform = 'translateX(' + this.wrapWidth + 'px)'
            this.time = (this.wrapWidth + this.contentWidth) / this.convertSpeed
            setTimeout(() => {
                this.contentStyle.transitionDuration = this.time + 's'
                this.contentStyle.transform = 'translateX(-' + this.contentWidth + 'px)'
            }, 200)
        },
        // 公告消息点击事件
        tipClick () {
            this.$emit('click')
        },
        // 玩法规则点击事件
        playRulesClick() {
            this.$emit('playRulesClick')
        }
    }
}
</script>

<style>
.msg-icon, .small-scroll {
    height: 20px;
    display: flex;
    align-items: center;
}
.small-scroll {
    width: 100%;
    overflow: hidden;
    background-color: rgba(0,0,0,.2);
    flex-direction: row;
    justify-content: space-between;
}
.msg-icon img, .right-msg img {
    width: 12px;
    height: 12px;
}
.msg-icon {
    width: 30px;
    justify-content: center;
}
.scoll {
    overflow: hidden;
    flex: 1;
}
.right-msg {
    flex: 0 1 4em;
    height: 20px;
    color: #fff;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
}
.right-msg span {
    font-size: 12px;
    color: #fff;
    opacity: .3;
    transform: scale(.9);
}
.notice-bar {
    position: relative;
    width: 100%;
    height: 20px;
    padding-left: 0;
    padding-right: 0;
    font-size: 10px;
    color: hsla(0,0%,100%,.8);
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
    margin: 0 20px;
    display: flex;
}

</style>