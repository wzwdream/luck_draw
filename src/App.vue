<!--
 * @Description: 主页面
-->
<template>
  <div id="app">
    <!-- 抽奖组件 -->
    <LuckDraw />
  </div>
</template>

<script>
// 抽奖组件
import LuckDraw from './components/LuckDraw/index.vue'

export default {
  name: 'App',
  components: {
    LuckDraw
  }
}
</script>

<style>
* {
    padding: 0;
    margin: 0;
    -webkit-text-size-adjust: 100%;
}
a, div, p {
    box-sizing: border-box;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
html {
    -webkit-tap-highlight-color: transparent;
}
body {
    margin: 0;
    font-family: -apple-system,BlinkMacSystemFont,Helvetica Neue,Helvetica,Segoe UI,Arial,Roboto,PingFang SC,miui,Hiragino Sans GB,Microsoft Yahei,sans-serif;
}
#app {
    font-family: Avenir,Helvetica,Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #fff;
}

/* 媒体查询-响应式布局 */
@media screen and (min-height: 668px) {
  #app, body, html {
      width: 100%;
      height: 100%;
      background-color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
  }
  .container {
    transform: scale(1);
  }
}
@media screen and (min-width: 380px) {
  #app, body, html {
      width: 100%;
      height: 100%;
      background-color: #000;
      display: flex;
      align-items: center;
      justify-content: center;
      transform: scale(1);
  }
}
</style>
