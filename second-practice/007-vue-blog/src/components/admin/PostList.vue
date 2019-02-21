<template lang="pug">
    div.posts-list.card
        h3.title 文章列表
        div.container: table
            thead: tr
                th 标题
                th 创建时间
                th 预览
            tbody: tr(v-for="post in posts")
                td.center.title: span: router-link(:to="'/admin/post/edit/'+post._id") {{post.title}}
                td.center.date: span {{timeToString(post.date)}}
                td(:title="post.content").prev-content: span {{post.content}}
</template>
<script>
import api from "../../api/post.api";
import timeToString from "../../utils/timeToString";
export default {
  name: "PostList",
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.getPostList();
  },
  filters: {
    cut(value) {
      return value.length < 12 ? value : value.substring(0, 4) + "...";
    }
  },
  methods: {
    timeToString,
    getPostList() {
      api.fetchAll().then(res => {
        this.posts = res.posts;
      });
    }
  }
};
</script>
<style lang="scss">
@import "../../style/global.scss";
.posts-list {
  .container {
    padding: 1em;
  }
  table {
    width: 100%;
  }
  td.center {
    text-align: center;
    height: 2rem;
  }
  td {
    position: relative;
    padding: 0.5em;
  }
  td > span {
    position: absolute;
    left: 0;
    right: 0;
    white-space: nowrap;
    text-overflow: ellipsis; //隐藏部分以...显示
    overflow: hidden;
  }
}
</style>