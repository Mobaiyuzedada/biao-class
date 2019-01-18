<template>
  <div>
    <h1>管理页</h1>
    <div class="sidebar">
      <router-link to="/admin/post/new">创建文章</router-link>
      <router-link to="/admin/post">文章列表</router-link>
      <router-link to="/admin/replies">评论管理</router-link>
      <router-link to="/admin/cat">分类管理</router-link>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import "../../css/PostEditor.css";
export default {};
</script>


<style>
.sidebar {
  width: 30%;
  display: inline-block;
}
.sidebar > * {
  display: block;
}
</style>