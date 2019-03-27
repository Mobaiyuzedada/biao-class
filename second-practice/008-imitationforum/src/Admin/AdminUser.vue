<template lang="pug">
    div.user-panel.card
        div.title: h2 用户管理面板
        div.container
            div.opreating-panel
                button(@click="ui.hidden=!ui.hidden;user={}") 创建用户
                div(v-if="ui.hidden")
                    h3 创建/更新用户
                    form(@submit.prevent="addUser")
                        div.input-control
                            label.clear
                                span.col-5 用户名
                                input.col-19(v-model="user.user_name")
                            label
                                span.col-5(v-html="'&nbsp'") 
                                span.errmsg.col-19.errmsg {{errmsg.username}} 
                        div.input-control
                            label.clear
                                span.col-5 真名
                                input.col-19(v-model="user.name")
                        div.input-control(v-if="!user._id")
                            label.clear
                                span.col-5 密码
                                input.col-19(v-model="user.password" type="password")
                            label
                                span.col-5(v-html="'&nbsp'") 
                                span.errmsg.col-19.errmsg {{errmsg.password}} 
                        div.input-control
                            label.clear
                                span.col-5 管理员
                                input(v-model="user.admin" type="checkbox")
                        div.input-control 
                           label.clear
                                span.col-5(v-html="'&nbsp'") 
                                button(type="submit") 提交
            div.userList
                h3 用户列表
                table.form-table
                    thead
                        tr
                            th 同户名
                            th 真名
                            th 管理员
                            th 注册时间
                            th 操作
                    tbody
                        tr(v-for="user in userList")
                            td(:title="user.user_name.length>6?user.user_name:''") {{cut(user.user_name)}}
                            td {{user.name?user.name:'-'}}
                            td {{user.admin?'是':'-'}}
                            td {{timeToString(user.createTime)}}
                            td.opreation 
                                span(@click="updateUser(user)") 更新
                                span.del(@click="removeUser(user._id)") 删除
                Pagination(:length="pages.length",:max="userList.length",prefix="/admin/user")
</template>
<script>
import api from "../api/user.api";
import timeToString from "../utils/timeToString";
import Pagination from "../components/Pagination.vue";
export default {
  name: "AdminUser",
  components: { Pagination },
  data() {
    return {
      pages: {
        length: 5
      },
      ui: {
        hidden: false
      },
      user: {},
      userList: [],
      errmsg: {
        username: "",
        password: ""
      }
    };
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    addUser() {
      if (this.user._id) {
        let newUser = {
          id: this.user._id,
          user: this.user
        };
        console.log(newUser);
        api.updateUserById(newUser).then(r => {
          this.getUserList();
        });
      } else {
        if (!this.validateUser()) return;
        api
          .createUser({
            user_name: this.user.user_name,
            password: this.user.password,
            admin: this.user.admin,
            name: this.user.name
          })
          .then(res => {
            if (res.status == "ok") {
              alert("创建成功");
              this.user = {};
              this.getUserList();
            }
          })
          .catch(e => {
            if (e.error == "duplicate") {
              this.errmsg.username = "用户名已存在";
            }
          });
      }
    },
    removeUser(id) {
      if (!confirm("确定要删除该用户吗？此操作不可撤销")) return;
      api.deleteUserById(id).then(r => {
        console.log("删除成功");
        this.getUserList();
      });
    },
    updateUser(user) {
      this.ui.hidden = true;
      this.fill(user);
      this.focusUserForm();
    },
    getUserList() {
      api.getAllUser().then(r => {
        if (r.status == "ok") {
          this.userList = r.users;
        }
      });
    },
    timeToString,
    cut(str) {
      return str.length > 6 ? str.substr(0, 4) + "..." : str;
    },
    validateUser() {
      Object.assign(this.errmsg, this.$options.data().errmsg);
      let errmsg = this.errmsg;
      if (!this.user.user_name) {
        errmsg.username = "此项不能为空";
      }
      if (!this.user.password) {
        errmsg.password = "此项不能为空";
      }
      if (!/^[a-zA-Z0-9]{4,12}$/.test(this.user.username)) {
        errmsg.username = "用户名长度应在4-12位之间";
      }
      if (/^\w{1,5}$/.test(this.user.password)) {
        errmsg.password = "用户密码不能小于6位";
      }
      return !errmsg.username && !errmsg.password;
    },
    fill(user) {
      this.user = user;
    },
    focusUserForm() {
      this.$el.querySelector(".opreating-panel").scrollIntoView();
    }
  }
};
</script>
<style lang="scss">
@import "../style/form-table";
.user-panel {
  .opreating-panel {
    form {
      width: 50%;
      color: #888;
      font-size: 16px;
      .input-control {
        margin-bottom: 1em;
        label {
          span {
            text-align: right;
            padding-right: 15px;
            padding-left: 0;
          }
          span.errmsg {
            text-align: left;
          }
          input {
            padding: 0.3em;
          }
        }
      }
    }
  }
  .userList {
    .form-table {
      border-spacing: 10px;
      //   border-collapse: collapse;
      tr:first-child {
        width: 100px;
      }
      th {
        text-align: left;
      }
      .tc {
        text-align: center;
      }
      .opreation {
        padding-right: 50px;
        color: #aaa;
        span.del {
          margin-left: 8px;
        }
        span:hover {
          color: #444;
          cursor: pointer;
        }
        span.del:hover {
          color: #c10;
        }
      }
    }
  }
}
</style>
