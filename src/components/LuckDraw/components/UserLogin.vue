<!--
 * @Description: 用户登录/注册界面
-->
<template>
    <div class="login-content">
        <div class="login-content-head">
            <div class="login-slider-item" :class="showLogin ? 'on' : 'no'" @click="showLogin = true">登录</div>
            <div class="login-slider-item" :class="!showLogin ? 'on' : 'no'" @click="showLogin = false">注册</div>
            <img src="../../../assets/images/loginbck.png" class="back" alt="" @click="closeLogin">
        </div>
        <div class="login-box">
            <!-- 登录页面 -->
            <div v-show="showLogin" class="login-form">
                <div class="form-item">
                    <div class="form-item-left">账户名</div>
                    <div class="form-item-right">
                        <input v-model="loginForm.userName" type="text" class="input" placeholder="2-8位">
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-left">密码</div>
                    <div class="form-item-right">
                        <input  v-model="loginForm.password" type="password" class="input" placeholder="2-8位">
                    </div>
                </div>
            </div>
            <!-- 注册页面 -->
            <div v-show="!showLogin" class="login-form">
                <div class="form-item">
                    <div class="form-item-left">账户名</div>
                    <div class="form-item-right">
                        <input v-model="registForm.userName" type="text" class="input" placeholder="2-8位">
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-left">昵称</div>
                    <div class="form-item-right">
                        <input  v-model="registForm.nickname" type="text" class="input" placeholder="2-8位">
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-left">密码</div>
                    <div class="form-item-right">
                        <input v-model="registForm.password" type="password" class="input" placeholder="2-8位">
                    </div>
                </div>
                <div class="form-item">
                    <div class="form-item-left">确认密码</div>
                    <div class="form-item-right">
                        <input v-model="registForm.passwordNext" type="password" class="input" placeholder="2-8位">
                    </div>
                </div>

            </div>
            <img src="../../../assets/images/xian.png" style="width: 100%;" alt="">
            <div class="login-btn-box">
                <div v-show="showLogin" class="login-btn" @click="login">登录</div>
                <div v-show="!showLogin" class="login-btn">注册</div>
            </div>
        </div>
    </div>
</template>

<script>
    import { setUserInfo } from '../../../api/user'
    export default {
        name: 'UserLogin',
        data() {
            return {
                showLogin: true,
                loginForm: {
                    userName: '',
                    password: ''
                },
                registForm: {
                    userName: '',
                    nickname: '',
                    password: '',
                    passwordNext: ''
                }
            }
        },
        methods: {
            // 关闭登录/注册页面
            closeLogin() {
                this.$emit('closeLogin')
            },
            // 登录
            login() {
                if (this.loginForm.userName === '') return this.$toast('请输入账户名')
                if (this.loginForm.password === '') return this.$toast('请输入密码')
                setUserInfo(this.loginForm)
                this.closeLogin()
            },
            // 注册
            regist() {
                if (this.registForm.userName === '') return this.$toast('请输入2-8位账户名')
                if (this.loginForm.nickname === '') return this.$toast('请输入2-8位昵称')
                if (this.loginForm.password === '') return this.$toast('请输入2-8位密码')
                if (this.loginForm.passwordNext === '') return this.$toast('请输入2-8位确认密码')
                if (this.loginForm.passwordNext !== this.registForm.password) return this.$toast('两次输入的密码不一致')
                setUserInfo(this.registForm)
                this.closeLogin()
            }
        }
    }
</script>

<style>
.login-content {
    margin-top: 43%;
    width: 220px;
    height: 250px;
    border: 2px solid rgba(75,191,130,.5);
    border-radius: 8px;
    overflow: hidden;
}
.login-content, .wrapper-box {
    display: flex;
    flex-direction: column;
}
.login-content-head {
    width: 100%;
    height: 30px;
    background-color: #353c73;
    border-radius: 8px 8px 0 0;
    border-bottom: 2px solid rgba(75,191,130,.5);
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    position: relative;
}
.login-slider-item {
    width: 80px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #fff;
}
.login-slider-item.on {
    background: url('../../../assets/images/user-on.png');
    background-size: 100% 100%;
}
.login-slider-item.no {
    background: url('../../../assets/images/btn-bg.png');
    background-size: 100% 100%;
}
.login-content-head .back {
    width: 20px;
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
}
.login-box {
    flex: 1;
    background: url('../../../assets/images/loginbg.png');
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
}
.login-btn, .login-form {
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-form {
    flex: 1;
    width: 100%;
    flex-direction: column;
}
.form-item {
    width: 180px;
    height: 25px;
    background: url('../../../assets/images/btn-login.png');
    background-size: 100% 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 10px;
    overflow: hidden;
}
.form-item-left {
    flex: 0 1 4em;
    font-size: 12px;
    color: #fff;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
.form-item-right {
    flex: 1;
    height: 25px;
    background-color: #fff;
    border-radius: 8px;
}
.form-item-right .input {
    width: 100%;
    border-radius: 8px;
    border: none;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    padding: 0 10px;
    box-sizing: border-box;
    color: #333;
}
.login-btn-box {
    flex: 0 1 55px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
.login-btn {
    width: 80px;
    height: 25px;
    background: url('../../../assets/images/login-button.png');
    background-size: 100% 100%;
    font-size: 12px;
    color: #0a1b0d;
}
</style>