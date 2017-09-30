<template>
  <div class="commonStyle">
    <m-header title="盈峰环境app" :bg="true">
      <!--<a href="javascript:;"-->
         <!--slot="left"><img class="m-icon-img" src="../assets/images/ic_bar_back_white.png"/>返回</a>-->
      <!--<a href="javascript:;" slot="right">分享</a>-->
    </m-header>
    <div class="first">
      <p>我的首页</p>
    </div>
  </div>
</template>
<script>
  import mHeader from '../widget/header'

  export default {
    name: 'mine',
    components: {
      mHeader
    }
  }
</script>

<style scoped>
  .first {
    height: 500px;
    width: 100%;
    background: blue;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center
  }
  .commonStyle{
    margin: 0px;
  }
</style>
