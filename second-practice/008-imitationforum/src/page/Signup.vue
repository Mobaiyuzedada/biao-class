<template lang="pug">
    div.container.clear
      //-  div#left.col-16: div#signup.card
      div#left: div#signup.card
        h3.title 注册
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
                th 重复密码
                td: input(name="password" type="password" v-model="user.repeatPwd")
            tr
                td
                td: span.errmsg {{errmsg.repeatPwd}} 
            tr
                td
                td: button.signup(@click="signup") 注册
    //-  div#right.col-8: div#sidebar.card
    //-     h3.title 已有账号?
    //-     div.wrap
    //-     a 登陆 
</template>
<script>
import api from "../api/user.api";
export default {
  name: "Signup",
  data() {
    return {
      user: {},
      errmsg: {
        username: "",
        password: "",
        repeatPwd: ""
      }
    };
  },
  methods: {
    signup() {
      if (!this.validateUser()) return;
      api
        .createUser({
          user_name: this.user.username,
          password: this.user.password
        })
        .then(res => {
          if (res.status == "ok") {
            alert("注册成功");
            this.$router.push("/login");
          }
        })
        .catch(e => {
          if (e.error == "duplicate") {
            this.errmsg.username = "用户名已存在";
          }
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
      if (!this.user.repeatPwd) {
        errmsg.repeatPwd = "此项不能为空";
      }
      if (!/^[a-zA-Z0-9]{4,12}$/.test(this.user.username)) {
        errmsg.username = "用户名长度应在4-12位之间";
      }
      if (/^\w{1,5}$/.test(this.user.password)) {
        errmsg.password = "用户密码不能小于6位";
      }
      if (this.user.repeatPwd !== this.user.password) {
        errmsg.repeatPwd = "两次输入密码不同";
      }
      return !errmsg.username && !errmsg.password && !errmsg.repeatPwd;
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