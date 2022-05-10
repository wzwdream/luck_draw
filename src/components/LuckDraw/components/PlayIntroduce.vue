<!--
 * @Description: 玩法介绍弹窗
-->
<template>
    <div class="modal">
        <div class="modal-wrap">
            <div class="wrap-head">
                <span>玩法规则</span>
                <img src="../../../assets/images/close.png" alt="" @click="playIntroduceClose" >
            </div>
            <div class="wrap-content">
                <div>
                    <div class="tips-title">怎么玩？</div>
                    <div class="tips-content">
                        <p>选择喜欢的帽子种豆即可等待发芽</p>
                        <p>倒计时3分钟结束时若选择的帽子发芽，则可获得对应倍数的豆荚(自动发放到包裹)</p>
                    </div>
                </div>
                <div>
                    <div class="tips-title">豆荚的作用？</div>
                    <div class="tips-content">
                        <p>豆荚不具备分成属性，用户可以使用豆荚捐工会，会长会给予大家相应的奖励！有疑问大家联系客服</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'PlayIntroduce',
        methods: {
            // 关闭玩法介绍
            playIntroduceClose() {
                this.$emit('playIntroduceClose')
            }
        }
    }
</script>

<style>
.modal {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 99;
    background-color: rgba(0,0,0,.5);
    display: flex;
    justify-content: center;
    padding-top: 45%;
}
.modal-wrap, .wrap-head {
    display: flex;
    align-items: center;
}
.modal-wrap {
    height: 240px;
    width: 218px;
    flex-direction: column;
    background-color: #fff;
    border-radius: 5px;
    overflow: hidden;
    border: 2px solid #4bbf82;
}
.wrap-head {
    width: 100%;
    height: 25px;
    background-color: #353c73;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 10px;
}
.wrap-head span {
    font-size: 12px;
    color: #fff;
}
.wrap-head img {
    width: 15px;
    height: 15px;
    cursor: pointer;
}
.wrap-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    padding: 5px;
    flex: 1;
    width: 100%;
}
.tips-title {
    font-size: 12px;
    font-weight: 700;
    color: #393d77;
}
.tips-content {
    font-size: 10px;
    color: #393d77;
    margin-top: 2px;
}
</style>
