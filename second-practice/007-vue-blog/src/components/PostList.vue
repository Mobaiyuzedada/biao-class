<template lang="pug">
  div.posts-list
    div.list-item.card(v-for="post in posts")
      div.content
        header
          router-link(:to="'/post/'+post._id"): h2.post-title {{post.title}}
          div.post-meta
            span {{timeToString(post.date)}}
        article.post-preview(v-html="post.content")
</template>
<script>
import timeToString from "../utils/timeToString";
import api from "../api/post.api";
export default {
  name: "PostList",
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.getPosts();
  },
  methods: {
    timeToString,
    getPosts() {
      api.fetchAll().then(res => {
        this.posts = res.posts;
      });
    }
  }
};
</script>
<style lang="scss">
@import "../style/global.scss";

div.posts-list {
  div.list-item.card {
    padding: 0;
    .content {
      padding: 20px;
    }
  }
  h2.post-title {
    font-size: 1.25em;
    font-weight: normal;
    margin-top: 0;
  }
  .list-item {
    padding: 20px;
    background-color: mix(#fff, #eee, 60%);
    border-radius: 2px;
  }
  div.post-meta {
    font-size: 0.9em;
    line-height: 1.5em;
    word-wrap: break-word;
    word-break: break-all;
  }
  div.post-meta > span {
    margin-bottom: 0;
  }
  article.post-preview {
    line-height: 1.5em;
    margin-bottom: 1em;
  }
  article:not(:first-child) {
    margin-top: 1em;
  }
  article > *:first-child {
    margin-top: 0;
  }
  article > *:last-child {
    margin-bottom: 0;
  }
}
</style>