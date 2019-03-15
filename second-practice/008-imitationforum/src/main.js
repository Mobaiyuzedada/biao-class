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



Vue.config.productionTip = false
Vue.use(vueRouter);
let router = new vueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Home,
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
        }
      ]
    }
  ]
})
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
