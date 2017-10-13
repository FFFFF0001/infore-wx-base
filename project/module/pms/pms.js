import Vue from 'vue'
import App from './pms.vue'
import router from '../../router/pms'
/**
 * 额外配置
 */
import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import store from '../../store'
import 'normalize.css'
import '../../assets/css/main.css' // main css
import 'vux/src/styles/1px.less' // 边框
import ToastPlugin from 'vux/src/plugins/toast' // Toast
import WechatPlugin from 'vux/src/plugins/wechat' //wechat
import 'vux/src/styles/close.less' // 叉号
const FastClick = require('fastclick') // 防重复点击
FastClick.attach(document.body)

Vue.use(Vuex)
Vue.use(ToastPlugin)
Vue.use(WechatPlugin)

sync(store, router)

router.beforeEach(function (to, from, next) {
  store.commit('updateLoadingStatus', {isLoading: true})
  next()
})

router.afterEach(function (to) {
  store.commit('updateLoadingStatus', {isLoading: false})
})

new Vue({
  store,
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
