import Vue from 'vue'
import App from './App.vue'
import vueRouter from 'vue-router';
import $ from 'jquery';



//引入组件
import Home from './page/Home.vue';
import About from './page/About.vue';
import Signup from './page/Signup.vue';
import Login from './page/Login.vue';
import Setting from './page/admin/Setting.vue';
import SettingPeople from './page/admin/SettingPage/People.vue';
import SettingPassword from './page/admin/SettingPage/Password.vue';
import PostView from './page/PostView.vue'
import AdminBase from './Admin/AdminBase.vue'
import AdminUser from './Admin/AdminUser.vue'
import AdminPost from './Admin/AdminPost.vue'

//引入其他
import session from '../utils/session';


Vue.config.productionTip = false
Vue.use(vueRouter);
const router = new vueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
      meta: { keepAlive: true }
    }, {
      path: '/post/:id',
      component: PostView
    }, {
      path: '/about',
      component: About
    }, {
      path: '/signup',
      component: Signup,
    }, {
      path: '/login',
      component: Login
    }, {
      path: '/settings',
      component: Setting,
      children: [
        {
          path: 'people',
          component: SettingPeople
        }, {
          path: 'password',
          component: SettingPassword
        },]
    },
    //管理路由
    {
      path: '/admin',
      component: AdminBase,
      children: [
        {
          path: 'user',
          component: AdminUser
        }, {
          path: 'post',
          component: AdminPost
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  let toAdmin = to.matched[0].path == '/admin';
  let isAdmin = session.getUser() ? session.getUser().admin : false;
  if (toAdmin) {
    isAdmin ? next() : next(false);
  } else {
    next()
  }
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
