// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import global_ from './config/Global'
Vue.prototype.GLOBAL = global_
Vue.config.productionTip = false
Vue.prototype.Host = '/api'
Vue.prototype._PAGESIZE_ = 10

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
