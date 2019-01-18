<template lang="pug">
    div.post-list
        div.title-card.card(v-show="title") {{title}}
        posts-list(:posts="posts")
</template>
<script>
import PostsList from "../components/PostsList.vue";
export default {
  name: "PostsListView",
  component: PostsList,
  data() {
    return { title: null };
  },
  computed: {
    posts: function() {
      return this.$store.state.posts;
    }
  },
  watch: {
    $route: function() {
      this.promise = this.$options.asyncData({
        store: this.$store,
        route: this.$route
      });
    }
  },
  asyncData({store,route}){
      return store.dispatch('fetchLatestPosts', { page: route.params.page })
  }
};
</script>