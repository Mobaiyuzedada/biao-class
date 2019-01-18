<template lang="pug">
    div.post-list.card
        h3.title 文章列表
        div.container: table
            thead: tr
                th 标题
                th 预览
                th id
            tbody: tr(v-for="post in posts")
                td.title: span: router-link(:to="'/admin/post/edit/'+post._id") {{post.title}}
                td.left(:title="post.content") {{post.content|cut}}
                td.id {{post._id}}
</template>
<script>
import api from "../../api/post.js";
export default {
  name: "PostManager",
  data() {
    return {
      current: [],
      posts: []
    };
  },
  mounted() {
    this.read();
  },
  filters: {//管理页预览内容如果大于12个字符就缩略
    cut(value) {
      return value.length < 12 ? value : value.substring(0, 12) + "...";
    }
  },
  methods: {
    read() {
      api.getAllPost().then(data => {
        this.posts = data;
      });
    }
  }
};
</script>
<style lang="scss">
@import "../../style/global.scss";

.post-list {
  .container {
    padding: 1em;
  }
  table {
    width: 100%;
  }
//   td.left {
//     text-align: left;
//   }
  td {
    text-align: center;
    position: relative;
    padding: 0.5em;
  }
  td > span {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 8px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>