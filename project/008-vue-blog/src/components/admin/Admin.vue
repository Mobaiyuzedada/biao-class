<template>
    <div>
        <h1>管理页</h1>
        <router-view></router-view>
        <router-link to="/admin/post">文章列表页</router-link>
        <router-link to="/admin/post/new">创建文章</router-link>
    </div>
</template>
<script>
export default {
    
};
</script>