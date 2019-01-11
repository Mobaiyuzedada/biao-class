import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

//调用路由组件
import Router from 'vue-router'
Vue.use(Router);
//引入路由页面
import Home from './components/Home'
// import Admin from './components/admin/'
import Admin from './components/admin/Admin.vue'
import AdminPostEditor from './components/admin/PostEditor.vue'
import AdminPostsList from './components/admin/PostsList.vue'
import Post from './components/Post.vue'

//页面路由部分
const routes = [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/home',
    component: Home,
  }, {
    path: '/post/:id',
    component: Post,
  }, {
    path: '/admin',
    component: Admin,
    children: [
      {
        path: 'post',
        component: AdminPostsList
      }, {
        path: 'post/new',
        component: AdminPostEditor
      }, {
        path: '/admin/post/edit/:id',
        component: AdminPostEditor
      },
    ]
  },
];

new Vue({
  render: h => h(App),
  router: new Router({
    routes,
  }),
}).$mount('#app')
