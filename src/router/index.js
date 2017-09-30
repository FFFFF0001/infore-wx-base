import Vue from 'vue'
import Router from 'vue-router'
import Hello from '../components/pages/Login.vue'
import Home from '../components/pages/Home.vue'
import Work from '../components/pages/Work.vue'
import MailList from '../components/pages/MailList.vue'
import Message from '../components/pages/Message.vue'
import Mine from '../components/pages/Mine.vue'
import VueResource from 'vue-resource'
import 'vue2-toast/lib/toast.css'
import Toast from 'vue2-toast'

Vue.use(Toast)
Vue.use(VueResource)
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/Work',
          name: 'Work',
          component: Work
        }, {
          path: '/MailList',
          name: 'MailList',
          component: MailList
        }, {
          path: '/Message',
          name: 'Message',
          component: Message
        }, {
          path: '/Mine',
          name: 'Mine',
          component: Mine
        }
      ]
    }
  ]
})
