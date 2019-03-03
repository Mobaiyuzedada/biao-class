<template lang="pug">
    div.container.clear
      //-  div#left.col-16: div#signup.card
      div#left: div#login.card
        h3.title 登陆
        div.wrap: table.form-table: tbody
            tr
                th 用户名
                td: input(name="username" v-model="user.username")
            tr
                td
                td: span.errmsg {{errmsg.username}} 
            tr
                th 密码
                td: input(name="password" type="password" v-model="user.password")
            tr
                td
                td: span.errmsg {{errmsg.password}} 
            tr
                td
                td: span.errmsg {{errmsg.login}} 
            tr
                td
                td: button.login(@click="login") 登陆
    //-  div#right.col-8: div#sidebar.card
    //-     h3.title 已有账号?
    //-     div.wrap
    //-     a 登陆 
</template>
<script>
import api from "../api/user.api";
import session from "../../utils/session";
export default {
  name: "Signup",
  data() {
    return {
      user: {},
      errmsg: {
        username: "",
        password: "",
        login: ""
      }
    };
  },
  methods: {
    login() {
      if (!this.validateUser()) return;
      api
        .getUser({
          user_name: this.user.username,
          password: this.user.password
        })
        .then(res => {
          console.log(res);
          if (res.status == "ok") {
            alert("登陆成功");
            session.login(res.user);
            this.$router.push("/");
          } else if (res.status == "error") {
            this.errmsg.login = "用户名或密码错误";
          }
        })
        .catch(e => {
          console.log(e);
        });
    },
    validateUser() {
      Object.assign(this.errmsg, this.$options.data().errmsg);
      let errmsg = this.errmsg;
      if (!this.user.username) {
        errmsg.username = "此项不能为空";
      }
      if (!this.user.password) {
        errmsg.password = "此项不能为空";
      }
      if (!/^[a-zA-Z0-9]{4,12}$/.test(this.user.username)) {
        errmsg.username = "用户名错误";
      }
      if (/^\w{1,5}$/.test(this.user.password)) {
        errmsg.password = "密码错误";
      }
      return !errmsg.username && !errmsg.password;
    }
  }
};
</script>
<style lang="scss">
@import "../style/form-table.scss";
.wrap {
  max-width: 60%;
  margin-left: auto;
  margin-right: auto;
  span.errmsg {
    color: #c10;
    padding-top: 0;
  }
}
.container {
  max-width: 750px;
  overflow: auto;
}
.container,
.wrap {
  padding: 1em;
}
</style>