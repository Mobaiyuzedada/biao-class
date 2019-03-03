<template lang="pug">
    div.card
        h3.title 修改密码
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

export default {
  name: "Password",
  props: ['aaa'],
  data() {
    return {
      oldPassword: "",
      repeatPassword: "",
      newPassword: "",
      showPassword: false,
      errmsg: ""
    };
  },

  methods: {
    changePassword() {
      console.log(this.aaa);
      if (this.password_verifi()) return;
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
</style>