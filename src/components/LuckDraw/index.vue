<!--
 * @Description: 抽奖组件
-->
<template>
    <div class="container">
        <div class="wrapper" :class="showExchange || isLogin ? 'wrapper-box' : ''">
            <!-- 公告栏组件 -->
            <MessageBar :message="message" @playRulesClick="playRulesClick" />
            <!-- 抽奖界面 -->
            <!-- 用户信息组件 -->
            <UserInfo v-if="!showExchange && !isLogin" @openLogin="openLogin" />
            <!-- 九宫格组件 -->
            <GridBox v-show="!showExchange && !isLogin" @login="openLogin" />
            <!-- 用户兑换充值界面 -->
            <Exchange v-show="!isLogin && showExchange" @donate="donate" @exchange="exchange" @recharge="recharge" @exchangeBack="exchangeBack" />
            <!-- 用户登录注册界面 -->
            <UserLogin v-show="isLogin && !showExchange" @closeLogin="exchangeBack" />
        </div>
        <!-- 玩法介绍弹窗 -->
        <PlayIntroduce v-if="showPlayIntroduce" @playIntroduceClose="playIntroduceClose" />
    </div>
</template>
<script>
    import MessageBar from './components/MessageBar.vue'
    import PlayIntroduce from './components/PlayIntroduce.vue'
    import UserInfo from './components/UserInfo.vue'
    import GridBox from './components/GridBox.vue'
    import Exchange from './components/Exchange.vue'
    import UserLogin from './components/UserLogin.vue'
    export default {
        name: 'LuckDraw',
        components: {
            MessageBar,
            PlayIntroduce,
            UserInfo,
            GridBox,
            Exchange,
            UserLogin
        },
        data() {
            return {
                // 公告内容
                message: ['欢迎加入豆荚大家庭', '请先注册在参加游戏哦'],
                // 显示玩法介绍弹窗？
                showPlayIntroduce: false,
                // 显示用户信息界面
                showExchange: false,
                // 是否已经登录
                isLogin: false
            }
        },
        methods: {
            // 打开玩法介绍
            playRulesClick() {
                this.showPlayIntroduce = true
            },
            // 关闭玩法介绍
            playIntroduceClose() {
                this.showPlayIntroduce = false
            },
            // 打开登录/注册页面或用户兑换充值界面
            openLogin() {
                if(!localStorage.getItem('userInfo')) return this.isLogin = true
                this.showExchange = true
            },
            // 捐赠
            donate(event) {
                console.log('捐赠', event)
            },
            // 兑换
            exchange(event) {
                console.log('兑换', event)
            },
            // 充值
            recharge(event) {
                console.log('充值', event)
            },
            // 打开登录/注册页面或用户兑换充值界面
            exchangeBack() {
                this.showExchange = false
                this.isLogin = false
            }
        }
    }
</script>
<style scoped>
/* 页面大小 */
.container {
    width: 375px;
    height: 667px;
    transform: scale(1.07);
    background: url('../../assets/images/bg1.jpeg');
    background-size: 100% 100%;
}
.wrapper {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
}
.login-content, .wrapper-box {
    display: flex;
    flex-direction: column;
}
.wrapper-box {
    align-items: center;
    background-color: transparent!important;
}
</style>