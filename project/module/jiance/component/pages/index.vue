<template>
  <div>
    <router-view class="router-view"></router-view>
    <tabbar slot="bottom">
      <tabbar-item :link="{path:'/'}" :selected="route.path === '/'">
        <img slot="icon" src="../../../../assets/images/ic_tab_status_normal.png">
        <img slot="icon-active" src="../../../../assets/images/ic_tab_status_active.png">
        <span slot="label">UI</span>
      </tabbar-item>
      <tabbar-item :link="{path:'/business'}" :selected="route.path === '/business'">
        <img slot="icon" src="../../../../assets/images/ic_tab_subject_normal.png">
        <img slot="icon-active" src="../../../../assets/images/ic_tab_subject_active.png">
        <span slot="label">业务</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>
<script>
  import { Tabbar, TabbarItem } from 'vux/src/components/tabbar'
  import TransferDom from 'vux/src/directives/transfer-dom'
  import { mapState, mapActions } from 'vuex'

  export default {
    directives: {
      TransferDom
    },
    components: {
      Tabbar,
      TabbarItem
    },
    mounted () {
      console.log(this.router)
    },
    computed: {
      ...mapState({
        route: state => state.route,
        path: state => state.route.path,
      })
    }
  }
</script>
