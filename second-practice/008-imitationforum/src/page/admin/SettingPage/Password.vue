<template lang="pug">
    div.card
        h3.title 修改密码
        fieldset(:disabled="loadPending")
          table.form-table: tbody
              tr
                  th 原密码
                  td: input(v-model="oldPassword" :type="showPassword?'text':'password'")
              tr
                  th 新密码
                  td: input(v-model="newPassword" :type="showPassword?'text':'password'")
              tr
                  th 确认密码
                  td: input(v-model="repeatPassword" :type="showPassword?'text':'password'")
              tr.errmsg(v-if="errmsg")
                  th(style="color:#c10") 错误
                  td: span {{errmsg}}
              tr
                  td
                  td 
                    button(@click="changePassword") 确定
                    button(@click="showPassword=!showPassword" style="margin-left:10px;") {{showPassword?'隐藏密码':'显示密码'}}
</template>
<script>
import api from "../../../api/user.api";
import store from "../../../utils/store";
export default {
  name: "Password",
  data() {
    return {
      oldPassword: "",
      repeatPassword: "",
      newPassword: "",
      showPassword: false,
      errmsg: "",
      loadPending: false
    };
  },

  methods: {
    changePassword() {
      if (this.password_verifi()) return;
      this.loadPending = true;
      let user = store.get("user");
      api
        .getUser({ _id: user.id, password: this.oldPassword })
        .then(r => {
          if (r.status == "ok") {
            user = r.user;
            user.password = this.newPassword;
            user.user_name = r.user.username;
            let newUser = {
              id: r.user.id,
              user
            };
            delete user.id;
            delete user.username;
            console.log(newUser);
            api
              .updateUserById(newUser)
              .then(r => {
                if (r.status == "ok") {
                  alert("修改密码成功");
                  location.reload();
                }
              })
              .catch(e => {
                console.log(e);
              });
          }
          this.loadPending = false;
        })
        .catch(err => {
          if (err.response.data == "not found") this.errmsg = "原密码不正确";
          this.loadPending = false;
        });
    },
    password_verifi() {
      this.errmsg = "";
      let length = Math.min(
        this.oldPassword.length,
        this.newPassword.length,
        this.repeatPassword.length
      );
      if (length === 0) this.errmsg = "有未填项";
      else if (length < 6) this.errmsg = "密码长度不能小于6位";
      else if (this.oldPassword == this.newPassword)
        this.errmsg = "新密码与旧密码相同";
      else if (this.newPassword !== this.repeatPassword)
        this.errmsg = "两次密码输入不一致";
      return this.errmsg;
    }
  }
};
</script>
<style lang="scss" scoped>
input {
  width: 60%;
}
th {
  border-left: 8px solid transparent;
}
.errmsg {
  color: #c10;
}
[disabled] {
  opacity: 0.5;
}
fieldset {
  border: none;
  margin: 0;
  padding: 0;
}
</style>