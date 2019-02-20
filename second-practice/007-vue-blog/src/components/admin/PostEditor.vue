<template lang="pug">
  div.post-editor.card
    h3.title 创建/更新文章
    div.container: table.form-table: tbody
      tr
        td.label 标题:
        td: input.full(v-model="title")
      tr
        td.label 日期:
        td.date
          input.year(v-model="date.year")
          | 年
          input.short(v-model="date.month")
          | 月
          input.short(v-model="date.day")
          | 日
          input.short(v-model="date.hour")
          | 时
          input.short(v-model="date.minute")
          | 秒
          input.short(v-model="date.second")
          | 分
        tr
          td.label 文章内容：
          td: textarea.content(v-model="content")
        tr
          td
          td
            button(v-if="id" @click="updatePost") 更新文章
            button(v-else @click="createPost") 发布文章
            button.delete(v-if="id !==''" style="float:right;margin-right:28px;" @click="deletePost") 删除文章
            
</template>
<script>
import api from "../../api/post.api";

export default {
  name: "admin",
  data() {
    let date = new Date();
    return {
      id: "",
      title: "",
      content: "",
      date: {
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
      }
    };
  },
  watch: {
    $route: function() {
      // console.log(this.$data);
      // console.log(this.$options.data());
      // console.log(this.$route.params.id);
      //因为删除成功会跳转的上一页，也就是创建页，但是data里仍有数据，因此需要清空
      Object.assign(this.$data, this.$options.data()); //用空data清空data，实现跳转的时候清空
      //监视，创建完文章后，要获取文章。id改变，发布按钮变更新按钮，删除按钮显示
      if (this.$route.params.id) {
        this.fetchPost();
      }
    }
  },
  mounted() {
    if (this.$route.params.id) {
      this.fetchPost();
    }
  },
  methods: {
    createPost() {
      let post = {
        title: this.title,
        content: this.content,
        date: new Date(
          this.date.year,
          this.date.month - 1,
          this.date.day,
          this.date.hour,
          this.date.minute,
          this.date.second
        )
      };
      // console.log(post);
      api
        .createPost(post)
        .then(res => {
          console.log(res);
          if (res.status == "ok") {
            alert("文章已创建");
            this.$router.push(`/admin/post/edit/${res.id}`);
          }
        })
        .catch(e => console.log(e));
    },
    updatePost() {
      api
        .updatePostById({
          id: this.id,
          post: {
            title: this.title,
            content: this.content,
            date: new Date(
              this.date.year,
              this.date.month - 1,
              this.date.day,
              this.date.hour,
              this.date.minute,
              this.date.second
            )
          }
        })
        .then(res => {
          if (res.status == "ok") alert("文章已更新");
        })
        .catch(err => console.log("会话过期，请手动刷新"));
    },
    deletePost() {
      if (!confirm("确定删除文章吗？此操作不可撤销")) return;
      api
        .deletePostById(this.id)
        .then(res => {
          if (res.status == "ok") {
            alert("删除成功");
            this.back();
          }
        })
        .catch(e => alert("会话过期，请手动刷新"));
    },
    fetchPost() {
      api.fetchPostById(this.$route.params.id).then(res => {
        let post = res.post;
        this.id = post._id;
        this.title = post.title;
        this.content = post.content;
        let tmpDate = new Date(post.date);
        this.date = {
          year: tmpDate.getFullYear(),
          month: tmpDate.getMonth() + 1,
          day: tmpDate.getDate(),
          hour: tmpDate.getHours(),
          minute: tmpDate.getMinutes(),
          second: tmpDate.getSeconds()
        };
      });
    },
    back() {
      window.history.go(-1);
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../style/form-table.scss";
div.post-editor {
  .container {
    padding: 1em;
  }
  input.short {
    width: 2.5em;
  }
  input.year {
    width: 4em;
  }
  button {
    font-size: 12px;
    margin-right: 2px;
  }
  td.date {
    text-align: left;
    & > input {
      margin-right: 4px;
      margin-left: 4px;
    }
    input:first-of-type {
      margin-left: 0;
    }
  }
}
</style>