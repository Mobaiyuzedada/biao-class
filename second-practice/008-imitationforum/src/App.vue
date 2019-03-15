<template lang="pug">
  div.app
    Nav/
    div.test
     router-link(to="/" style="margin-right:20px") home
     router-link(to="/signup" style="margin-right:20px") signup
     router-link(to="/login" style="margin-right:20px") login
     router-link(to="/settings") Settings
    router-view
</template>

<script>
import Nav from "./components/Nav.vue";

export default {
  name: "app",
  components: {
    Nav: Nav
  },

};
</script>
<style lang="scss">
@import "./style/global.scss";
// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
