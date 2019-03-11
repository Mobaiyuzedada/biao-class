<template lang="pug">
    div.card
        h3.title 账号信息
        table.form-table: tbody
            tr
                th 用户名
                td: input.edit(@keyup.enter="update" v-model="people.username" :readonly="!(editMode.editUsername||editMode.editAll)")
                td.modify(v-if="!(editMode.editAll||editMode.editUsername)"): a(@click="editMode.editUsername=true") 修改
            tr(v-if="errmsg" style="color:#c10")
                th 错误
                td {{errmsg}}
            tr
                th 姓名
                td: input.edit(@keyup.enter="update" v-model="people.name" :readonly="!(editMode.editAll||editMode.editName)")
                td(v-if="!(editMode.editAll||editMode.editName)").modify: a(@click="editMode.editName=true") 修改
            //- tr
            //-     th 手机号
            //-     td 138xxxx999
            //-     td: a.modify(v-if="!editMode.editAll||editMode.edit") 修改
            //- tr
            //-     th 邮箱
            //-     td 138xxxx999@qq.com
            //-     td: a.modify(v-if="!editMode.editAll||editMode.edit") 修改
            tr
                th.label GitHubID
                td(v-if="!(editMode.editAll||editMode.editGit)") 
                  p(v-if="people.github_id" v-html=" people.github_id")
                  span.gitId(v-else) 填写发帖时显示对应头像
                td(v-else): input.edit(v-model="people.github_id")
                td(v-if="!(editMode.editAll||editMode.editGit)").modify: a(@click="editMode.editGit=true") 修改            
            tr
                th.label 自我介绍
                td(v-if="!(editMode.editAll||editMode.editIntro)") 
                  p(v-if="people.info" v-html=" people.info")
                  span(v-else) -
                td(v-else): textarea.edit(v-model="people.info")
                td(v-if="!(editMode.editAll||editMode.editIntro)").modify: a(@click="editMode.editIntro=true") 修改
            tr
                td
                td
                 button(style="margin-right:10px" @click="editMode.editAll=true") 修改全部
                 button(@click="update") 保存设置
</template>
<script>
import store from "../../../utils/store";
import api from "../../../api/user.api";

export default {
  name: "SettingPeople",
  data() {
    return {
      people: {},
      editMode: {
        editAll: false,
        editUsername: false,
        editName: false,
        editIntro: false,
        editGit: false
      },
      errmsg: ""
    };
  },
  mounted() {
    api.getUserById(store.get("user").id).then(r => {
      if (r.status == "ok") this.people = r.user;
      !this.people.name && (this.people.name = "-");
      // !this.people.info &&
      //   (this.people.info =
      //     "我是一头小毛驴,我从来也不骑<br> 我是一头小毛驴,我从来也不骑 我是一头小毛驴,我从来也不骑 我是一头小毛驴,我从来也不骑");
    });
  },
  methods: {
    update() {
      this.errmsg = "";
      let edited =
        this.editMode.editAll ||
        this.editMode.editUsername ||
        this.editMode.editName ||
        this.editMode.editIntro ||
        this.editMode.editGit;
      if (!edited) return;
      if (!confirm("确定修改设置？")) return;
      api
        .updateUserById({
          id: this.people.id,
          user: {
            name: this.people.name,
            user_name: this.people.username,
            info: this.people.info,
            github_id: this.people.github_id
          }
        })
        .then(r => {
          if (r.status == "ok") {
            for (let key in this.editMode) {
              this.editMode[key] = false;
            }
          }
        })
        .catch(e => {
          this.errmsg = "用户名已存在";
        });
    }
  }
};
</script>
<style lang="scss" scoped>
input {
  border: none;
  border-bottom: 1px solid #ccc;
}
[readonly] {
  border: none;
}
.edit {
  width: 70%;
}
textarea {
  min-height: 40vh;
  resize: vertical;
}
.modify {
  vertical-align: top;
}
p {
  width: 70%;
  margin-top: 0;
  word-break: break-all;
  white-space: pre-wrap;
}
span.gitId{
  color:#aaa;
}
// textarea[readonly] {
//   resize: none;
//   min-height: 10vh;
//   overflow-y: visible;
//   outline: none;
// }
</style>