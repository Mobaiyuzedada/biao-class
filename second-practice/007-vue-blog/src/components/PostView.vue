<template lang="pug">
    div.post-view(v-if="post")
        div.card
            .content
                header
                    h2.post-title {{post.title}}
                    div.post-meta: span {{timeToString(post.date)}}
                article.post-content(v-html="post.content")
        router-view
</template>
<script>
import api from "../api/post.api";
import timeToString from "../utils/timeToString";
export default {
  name: "PostView",
  data() {
    return {
      post: ""
    };
  },
  mounted() {
    this.getPost();
  },
  methods: {
    timeToString,
    getPost() {
      api.fetchPostById(this.$route.params.id).then(res => {
        this.post = res.post;
      });
    }
  }
};
</script>
<style lang="scss">
div.post-view {
  > div.card {
    padding: 0;
    .content {
      padding: 20px;
      white-space: pre-wrap;
    }
    h2.post-title {
      font-size: 1.25em;
      font-weight: normal;
      margin-top: 0.25em;
    }
    div.post-meta {
      font-size: 0.9em;
      line-height: 1.5em;
      word-wrap: break-word;
      word-break: break-all;
    }
    div.post-meta > span {
      margin-right: 20px;
    }
    article.post-content {
      padding: 0 1em 0 1em;
    }
    article {
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
    p.indent {
      text-indent: 2em; //p段落缩进
    }
  }
}
</style>