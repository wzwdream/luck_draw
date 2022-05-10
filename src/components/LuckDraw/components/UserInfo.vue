<!--
 * @Description: 用户信息界面
-->
<template>
    <div class="userinfo-box">
        <div class="avatar-box">
            <img src="../../../assets/images/tx.png" alt="" @click="openLogin">
        </div>
        <div class="user-info">
            <p class="user-item">
                <span>公会：{{ guild }}个</span>
            </p>
            <p class="user-item">
                <span>豆荚：{{ total }}个</span>
            </p>
            <div class="login-btn" @click="openLogin">
                <span v-if="!userName">登录/注册</span>
                <span v-else>{{ userName }}</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'UserInfo',
        data() {
            return {
                // 总豆荚数
                total: '0.0',
                // 公会名称
                guild: '我爱豆荚',
                // 
                userName: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).userName : ''
            }
        },
        computed: {
            // userName() {
            //     return localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')).userName : ''
            // }
        },
        methods: {
            openLogin() {
                this.$emit('openLogin')
            }
        }
    }
</script>

<style>
.avatar-box, .userinfo-box {
    height: 55px;
    display: flex;
    align-items: center;
}
.userinfo-box {
    width: 100%;
    margin-top: 25px;
    padding: 0 40px;
    flex-direction: row;
}
.avatar-box {
    width: 55px;
    background: url('../../../assets/images/tx-bg.png');
    background-size: 100% 100%;
    justify-content: center;
    overflow: hidden;
}
.avatar-box img {
    width: 38px;
    height: auto;
}
.user-info, .user-info .user-item {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.user-info {
    height: 20px;
    background-color: hsla(0,0%,100%,.08);
    border-style: solid;
    -o-border-image: url('../../../assets/images/h.png');
    border-image: url('../../../assets/images/h.png');
    border-image-slice: 10 10 10 10;
    border-width: 5px;
    transform: translateY(-3px) translateX(-4px);
    position: relative;
}
.user-info .user-item {
    font-size: 10px;
    color: #fff;
    opacity: .7;
}
.user-info .login-btn {
    position: absolute;
    background: url('../../../assets/images/h1.png');
    background-size: 100% 100%;
    top: 14px;
    left: -10px;
    width: 76px;
    height: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    cursor: pointer;
    font-size: 12px;
}
.user-info .login-btn span {
    font-size: 12px;
    transform: scale(.9);
    opacity: .7;
}
</style>
