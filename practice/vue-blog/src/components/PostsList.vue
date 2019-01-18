<template lang="pug">
  div.posts-list
    div.list-item.card(v-for="post in posts")
      div.content
        header
          router-link(:to="'/post/'+post._id"): h2.post-title {{post.title}}
        article.post-preview(v-html='post.content')
</template>
<script>
import api from "../api/post.js";
export default {
  name: "PostsList",
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    this.fetchAllPost();
  },
  methods: {
    fetchAllPost() {
      api.getAllPost().then(res => {
        this.posts = res;
      });
    }
  }
};
</script>
<style lang="scss">
  @import '../style/global.scss';

  div.posts-list{
    div.list-item.card{
      .content{
        padding:20px;
      }
    }

    h2.post-title{
      font-size: 1.25em;
      font-weight: normal;
      margin-top: 0
    }

    .list-item{
      padding:20px;
      // background-color: inherit;
      border-radius: 2px;
    }

    article.post-preview{
      padding:0 1em;
    }
    article{
      line-height: 1.5em;
      margin-bottom: 1em;
    }
    article:not(:first-child){
      margin-top: 1em;
    }
    article > *:last-child{
      margin-bottom: 0;
    }
    article >*:first-child{
      margin-top: 0;
    }
    header{
      color:#333;
    }
  }
</style>