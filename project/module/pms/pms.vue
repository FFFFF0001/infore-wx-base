<template>
  <div id="app">
    <loading v-model="isLoading"></loading>
    <router-view></router-view>
  </div>
</template>

<script>
  import Loading from 'vux/src/components/loading/index.vue'
  import { mapState } from 'vuex'

  export default {
    name: 'pms',
    components: {
      Loading
    },
    computed: {
      ...mapState({
        isLoading: state => state.loading.isLoading
      })
    }
  }
</script>

<style>
  #app {
    color: #2c3e50;
  }
</style>
