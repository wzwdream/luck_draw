<!--
 * @Description: 用户兑换充值界面
-->

<template>
    <div class="userinfo-wrap">
        <div class="info-wrap">
            <div class="info-slider-box">
                <div class="info-slider-item on">
                    个人中心
                </div>
                <img src="../../../assets/images/back2.png" class="back2" alt="" @click="exchangeBack">
            </div>
            <div class="info-slider-content">
                <div class="user-form-box">
                    <div class="user-form-label">账&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</div>
                    <div class="user-form-input">
                        <p class="form-input">{{ userInfo.account }}</p>
                    </div>
                </div>
                <div class="user-form-box">
                    <div class="user-form-label">昵&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称</div>
                    <div class="user-form-input">
                        <input id="user-name" v-show="handleUserName" v-model="userInfo.userName" type="text" class="form-input" @blur="inputBlur">
                        <p v-show="!handleUserName" class="form-input">{{ userInfo.userName }}</p>
                        <img v-show="!handleUserName" src="../../../assets/images/handle.png" alt="" @click="handleUserNameClick">
                    </div>
                </div>
                <div class="user-form-box">
                    <div class="user-form-label">电话号码</div>
                    <div class="user-form-input">
                        <input id="user-phone" v-show="handlePhone" v-model="userInfo.phone" type="text" class="form-input" maxlength="11" @blur="inputBlur">
                        <p v-show="!handlePhone" class="form-input">{{ userInfo.phone }}</p>
                        <img v-show="!handlePhone" src="../../../assets/images/handle.png" alt="" @click="handlePhoneClick">
                    </div>
                </div>
                <div class="user-form-box">
                    <div class="user-form-label">魔豆数量</div>
                    <div class="user-form-input">
                        <p class="form-input">{{ userInfo.magicBeanNum }}</p>
                    </div>
                </div>
                <div class="user-form-box">
                    <div class="user-form-label">豆荚数量</div>
                    <div class="user-form-input">
                        <p class="form-input">{{ userInfo.podsNum }}</p>
                    </div>
                </div>
                <div class="pay-box">
                    <div class="pay-item">
                        <input v-model="rechargeCode" type="text" class="input" placeholder="输入充值码">
                        <div class="pay-btn" @click="recharge">充值</div>
                    </div>
                    <div class="pay-item">
                        <input v-model="exchangeNum" type="text" class="input" placeholder="请输入豆荚数量">
                        <div class="pay-btn" @click="exchange">兑换</div>
                    </div>
                    <div class="pay-item">
                        <input v-model="donateNum" type="text" class="input" placeholder="请输入捐赠数量">
                        <div class="pay-btn" @click="donate">捐赠</div>
                    </div>
                    <div class="pay-item" @click="showWinList = !showWinList">
                        <p class="link">捐赠记录</p>
                    </div>
                </div>
            </div>
        </div>
        <Popup v-show="showWinList" @closeList="showWinList = !showWinList" />
    </div>
</template>

<script>
    import Popup from './Popup.vue'
    export default {
        name: 'Exchange',
        components: {
            Popup
        },
        data() {
            return {
                // 用户信息
                userInfo: {
                    // 账户
                    account: '123ww',
                    // 昵称
                    userName: '123',
                    // 电话号码
                    phone: '',
                    // 魔豆数量
                    magicBeanNum: 0,
                    // 豆荚数量
                    podsNum: '0.0'
                },
                // 编辑电话号码
                handlePhone: false,
                // 编辑用户昵称
                handleUserName: false,
                // 充值码
                rechargeCode: '',
                // 兑换豆荚数量
                exchangeNum: '',
                // 捐献数量
                donateNum: '',
                // 打开捐赠记录
                showWinList: false
            }
        },
        methods: {
            // 返回按钮
            exchangeBack() {
                this.$emit('exchangeBack')
            },
            // 编辑用户名
            handleUserNameClick() {
                this.handleUserName = !this.handleUserName
                this.handleUserName && this.$nextTick(() => { document.getElementById('user-name').focus() })
            },
            // 编辑电话号码
            handlePhoneClick() {
                this.handlePhone = !this.handlePhone
                this.handlePhone && this.$nextTick(() => { document.getElementById('user-phone').focus() })
            },
            // 文本框失焦
            inputBlur() {
                this.handlePhone && (this.handlePhone = false)
                this.handleUserName && (this.handleUserName = false)
            },
            // 捐赠
            donate() {
                this.$emit('donate', this.donateNum)
            },
            // 兑换
            exchange() {
                this.$emit('exchange', this.exchangeNum)
            },
            // 充值
            recharge() {
                this.$emit('recharge', this.rechargeCode)
            }
        }
    }
