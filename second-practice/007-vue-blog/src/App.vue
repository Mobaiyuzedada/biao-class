<template lang="pug">
  div#app
    h1 yo
    nav
      span: router-link(to="/") 首页
      span: router-link(to="/admin/post") 文章管理
      span: router-link(to="/admin/post/new") 创建文章
    router-view
    //- router-view(name="Admin")
    //- img(src="./assets/logo.png" alt="Vue logo")
    //- HelloWorld(msg="Welcome to Your Vue.js App")
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "app",
  components: {
    HelloWorld
  }
};
</script>

<style lang="scss">
@import "./style/global.scss";
$nav_width: 15em;
body {
  margin: 0;
  min-height: 100vh;
  height: 100%;
  overflow-y: scroll;
  background: $background_color;
  color: $font_color;
  font-family: Microsoft Yahei UI;
}
#app {
  max-width: 600px;
  padding: 0 1em 0 1em;
  margin: 0 auto;
  nav {
    background-color: mix(#eee, #666, 70%);
    padding: 5px;
    width: $nav_width;
    span {
      width: $nav_width/3;
      margin: 0 10px;
      a {
        text-align: center;
      }
      // border
    }
  }
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
