<template lang="pug">
nav: div.container
      div.col-3.left
        div.logo: router-link(to="/")
         img(src="https://www.v2ex.com/static/img/v2ex@2x.png")
      div.col-10
        div.search: input(align="right")
      div.col-11.right.auth(align="right")
        span.loggedIn(v-if="session.loggedIn()")
          router-link.nav-item(to="/settings") {{session.getUser().username}}
          a.nav-item(@click="session.logout()") 登出
        span.tourist(v-else)
          router-link.nav-item(to="/signup") 注册
          router-link.nav-item(to="/login") 登陆
</template>
<script>
import session from "../../utils/session";
export default {
  name: "Nav",
  data() {
    return {
      session
    };
  }
};
</script>
<style lang="scss" scoped>
@import "../style/color.scss";

nav {
  font-size: 15px;
  background: $nav_bg_color;
  border-bottom: 1px solid rgba(0, 0, 0, 0.22);
  font-weight: 500;
  margin-bottom: 1.5em;
  font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma,
    "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
  height: 44px;
  input {
    border-radius: 3px;
    padding: 0.3em 0.6em;
    border: none;
    border: 1px solid #ccc;
  }
  .left > *,
  .right > * {
    display: inline-block;
  }
  .container {
    padding-top: 5px;
    padding-bottom: 5px;
    .logo {
      width: 100%;
      padding-top: 3px;
    }
    .search {
      padding-top: 3px;
      input {
        width: 70%;
        margin-left: 13px;
      }
    }
    .auth {
      padding-top: 6px;
      a.nav-item {
        padding-left: 15px;
        color: #556;
        transition: all ease 0.2s;
      }
      a:hover {
        color: #bbb;
      }
    }
  }
}
</style>