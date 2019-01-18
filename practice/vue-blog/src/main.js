import Vue from 'vue'
import App from './App.vue'
Vue.config.productionTip = false

//调用路由组件
import Router from 'vue-router'
Vue.use(Router);
//引入路由页面相关组件
import Home from './components/PostsList.vue';//主页
import PostVue from './components/Post.vue';//文章页
import AdminSideBar from './components/admin/Admin.vue';//管理页入口(管理页侧栏)
import AdminPostEditor from './components/admin/PostEditor.vue';//创建/更新组件
import PostManager from './components/admin/PostManager.vue'//文章管理组件
//页面路由
const routes = [
  {
    path: '/',
    components: {
      default: Home,
    },
  },{
    path:'/post/:id',
    component:PostVue,
  } ,{
    path: '/admin',
    components: {
      sidebbar: AdminSideBar
    }
  }, {
    path: '/admin/post/new',
    components: {
      default: AdminPostEditor,
      sidebbar: AdminSideBar
    },
  }, {
    path: '/admin/post',
    components: {
      default: PostManager,
      sidebbar: AdminSideBar,
    },
  }, {
    path: '/admin/post/edit/:id',
    components: {
      default: AdminPostEditor,
      sidebbar: AdminSideBar,
    }
  }
]

new Vue({
  render: h => h(App),
  router: new Router({
    routes,
  })
}).$mount('#app')
