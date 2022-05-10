<template>
    <div class="win-list">
        <div class="win-content">
            <div class="win-head">
                <span>捐赠记录</span>
                <img src="../../../assets/images/close.png" alt="" @click="closeList">
            </div>
            <div class="win-center">
                <div v-if="type === 'win'" class="table-head">
                    <div class="table-date">捐赠时间</div>
                    <div class="table-num">捐赠数量</div>
                </div>
                <div v-else class="table-head">
                    <div class="table-date">开奖时间</div>
                    <div class="table-name">武器名称</div>
                    <div class="table-num">获胜数量</div>
                </div>
                <img src="../../../assets/images/xian11.png" class="table-splice" alt="">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    class="table-content"
                    @load="onLoad"
                >
                    <div v-if = "type === 'win'">
                        <div v-for="item in list" :key="item.date" class="table-head">
                            <div class="table-date">{{ item.date }}</div>
                            <div class="table-num">{{ item.donateNum }}</div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="table-head">
                            <div class="table-date">{{ item.date }}</div>
                            <div class="table-name">{{ item.goodName }}</div>
                            <div class="table-num">{{ item.donateNum }}</div>
                    </div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        nae: 'Popup',
        props: {
            // 弹窗类型-win-捐赠记录-lucky-获奖历史记录
            type: {
                type: String,
                default: 'win'
            }
        },
        data() {
            return {
                // 表格数据
                list: [],
                // 加载loading效果
                loading: false,
                // 列表加载是否完成标识
                finished: false,
            }
        },
        created() {
            this.onLoad()
        },
        methods: {
            // 列表加载事件
            onLoad() {
                // 异步更新数据
                // setTimeout 仅做示例，真实场景中一般为 ajax 请求
                setTimeout(() => {
                    this.$nextTick(() => {
                        for (let i = 0; i < 10; i++) {
                            this.type === 'win' ? this.list.push({date: '19:0' + i, donateNum: i}) : this.list.push({date: '19:0' + i, goodName: '大锤', donateNum: i})
                        }
    
                        // 加载状态结束
                        this.loading = false;
    
                        // 数据全部加载完成
                        this.finished = true;
                    })
                }, 1000);
            },
            // 关闭弹窗列表
            closeList() {
                this.$emit('closeList')
            }
        }
    }
</script>

<style>
.win-content, .win-list {
    display: flex;
    align-items: center;
}
.win-list {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 99;
    background: rgba(0,0,0,.7);
    justify-content: center;
}
.win-content {
    width: 280px;
    height: 330px;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8px;
    overflow: hidden;
}
.win-content, .win-list {
    display: flex;
    align-items: center;
}
.win-head {
    width: 100%;
    height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    background-color: #353c73;
}
.win-head span {
    font-size: 12px;
    color: #fff;
}
.win-head img {
    width: 15px;
    height: 15px;
}
.win-center {
    flex: 1;
    width: 100%;
    font-size: 0;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}
.table-head {
    width: 100%;
    height: 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
}
.table-date, .table-name, .table-num {
    flex: 1;
    line-height: 25px;
    text-align: center;
    font-size: 12px;
    white-space: nowrap;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
}
.table-date {
    flex: 1.5;
}
.table-splice {
    width: 100%;
}
.table-content {
    flex: 1;
    overflow-y: scroll;
}
.van-cell__title, .van-cell__value {
    text-align: center !important;
}
</style>