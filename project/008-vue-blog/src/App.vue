<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <nav>
      <router-link to="/">首页</router-link>
      <router-link to="/admin">管理页</router-link>
      <!-- <router-link to="/admin/post/new">创建文章</router-link>
      <router-link to="/admin/post">管理文章</router-link> -->
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
nav a {
  display: inline-block;
  padding: 5px;
  text-decoration: none;
  color: blue;
}
nav a:focus,
nav a:hover {
  text-decoration: underline dotted;
  color: darkkhaki;
}
</style>
