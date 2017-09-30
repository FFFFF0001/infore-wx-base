<template>
  <div id="app">
    <router-view></router-view>
    <m-tabbar v-model="select">
      <m-tabbar-item id='Work' isRouter>
        <img src="../../assets/images/ic_tab_home_normal.png" alt="" slot="icon-normal">
        <img src="../../assets/images/ic_tab_home_active.png" alt="" slot="icon-active">
        工作
      </m-tabbar-item>
      <m-tabbar-item id='MailList' isRouter>
        <img src="../../assets/images/ic_tab_subject_normal.png" alt="" slot="icon-normal">
        <img src="../../assets/images/ic_tab_subject_active.png" alt="" slot="icon-active">
        通讯录
      </m-tabbar-item>
      <m-tabbar-item id='Message' isRouter>
        <img src="../../assets/images/ic_tab_status_normal.png" alt="" slot="icon-normal">
        <img src="../../assets/images/ic_tab_status_active.png" alt="" slot="icon-active">
        消息
      </m-tabbar-item>
      <m-tabbar-item id='Mine' isRouter>
        <img src="../../assets/images/ic_tab_profile_normal.png" alt="" slot="icon-normal">
        <img src="../../assets/images/ic_tab_profile_active.png" alt="" slot="icon-active">
        我的
      </m-tabbar-item>
    </m-tabbar>
  </div>
</template>

<script>
  import mTabbar from '../widget/tabbar'
  import mTabbarItem from '../widget/tabbar-item'
  export default {
    name: 'app',
    components: {
      mTabbar,
      mTabbarItem
    },
    data () {
      return {
        select: 'Work'
      }
    }
  }
</script>

<style>

</style>
