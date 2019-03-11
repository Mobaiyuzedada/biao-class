<template lang="pug">
    div.container
        div.col-8#left
            div.card
        div.col-16.content-main
            div.card.post-new
              h4.title 随便发点什么吧
              div.content
                  input.post-title(v-model="post.title" placeholder="标题")
                  textarea.post-content(v-model="post.content" placeholder="正文,非必须")
              div.footbar.clear
                button(@click="transimit" style="float:right") 发布
            div.timeline: div.stream
              div.stream-posts
                div.card.poContent(v-for="post in posts")
                  div.topbar(v-if="post.cat_id"): div.cat {{post.cat_id}}
                  div.content.clear
                    div.avatar.col-3
                      div.github-avatar(v-if="post.github_id")
                        a(href="#" )
                          img(:src="`https://github.com/${post.github_id}.png`")
                      div.fallback-avatar(v-else)
                        a(href="#" )
                         div {{post.username.substr(0,1).toUpperCase()}}
                    div.detail.col-20
                      div.header 
                        h3: a.user {{post.username}}
                      div.meta {{timeToString(post.dateTime,true)}}
                      div.text {{post.content}}

</template>
<script>
import api from "../api/post.api";
import userApi from "../api/user.api";
import timeToString from "../utils/timeToString";
import session from "../../utils/session";
import { Promise } from "q";
export default {
  name: "Home",
  data() {
    return {
      post: {},
      posts: []
    };
  },
  mounted() {
    this.fetchAll();
  },
  // watch: {
  //   newposts: function() {
  //     this.posts = [...this.newposts];
  //   }
  // },
  methods: {
    //方案1
    async fetchAll() {
      try {
        let res = await api.fetchAll();
        let posts, user;
        if (res.status == "ok") posts = res.posts;
        console.log(this.timeToString(posts[2].dateTime,true));
        for (let post of posts) {
          user = await userApi.getUserById(post.userId);
          user = user.user;
          post.github_id = user.github_id;
          post.username = user.username;
        }
        this.posts = posts;
      } catch (e) {
        console.log(e);
      }
    },
    /** 方案2(失败)
    async fetchAll() {
      let r = await api.fetchAll();
      let posts;
      posts = r.posts;
      for (let post of posts) {
        userApi.getUserById(post.userId).then(r => {
          let user = r.user;
          post.github_id = user.github_id;
          post.username = user.username;
        });
      }
      console.log(posts);
      this.posts = posts;
      console.log(this.posts);
    },

    方案3(失败)
    fetchAll() {
      api.fetchAll().then(r => {
        for (let post of r.posts) {
          userApi.getUserById(post.userId).then(r => {
            let user = r.user;
            post.github_id = user.github_id;
            post.username = user.username;
          });
        }
        this.newposts = r.posts;
        console.log(this.newposts);
      });
    },*/
    transimit() {
      if (!this.post_verifi()) return;
      api
        .createPost({
          userId: session.getUser().id,
          title: this.post.title,
          content: this.post.content,
          cat_id: "科学"
        })
        .then(r => {
          if (r.status == "ok") alert("发布成功");
          this.post = {};
        });
    },
    post_verifi() {
      if (!this.postTitle().value) {
        let t1 = setInterval(() => {
          this.postTitle().placeholder = "主题不能为空";
          this.postTitle().classList.add("invalid");
          if (!this.postTitle().style.backgroundColor) {
            this.postTitle().style.backgroundColor = "rgba(255,187,187)";
          } else {
            this.postTitle().style.backgroundColor = "";
          }
        }, 400);
        setTimeout(() => {
          clearInterval(t1);
          this.postTitle().placeholder = "主题";
          this.postTitle().classList.remove("invalid");
        }, 1600);
        return false;
      }
      return true;
    },
    postTitle() {
      //获取标题元素
      return document.querySelector(".post-title");
    },
    timeToString
  }
};
</script>
<style lang="scss">
@import "../style/color.scss";
.card {
  border: 1px solid #ccc;
  border-radius: 2px;
}
.content-main {
  color: #0366d6;
  font-family: "Noto Sans CJK", "Noto Sans CJK SC", "Source Han Sans",
    "Source Han Sans CN", "\601D\6E90\9ED1\4F53", "\601D\6E90\9ED1\4F53 CN",
    "WenQuanYi Micro Hei", "Microsoft Yahei UI", "Microsoft Yahei",
    "\5FAE\8F6F\96C5\9ED1", "SimHei", sans-serif;
  .post-new {
    .title {
      background: #fff;
      color: inherit;
    }
    .footbar,
    .content {
      padding: 0.3em 1em;
    }
    .content {
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
        min-height: 30vh;
        border-radius: 0;
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
  .timeline {
    .stream {
      .stream-posts .poContent {
        .topbar {
          padding: 0.4em 0 0.4em 1em;
          font-size: 16px;
          border-bottom: 1px solid #ccc;
        }
        .content {
          padding: 1.4em 0 0.4em 1em;
          div.avatar {
            padding-left: 0;
            padding-right: 0;
            width: 50px;
            height: 50px;
            flex-grow: 0;
            flex-shrink: 0;
            border-radius: 40px;
            overflow: hidden;
            // margin-top: 5px;
            // margin-left: 1em;
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
            a {
              color: inherit;
            }
          }
          .detail {
            padding-left: 1.2em;
            .header {
              h3 {
                margin: 0;
                color: #000;
                a {
                  color: inherit;
                }
                a:hover {
                  color: #0366d6;
                }
              }
            }
            .meta {
              font-size: $meta_fz;
              color: $meta_color;
              margin-top: 7px;
              margin-bottom: 3px;
            }
            .text {
              line-height: 1.2em;
              padding: 0.2em 0;
              margin-bottom: 1em;
              color: #000;
            }
          }
        }
      }
    }
  }
}
</style>