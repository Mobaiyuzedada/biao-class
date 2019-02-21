import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'

Vue.config.productionTip = false

import PostList from './components/PostList.vue'
import AdminPostEditor from './components/admin/PostEditor.vue'
import AdminPostList from './components/admin/PostList.vue'
import PostView from './components/PostView.vue'
import Reply from './components/Reply.vue'
Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',//可以把url里的#(默认的hash模式)去掉，但需要对应后端的支持
  routes: [
    {
      path: '/',
      component: PostList
    }, {
      path: '/post/:id',
      component: PostView,
      children: [
        {
          path: 'reply',
          component: Reply
        }
      ]
    }, {
      path: '/admin/post/new',
      component: AdminPostEditor
    }, {
      path: '/admin/post/edit/:id',
      component: AdminPostEditor
    }, {
      path: '/admin/post',
      component: AdminPostList
    },
  ]
})
new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
