<template lang="pug">
    div.post-view(v-if="post")
        div.card
            .content
                header
                    h2.post-title {{post.title}}
                    article.post-content(v-html="post.content")
</template>
<script>
import api from "../api/post.js";

export default {
  name: "PostView",
  data() {
    return {
      post: ""
    };
  },
  mounted() {
    api.getPostById({ id: this.$route.params.id }).then(res => {
      this.post = res;
    });
  }
};
</script>
<style lang="scss">
@import "../style/global.scss";

div.post-view {
  > div.card {
    padding: 0em;
    .content {
      padding: 20px;
    }
  }

  h2.post-title {
    font-size: 1.25em;
    font-weight: normal;
    margin-top: 0.25em;
  }
  article{
      line-height: 1.5em;
      margin-bottom: 1em;
  }
  article.post-content{
      padding:0 1em 0 1em;
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