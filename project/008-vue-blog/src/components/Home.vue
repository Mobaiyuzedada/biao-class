<template>
  <div class="container">
    <h1>近期文章</h1>
    <div class="post-list">
      <div class="post" v-for="post in PostList">
        <router-link :to="'/post/'+post.id">
          <h3>{{post.title}}</h3>
        </router-link>
        <div class="preview">{{post.content}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../api/mock.js";
export default {
  data() {
    return {
      PostList: []
    };
  },
  mounted() {
    this.readPost();
  },
  methods: {
    readPost() {
      api("post/read").then(r => {
        this.PostList = r.data;
      });
    }
  }
};
</script>

<style>
  
</style>