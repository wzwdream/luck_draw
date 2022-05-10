<!--
 * @Description: 九宫格
-->
<template>
    <div class="grid-box">
        <!-- 头部 -->
        <div class="head-box">
            <p class="title">
                <span>选择</span>
            </p>
            <div class="time-box">
                <p class="time-title">
                    <span>倒计时</span>
                </p>
                <p class="time">
                    <span>{{ countDownTime }}</span>
                </p>
            </div>
        </div>
        <!-- 九宫格 -->
        <div class="content-box">
            <div class="grid">
                <div v-for="item in goods" :key="item.id" :ref="'good' + item.id" class="grid-item" :class="{ 'checked' : checkedArr.findIndex(elem=> elem.id === item.id) > -1}" @click="checkedGood(item.id)">
                    <img v-show="drawPrize && item.id === prizeId" class="luck-bg" src="../../../assets/images/animate.png" alt="">
                    <img class="img" :src="item.src" :title="item.title" alt="">
                    <div v-show="checkedArr.findIndex(elem=> elem.id === item.id) > -1" class="checked-true">
                        <img src="../../../assets/images/dui.png" alt="">
                    </div>
                </div>
            </div>
            <!-- 分割线 -->
            <div class="splice"></div>
            <!-- 选择种豆 -->
            <div class="action-box">
                <div class="action-left">
                    <div class="action-left-item">
                        <p class="item-title">
                            <span>我的魔豆</span>
                        </p>
                        <p class="item-input">
                            <input :value="toalNum" type="text" disabled class="input">
                            <span class="unit">
                                <span>颗</span>
                            </span>
                        </p>
                    </div>
                    <div class="action-left-item">
                        <p class="item-title">
                            <span>数量选择</span>
                        </p>
                        <div class="item-input">
                            <input v-model="selectNum" @input="selectNum = selectNum.replace(/[^\d]/g,'')" type="text" class="input">
                            <div class="select-box" @click="showSelect = !showSelect">
                                <img src="../../../assets/images/sj.png" alt="">
                            </div>
                            <div v-show="showSelect" class="list-modal">
                                <p v-for="(item, index) in num" :key="index" class="modal-item" @click="numSeleced(item)">{{ item }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="action-btn" @click="submit">
                    <img src="../../../assets/images/submit-btn.png" alt="">
                </div>
            </div>
        </div>
        <!-- 可以选择几个 -->
        <div class="slide-box">
            <div v-for="slide in sliderArr" :key="slide.id" class="slide-btn" :class="selectedSlide === slide.id ? 'on' : 'no'" @click="selectSlider(slide.id)">
                <p>
                    {{ slide.label }}
                    <span>{{ `(×${slide.magnification})` }}</span>
                </p>
            </div>
        </div>
        <!-- 底部历史记录 -->
        <div class="bottom-box" :class="isHistory ? '' : 'on'">
            <div class="bottom-slider-box">
                <p class="title">
                    <span>历史记录</span>
                </p>
                <div class="bottom-slider-item" :class="isHistory ? 's' : ''" @click="isHistory = true">
                    <span>豆荚历史</span>
                </div>
                <div class="bottom-slider-item" :class="!isHistory ? 's' : ''" @click="isHistory = false">
                    <span>本轮种豆</span>
                </div>
            </div>
            <div v-show="isHistory" class="bottom-content">
                <div class="left-list">
                    <div v-for="(his, index) in historyArr" :key="index" class="list-item">
                        <div class="left">
                            <span class="date">{{ his.date }}</span>
                            <span class="name">{{ his.goodsName }}</span>
                        </div>
                        <div class="right">
                            <span class="date">豆荚王</span>
                            <span class="name">{{ his.userName }}</span>
                        </div>
                    </div>
                </div>
                <div class="last-box">
                    <img src="../../../assets/images/5.png" class="last-img" alt="">
                    <img src="../../../assets/images/last-bg.png" class="last" alt="">
                    <p class="last-name">
                        <span>七七冲鸭~</span>
                    </p>
                </div>
            </div>
            <div v-show="!isHistory" class="bottom-content b">
                <p v-if="stakeNow === 0" class="list-t">本轮没有铸造~</p>
                <div v-else>
                    <div class="check-goods">
                        <span>{{ sliderArr[selectedSlide - 1].label }}</span>
                        <span class="goods-item">{{ nowGoood }}</span>
                        <span class="goods-item">{{ stakeNow }}</span>
                        <span>颗魔豆,发芽可获得</span>
                        <span class="goods-item">{{ (stakeNow * sliderArr[selectedSlide - 1].magnification).toFixed(2) }}</span>
                        <span>豆荚</span>
                    </div>
                </div>
            </div>
        </div>
        <transition name="van-fade">
            <div v-show="showWinModel" class="modal">                
                <div class="modal-content">
                    <div class="modal-head">
                        <img :src="luckGood" alt="" class="head-icon">
                        <img src="../../../assets/images/modal-head.png" alt="" class="head-bg">
                        <img src="../../../assets/images/close.png" class="head-close" alt="" @click="winModelClose">
                    </div>
                    <img src="../../../assets/images/xian.png" alt="" class="modal-splice">
                    <div class="record-content">
                        <div class="record-head">
                            <div class="record-head-item">排名</div>
                            <div class="record-head-item">昵称</div>
                            <div class="record-head-item">赢豆荚数</div>
                        </div>
                        <img src="../../../assets/images/xian.png" class="record-head-splice" alt="">
                        <div v-for="item in winningRanking" :key="item.ranking" class="record-list">
                            <div class="record-list-item">
                                <img v-if="item.ranking === '1'" src="../../../assets/images/win1.png" alt="">
                                <img v-else-if="item.ranking === '2'" src="../../../assets/images/win2.png" alt="">
                                <img v-else-if="item.ranking === '3'" src="../../../assets/images/win3.png" alt="">
                                <span v-else>{{ item.ranking }}</span>
                            </div>
                            <div class="record-list-item">{{ item.userName }}</div>
                            <div class="record-list-item num">{{ item.winningNum }}</div>
                        </div>
                        <img src="../../../assets/images/xian.png" class="record-head-splice" alt="">
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import { Toast } from 'vant';
    import 'vant/lib/toast/style'
    export default {
        name: 'GridBox',
        data() {
            return {
                // 当前选中
                checkedArr: [
                    {
                        id: '1',
                        src: require('../../../assets/images/1.png'),
                        title: '激光棒'
                    }
                ],
                // 九宫格物品
                goods: [
                    {
                        id: '1',
                        src: require('../../../assets/images/1.png'),
                        title: '激光棒'
                    },
                    {
                        id: '2',
                        src: require('../../../assets/images/2.png'),
                        title: '大刀'
                    },
                    {
                        id: '3',
                        src: require('../../../assets/images/3.png'),
                        title: '加特林'
                    },
                    {
                        id: '4',
                        src: require('../../../assets/images/4.png'),
                        title: '冲锋枪'
                    },
                    {
                        id: '5',
                        src: require('../../../assets/images/5.png'),
                        title: '电锯'
                    },
                    {
                        id: '6',
                        src: require('../../../assets/images/6.png'),
                        title: '扳手'
                    },
                    {
                        id: '7',
                        src: require('../../../assets/images/7.png'),
                        title: '锤子'
                    },
                    {
                        id: '8',
                        src: require('../../../assets/images/8.png'),
                        title: '左轮'
                    },
                    {
                        id: '9',
                        src: require('../../../assets/images/9.png'),
                        title: '大炮'
                    }
                ],
                // 我的魔豆
                toalNum: 100,
                // 数量选择
                num: [1,10,30,66,188,520,999,1314],
                // 显示数量选择
                showSelect: false,
                // 数量选择的值
                selectNum: 1,
                // 最多选择个数选择
                sliderArr: [
                    {
                        id: 1,
                        label: '单个',
                        magnification: '8.2',
                        num: 1
                    },
                    {
                        id: 2,
                        label: '任意2个',
                        magnification: '4.1',
                        num: 2
                    },
                    {
                        id: 3,
                        label: '任意4个',
                        magnification: '2',
                        num: 4
                    }
                ],
                // 最多可选多少
                checkedNum: 1,
                // 当前选中的最多选择个数id
                selectedSlide: 1,
                // 历史记录/本轮种豆
                isHistory: true,
                // 历史记录信息
                historyArr: [
                    {
                        date: '19:07',
                        goodsName: '锤子',
                        userName: '无人猜中'
                    },
                    {
                        date: '19:04',
                        goodsName: '大刀',
                        userName: '哈哈哈'
                    },
                    {
                        date: '19:01',
                        goodsName: '冲锋枪',
                        userName: '我是谁'
                    },
                    {
                        date: '18:58',
                        goodsName: '激光棒',
                        userName: '123'
                    },
                    {
                        date: '18:55',
                        goodsName: '锤子',
                        userName: '无人猜中'
                    },
                    {
                        date: '18:52',
                        goodsName: '锤子',
                        userName: '无人猜中'
                    },
                    {
                        date: '18:49',
                        goodsName: '锤子',
                        userName: '无人猜中'
                    },
                    {
                        date: '18:46',
                        goodsName: '锤子',
                        userName: '无人猜中'
                    },
                    {
                        date: '18:43',
                        goodsName: '锤子',
                        userName: '无人猜中'
                    },
                    {
                        date: '18:40',
                        goodsName: '锤子',
                        userName: '无人猜中'
                    },
                    {
                        date: '18:37',
                        goodsName: '锤子',
                        userName: '无人猜中'
                    }
                ],
                // 本轮中奖id，配置谁就是谁中奖
                prizeId: '6',
                // 本轮种豆
                stakeNow: 0,
                // 开奖
                drawPrize: false,
                // 倒计时开始的时间，/s
                timeStart: 10,
                // 获胜排名信息
                winningRanking: [
                    {
                        ranking: '1',
                        userName: '韩云溪',
                        winningNum: '345'
                    },
                    {
                        ranking: '2',
                        userName: '无',
                        winningNum: '0'
                    },
                    {
                        ranking: '3',
                        userName: '无',
                        winningNum: '0'
                    },
                    {
                        ranking: '4',
                        userName: '无',
                        winningNum: '0'
                    },
                    {
                        ranking: '5',
                        userName: '无',
                        winningNum: '0'
                    }
                ],
                // 显示获胜排名
                showWinModel: false,
                // 本轮是否已经种豆
                isCofim: false
            }
        },
        computed: {
            // 倒计时
            countDownTime() {
                if(this.timeStart < 0) return '00:00'
                const minute = Math.floor(this.timeStart / 60)
                const second = this.timeStart % 60
                return `${minute > 9 ? minute : '0' + minute}:${second > 9 ? second : '0' + second}`
            },
            // 本轮中奖物品
            luckGood() {
                return require(`../../../assets/images/${this.prizeId}.png`)
            },
            // 本轮种豆
            nowGoood() {
                let check = ''
                this.checkedArr.map(item => {
                    check += item.title + '、'
                })
                return check.slice(0, -1)
            }
        },
        mounted() {
            this.countDown()
        },
        methods: {
            // 物品选中
            checkedGood(id) {
                if(this.isCofim) return
                // 查找选中值中是否有当前点击的值
                const index = this.checkedArr.findIndex(item => item.id === id)
                // 如果选中值跟最多选择值相同，说明当前不能在选择其它的
                // 如果选中值的数量跟最大选择不相同，则可以添加其它的
                if (this.checkedNum === this.checkedArr.length) {
                    // 如果选中值中有则删除
                    index > -1 && this.checkedArr.splice(index, 1)
                } else {
                    // 如果选中值中有则删除，没有则添加
                    index > -1 ? this.checkedArr.splice(index, 1) : this.checkedArr.push(this.goods[id - 1])
                }
            },
            // 数量选中
            numSeleced(num) {
                this.selectNum = num
                this.showSelect = false
            },
            // 确认种豆事件
            submit() {
                // 如果没有登录则打开登录页面
                if(!localStorage.getItem('userInfo')) return this.$emit('login')
                if(this.isCofim) return Toast('本轮已经种豆')
                if(this.checkedArr.length === 0) return Toast('请选择武器')
                if(this.checkedArr.length !== this.checkedNum && this.checkedNum === 2) return Toast('请选择任意两个武器')
                if(this.checkedArr.length !== this.checkedNum && this.checkedNum === 4) return Toast('请选择任意四个武器')
                if (this.toalNum < this.selectNum) return Toast('你的魔豆不足')
                this.stakeNow = this.selectNum
                this.toalNum -= this.stakeNow
                this.isCofim = true
            },
            // 选择最多种豆几个
            selectSlider(id) {
                if(this.isCofim) return
                this.selectedSlide = id
                this.checkedNum = this.sliderArr[this.sliderArr.findIndex(item => item.id === id)].num
                this.checkedArr = []
            },
            // 抽奖函数
            luckDraw() {
                // 开始抽奖的起始位置
                let startLuck = 1
                // 抽奖的圈数
                let count = 0
                // 一共要转多少圈，id > 4 2圈，id < 4 3圈
                let circleNum = this.prizeId > 4 ? 2 : 3
                let timer = setInterval(() => {
                    startLuck ++
                    // 如果id大于9则从头开始，并且圈数+1
                    if (startLuck > 9) {
                        startLuck = 1
                        count ++
                    }
                    // 当前转动到的物品
                    const newRefIndex = 'good'+startLuck
                    // 上一个物品
                    const oldRefIndex = 'good'+(startLuck === 1 ? 9 : startLuck-1)
                    // 如果圈数跟需要转动的总圈数相同并且转到本轮中奖的位置则停止转动
                    if (count === circleNum && startLuck === Number(this.prizeId)) {
                        this.drawPrize = true
                        clearInterval(timer)
                        timer = null
                        // 显示获胜排名
                        this.showWinModel = true
                        // 去不转动红色边框
                        this.$refs[newRefIndex][0].style = 'border: 1px solid #12fab0;'
                        // 3s后关闭弹窗
                        let timer1 = setTimeout(() => {
                            this.init()
                            clearTimeout(timer1)
                            timer1 = null
                        }, 3000)
                    }
                    // 上一个物品去除红色边框
                    this.$refs[oldRefIndex][0].style = this.$refs[oldRefIndex][0].className.indexOf('checked') > -1 ? '' : 'border: 1px solid #12fab0;'
                    // 当前物品添加红色边框
                    this.$refs[newRefIndex][0].style = this.$refs[newRefIndex][0].className.indexOf('checked') > -1 ? '' : 'border-color: #fa5912;'
                }, 200)
            },
            // 倒计时函数
            countDown() {
                let timer = setInterval(() => {
                    this.timeStart --
                    if (this.timeStart === 0) {
                        this.timeStart = 0
                        this.luckDraw()
                        clearInterval(timer)
                        timer = null
                    }
                }, 1000)
            },
            // 关闭获胜排名弹窗
            winModelClose() {
                this.init()
            },
            // 初始化
            init() {
                // 当前选中
                this.checkedArr = [
                    {
                        id: '1',
                        src: require('../../../assets/images/1.png'),
                        title: '激光棒'
                    }
                ],
                // 数量选择的值
                this.selectNum = 1,
                // 最多可选多少
                this.checkedNum = 1,
                // 当前选中的最多选择个数id
                this.selectedSlide = 1,
                // 历史记录/本轮种豆
                this.isHistory = true,
                // 本轮种豆
                this.stakeNow = 0,
                // 开奖
                this.drawPrize = false,
                // 倒计时开始的时间，/s
                this.timeStart = 10,
                // 显示获胜排名
                this.showWinModel = false
                // 本轮是否已经种豆
                this.isCofim = false
                // 启动倒计时
                this.countDown()
            }
        }
    }
</script>

<style>
.grid-box {
    position: relative;
    padding: 0 40px;
}
.head-box, .head-box .title {
    flex-direction: row;
    align-items: center;
}
.head-box {
    width: 100%;
    height: 20px;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
}
.head-box .title {
    width: 62px;
    height: 15px;
    text-align: center;
    color: #fff;
    background: url('../../../assets/images/head-title.png');
    background-size: 100% 100%;
    display: inline-flex;
    padding-left: 15px;
}
.head-box .title span {
    font-size: 10px;
    padding-left: 3px;
    transform: translateY(-3px);
    display: inline-flex;
    color: #decf2e;
}
.time, .time-box, .time-title {
    display: flex;
    align-items: center;
}
.time-box {
    background: url('../../../assets/images/djs.png');
    background-size: 100% 100%;
    width: 77px;
    height: 20px;
    flex-direction: row;
}
.time-title span {
    transform: scale(.9);
    color: #fff;
}
.time-title span, .time span {
    display: inline-flex;
    opacity: .8;
    font-size: 10px;
    justify-content: center;
}
.time span {
    transform: scale(.9) translateY(1px);
    color: #a9320c;
    font-weight: 700;
}
.time, .time-title {
    flex: 1;
    flex-direction: row;
    justify-content: center;
}
.content-box {
    width: 295px;
    height: 295px;
    margin-top: 2px;
    background: url('../../../assets/images/content-bg.png');
    background-repeat: no-repeat;
    background-size: 101% 296px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    border: 2px solid #ccfeba;
}
.grid, .grid-item {
    flex-direction: row;
}
.grid {
    margin-top: 10px;
    width: 220px;
    display: flex;
    flex-wrap: wrap;
}
.grid-item.checked {
    border-color: #fa5912;
}
.grid-item {
    width: 60px;
    height: 55px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: url('../../../assets/images/e.png');
    background-size: 100% 100%;
    margin-right: 20px;
    margin-bottom: 15px;
    border: 1px solid #12fab0;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
}
.grid-item:nth-child(3n) {
    margin-right: 0;
}
.grid-item .img {
    width: 100%;
    height: 100%;
    transform: scale(.9);
    image-rendering: auto;
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
    position: absolute;
    z-index: 3;
}
.luck-bg {
    position: absolute;
    width: 70px;
    height: 70px;
    -webkit-animation: rotate 3s linear infinite;
    animation: rotate 3s linear infinite;
}
@keyframes rotate {
    0%{
        transform: rotateZ(0deg);
    }
    100%{
        transform: rotateZ(360deg);
    }
}
.checked-true {
    width: 15px;
    height: 15px;
    background: url('../../../assets/images/bg.png');
    background-size: 100% 100%;
    position: absolute;
    bottom: 0;
    right: 0;
    z-index: 4;
    display: flex;
    align-items: center;
    justify-content: center;
}
.checked-true img {
    width: 11px;
    height: 11px;
}
.splice {
    width: 244px;
    height: 1px;
    background: url('../../../assets/images/xian.png');
    background-size: 100% 100%;
}
.action-box {
    width: 230px;
    height: 50px;
    margin-top: 10px;
    padding-left: 5px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.action-left {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}
.action-left-item {
    width: 140px;
    height: 20px;
    background: url('../../../assets/images/bg2.png');
    background-size: 100% 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.action-left-item .item-title {
    flex: 0 1 4em;
    text-align: center;
    font-size: 14px;
}
.action-left-item .item-title span {
    transform: scale(.9);
    display: inline-flex;
    font-size: 10px;
    color: #fff;
}
.item-input {
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 100%;
    background-color: #fff;
    border-radius: 5px;
    position: relative;
}
.item-input .input {
    flex: 1;
    height: 20px;
    line-height: 22px;
    width: 50px;
    text-align: center;
    border: none;
    font-size: 12px;
    color: #c9514f;
    -webkit-user-select: text!important;
    -moz-user-select: text!important;
    -ms-user-select: text!important;
    user-select: text!important;
}
input:disabled {
    background-color: #fff;
    opacity: 1;
}
.item-input .unit {
    flex: 0 1 1.5em;
    font-size: 12px;
}
.item-input .unit span {
    transform: scale(.9);
    display: inline-flex;
}
.select-box {
    background: url('../../../assets/images/select-btn.png');
    background-size: 100% 100%;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
}
.select-box img {
    width: 13px;
    height: 9px;
}
.list-modal {
    position: absolute;
    top: 20px;
    width: 80px;
    height: auto;
    background-color: #fff;
    z-index: 99999;
    transform: translate(0);
}
.modal-item {
    height: 25px;
    width: 100%;
    text-align: center;
    line-height: 25px;
    font-size: 12px;
}
.modal-item:hover {
    background-color: rgba(75,75,75,.1);
}
.action-btn, .action-btn img {
    width: 73px;
    height: 42px;
}
.action-btn img {
    image-rendering: auto;
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
}
@media screen and (min-width: 400px) {
    .slide-btn.on {
        transform: translateY(-1px);
    }
}
.slide-box {
    width: 295px;
    height: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    padding-right: 5px;
}
.slide-btn.on {
    background: url('../../../assets/images/slider-on.png');
    background-size: 100% 100%;
    margin-top: 0;
    transform: translateY(-2px);
}
.slide-btn {
    width: 82px;
    height: 26px;
    text-align: center;
    line-height: 25px;
    background: url('../../../assets/images/slider.png');
    background-size: 100% 100%;
    margin-top: -4px;
}
.slide-btn.no {
    border-top: 2px solid #ccfeba;
}
.slide-btn p {
    font-size: 10px;
    color: #fff;
    transform: scale(.95);
    display: inline-flex;
    justify-content: center;
}
.slide-btn p span {
    color: #e9f515;
}
.bottom-box {
    border-style: solid;
    border-image-source: url('../../../assets/images/bottom-bg.png');
    border-image-slice: 50 10 10 10;
    border-width: 3px;
    border-top-width: 25px;
    position: relative;
    border-radius: 5px;
}
.bottom-box.on {
    border-image-source: url('../../../assets/images/button-bg1.png')
}
.bottom-box, .btn3 {
    width: 295px;
    height: 110px;
    margin-top: 35px;
}
.bottom-slider-box {
    width: 100%;
    height: 25px;
    display: flex;
    justify-content: flex-end;
    top: -27px;
}

.bottom-slider-box .title {
    left: 0;
    width: auto;
    height: 15px;
    text-align: center;
    color: #decf2e;
    background: url('../../../assets/images/head-title.png');
    background-size: 100% 100%;
    display: inline-flex;
    padding-left: 15px;
    font-size: 10px;
}
.bottom-slider-box, .bottom-slider-box .title {
    flex-direction: row;
    align-items: center;
    position: absolute;
}
.bottom-slider-box .title span {
    margin-top: -5px;
}
.bottom-slider-item {
    width: 80px;
    height: 25px;
    text-align: center;
    line-height: 25px;
}
.bottom-slider-item span {
    font-size: 12px;
    color: #fff;
}
.bottom-slider-item.s {
    background: url('../../../assets/images/btn-bg.png');
    background-size: 100% 100%;
}
.bottom-content {
    width: 290px;
    height: 83px;
    background: url('../../../assets/images/bg5.png');
    display: inline-flex;
    flex-direction: row;
    padding: 5px;
}
.left-list {
    width: 170px;
    height: 75px;
    padding-right: 5px;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
}
.list-item {
    width: 100%;
    height: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-size: 10px;
    color: #fff;
    margin-bottom: 2px;
}
.list-item .left {
    flex: 0 1 45%;
}
.list-item span {
    transform: scale(.9);
    transform-origin: left;
}
.list-item .name {
    color: #e9f515;
    margin-left: 1px;
    font-size: 10px;
}
.list-item .date {
    font-size: 10px;
}
.bottom-content ::-webkit-scrollbar {
    width: 2px;
}
.bottom-content ::-webkit-scrollbar-thumb {
    border-radius: 2px;
    overflow: hidden;
    background: url('../../../assets/images/bar.png');
    background-size: 100% 100%;
}
.bottom-content ::-webkit-scrollbar-track {
    background: #002b36;
}
.last-box {
    flex: 1;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
}
.last-img {
    position: absolute;
    top: 5px;
    left: 40px;
    width: 38px;
    image-rendering: auto;
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
}
.last {
    width: 100px;
    height: auto;
    image-rendering: auto;
    image-rendering: crisp-edges;
    -ms-interpolation-mode: nearest-neighbor;
    image-rendering: -moz-crisp-edges;
    image-rendering: pixelated;
    margin-left: 8px;
}
.last-name {
    position: absolute;
    bottom: 3px;
    width: 100%;
    padding-left: 10px;
    text-align: center;
    font-size: 10px;
    color: #e9f515;
}
.last-name span {
    display: inline-flex;
    transform: scale(.9);
}
.list-t {
    padding: 5px;
    font-size: 12px;
    color: #fff;
}
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
    padding-top: 52%;
}
.van-fade-enter-active {
    -webkit-animation: van-fade-in .3s ease-out both;
    animation: van-fade-in .3s ease-out both;
}
.modal-content {
    width: 218px;
    height: 218px;
    background: url('../../../assets/images/model-bg.png');
    background-size: 100% 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.modal-head {
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: center;
    transform: translateY(-20px);
    position: relative;
}
.modal-head .head-bg {
    width: 150px;
}
.head-icon {
    position: absolute;
    top: 2px;
    width: 40px;
}
.modal-head .head-close {
    width: 17px;
    height: auto;
    position: absolute;
    right: 5px;
    top: 25px;
}
.modal-splice {
    width: 96%;
    transform: translateY(-5px);
}
.record-content {
    flex: 1;
    width: 100%;
    padding: 0 5px 12px;
    font-size: 0;
}
.record-head {
    height: 15px;
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 3px;
}
.record-head-item {
    flex: 1;
    text-align: center;
    font-size: 10px;
}
.record-head-splice {
    width: 100%;
}
.record-list {
    flex: 1;
    width: 100%;
    display: flex;
    flex-direction: row;
}
.record-list-item.num {
    color: #b0545f;
}
.record-list-item {
    flex: 1;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-size: 10px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.record-list-item img {
    width: 27px;
}
.record-list-item span {
    font-weight: 700;
    color: #846a47;
    font-size: 14px;
}
.check-goods {
    font-size: 10px;
    color: #fff;
}
.goods-item {
    color: #e9f515;
    margin: 0 2px;
}
</style>