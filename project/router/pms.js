import Vue from 'vue'
import Router from 'vue-router'
import Login from '../module/pms/component/pages/login/index.vue'
import Home from '../module/pms/component/pages/index.vue'
import UI from '../module/pms/component/pages/ui/index.vue'
import Business from '../module/pms/component/pages/business/index.vue'
import Demo from '../module/pms/component/pages/ui/demo/index.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/',
          name: 'ui',
          component: UI
        }, {
          path: '/business',
          name: 'business',
          component: Business
        },
        {
          path: '/demo',
          name: 'demo',
          component: Demo,
        }
      ]
    }
  ]
})
