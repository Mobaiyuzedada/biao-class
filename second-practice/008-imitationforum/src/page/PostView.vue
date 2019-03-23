<template lang="pug">
    div.post-view: div.container
      div(v-if="post.title")
        div.card
          div.header
            div.cat: span {{post.cat_id}}
            div.detail
              h3.title {{post.title}}
              div.meta.
                #[span From #[a.user(href="#") #[strong(style="color:14px") {{post.username}}]] {{timeToString(post.dateTime,true)}}]
          div.content(v-if="post.content")
              p {{post.content}}
        div.card.subPosts(v-for="post in subPosts" v-if="subPosts")
          div.header.clear
            div.avatar.col-3
              div.github-avatar(v-if="post.github_id")
                a(href="#" )
                  img(:src="`https://github.com/${post.github_id}.png`")
              div.fallback-avatar(v-else)
                a(href="#" )
                div {{post.username.substr(0,1).toUpperCase()}}
            div.detail.col-20
              div.sub-post-content {{post.title}}
              div.meta.
                #[span From #[a.user(href="#") #[strong(style="color:14px") {{post.username}}]] {{timeToString(post.dateTime,true)}}]
          div.content(v-if="post.content")
              p {{post.content}}
        div.card.sub-post
          div.title: h3 跟帖
          div.tourist(v-if="!id"): p.
            #[router-link(to="/login") 登陆] 后方可跟帖
          div.sub-post-content(v-else)
            textarea.post-title(v-model="subpost.content" placeholder="跟帖内容")
            button(@click="submitSubpost()") 提交
      div(v-else) 加载中...


</template>
<style lang="scss" scoped>
@import "../style/color.scss";
.container {
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}
.post-view {
  .header {
    padding: 0.7em 0.8em;
    div.avatar {
      padding-left: 0;
      padding-right: 0;
      width: 50px;
      height: 50px;
      flex-grow: 0;
      flex-shrink: 0;
      overflow: hidden;
      // margin-top: 5px;
      // margin-left: 1em;
      // margin-top:1em;
    }
    div.github-avatar {
      background-size: cover;
    }
    div.fallback-avatar {
      line-height: 50px;
      max-width: 50px;
      text-align: center;
      font-size: 20px;
      user-select: none;
      color: $avatar_fallback_color;
      background-color: $avatar_fallback_bg_color;
    }
  }
  .cat {
    padding: 0.2em 0;
    font-size: 18px;
    color: #808080;
  }
  .detail {
    .title {
      color: #000;
      font-size: 35px;
      padding: 0 0.3rem;
      background: transparent;
    }
    .sub-post-content {
      white-space: pre-line;
      padding: 0 0.3rem;
      font-size: 18px;
      margin-bottom: 15px;
    }
    .meta {
      padding: 0 0.3rem;
      color: #808080;
      a {
        color: #777;
      }
      a:hover {
        text-decoration: underline;
      }
    }
  }
  .content {
    border-top: 1px solid #ccc;
    font-style: 18px;
    padding: 0 0.5em;
  }
}
.sub-post {
  border-radius: 3px;
  div.title {
    background: transparent;
    color: #000;
    h3 {
      margin: 0;
      font-weight: bold;
      font-size: 24px;
    }
  }
  div.tourist {
    font-size: 18px;
    padding-left: 10px;
    a {
      color: #0ae;
      font-weight: 700;
    }
    a:hover {
      border-bottom: 1px solid #000;
    }
  }
  div.sub-post-content {
    border-top: 1px solid #ccc;
    padding: 20px 40px 0 40px;
    button {
      margin-bottom: 20px;
    }
    input,
    textarea {
      display: block;
      padding: 0.5em;
      width: 100%;
    }
    input {
      border-bottom: none;
    }
    textarea {
      resize: none;
      margin-bottom: 10px;
      margin-top: 10px;
      min-height: 50vh;
      max-height: 70vh;
      border-radius: 7px;
      background: rgba(0, 0, 0, 0);
      background-color: rgb(255, 255, 255);
      &:focus {
        outline: none;
      }
      &::-webkit-scrollbar {
        width: 7px;
        background: #f5f5f5;
      }
      &::-webkit-scrollbar-thumb {
        background: rgb(135, 219, 252);
        border-radius: 7px;
        background-image: -webkit-gradient(
          linear,
          0 0,
          0 100%,
          color-stop(0.5, rgba(255, 255, 255, 0.2)),
          color-stop(0.5, transparent),
          to(transparent)
        );
      }
      &::-webkit-scrollbar-thumb:hover {
        background: rgb(107, 204, 241);
      }
      &::-webkit-scrollbar-thumb:active {
        background: #0ae;
      }
    }

    input::placeholder,
    textarea::placeholder {
      color: mix(#0366d6, white, 70%);
    }
    input.invalid::placeholder,
    textarea.invalid::placeholder {
      color: #c10;
    }
  }
}
</style>
<script>
import api from "../api/post.api";
import userApi from "../api/user.api";
import timeToString from "../utils/timeToString";
import session from "../../utils/session";
import mixin from "../mixin/post_verifi";
export default {
  name: "PostView.vue",
  mixins: [mixin],
  data() {
    return {
      post: {},
      subpost: {},
      subPosts: [],
      id: session.getUser() ? session.getUser().id : null
    };
  },
  mounted() {
    this.fetchPostById();
    this.fetchSubPosts();
  },
  methods: {
    submitSubpost() {
      if (!this.post_verifi()) return;
      api
        .createPost({
          belongTo: this.$route.params.id,
          userId: session.getUser().id,
          title: this.subpost.content
        })
        .then(r => {
          if (r.status == "ok") {
            alert("跟帖成功！");
            this.subpost = {};
            this.fetchSubPosts();
          }
        });
    },
    async fetchSubPosts() {
      try {
        let res = await api.findPostByBelongTo(this.$route.params.id);
        let user, posts;
        res.status == "ok" && (posts = res.subPosts);
        for (let post of posts) {
          user = await userApi.getUserById(post.userId);
          user = user.user;
          post.github_id = user.github_id;
          post.username = user.username;
        }
        this.subPosts = posts;
      } catch (e) {
        console.log(e);
      }
    },
    async fetchPostById() {
      try {
        let res = await api.fetchPostById(this.$route.params.id);
        let user, post;
        res.status == "ok" ? (post = res.post) : "";
        user = await userApi.getUserById(post.userId);
        user = user.user;
        post.github_id = user.github_id;
        post.username = user.username;
        this.post = post;
      } catch (e) {
        console.log(e);
      }
    },
    timeToString
  }
};
</script>