</script>

<style>
.userinfo-wrap {
    width: 292px;
    height: 318px;
    margin-top: 40%;
    background: url('../../../assets/images/user-bg1.png');
    background-size: 100% 100%;
    padding: 0 10px;
}
.info-slider-box, .info-wrap {
    width: 100%;
    position: relative;
}
.info-wrap {
    height: 100%;
    display: flex;
    flex-direction: column;
    transform: translateY(-8px);
}
.info-slider-box {
    height: 20px;
    flex: 0 1 20px;
    padding: 0 20px;
}
.info-slider-box, .info-wrap {
    width: 100%;
    position: relative;
}
.info-slider-item.on {
    background: url('../../../assets/images/user-on.png');
    background-size: 100% 100%;
}
.info-slider-item {
    width: 80px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    color: #fff;
}
.back2 {
    position: absolute;
    right: -15px;
    top: 0;
    width: 20px;
    height: 20px;
}
.info-slider-content {
    width: 100%;
    flex: 1;
    display: flex;
    flex-direction: column;
    background: url('../../../assets/images/box-bg.png');
    background-size: 100% 100%;
    padding: 15px 5px;
}
.user-form-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background: url('../../../assets/images/border.png');
    background-size: 100% 100%;
    margin-top: 5px;
    padding-right: 35px;
    border-top: 1px solid rgba(0,0,0,.1);
    border-bottom: 1px solid rgba(0,0,0,.1);
}
.user-form-label {
    font-size: 12px;
    color: #fff;
    margin-right: 5px;
    flex: 1;
    text-align: right;
}
.user-form-input {
    width: 148px;
    height: 20px;
    background-color: #1a6c7d;
    background-size: 100% 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.user-form-input p {
    line-height: 20px;
    font-size: 12px;
}
.user-form-input img {
    flex: 0 1 15px;
    width: 15px;
    height: 15px;
    margin-left: 10px;
}
.form-input {
    width: 118px;
    background-color: transparent;
    border: none;
    padding: 0 10px;
    line-height: 0;
    color: #fff;
    font-size: 12px;
    height: 100%;
}
.pay-box, .pay-item {
    display: flex;
    align-items: center;
}
.pay-box {
    flex: 1;
    flex-direction: column;
    justify-content: center;
}
.pay-item {
    flex-direction: row;
    margin-top: 10px;
}
.pay-box, .pay-item {
    display: flex;
    align-items: center;
}
.pay-box .input {
    width: 138px;
    background-color: #1e565f;
    border: none;
    padding: 0 10px;
    line-height: 25px;
    color: #fff;
    font-size: 12px;
    height: 25px;
    border-radius: 5px;
}
input {
    box-sizing: border-box;
}
button, input, textarea {
    color: inherit;
    font: inherit;
}
.pay-btn {
    width: 71px;
    height: 22px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: url('../../../assets/images/btn-bg2.png');
    background-size: 100% 110%;
    font-size: 12px;
    margin-left: 10px;
}
.pay-item .link {
    text-decoration: underline;
    font-size: 12px;
    color: #fff;
    opacity: .7;
}
</style>