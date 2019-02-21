<template lang="pug">
    div.reply#reply: div.card
        h3.title 评论
        div.content
            ul.replies-list(v-if="replies&&replies.length!==0")
                li(v-for="reply in replies")
                    div.avatar
                        div.github-avatar(v-if="reply.github_id",:style="{backgroundImage: `url(https://github.com/${reply.github_id}.png)`}")
                        div.fallback-avatar(v-else) {{reply.name.substr(0,1).toUpperCase()}}
                    div.reply-body
                        div.name(v-if="reply.reply_to") {{reply.name}} {{reply.email!==''?`from ${reply.email}`:''}} 回复 {{getReplyTo(reply.reply_to).name}}
                        div.name(v-else) {{reply.name}} {{reply.email!==''?`from${reply.email}`:''}}
                        div.date {{timeToString(reply.date,true)}}
                        div.raw-content {{reply.content}}
                        a.reply-to(@click="setReplyTo(reply._id)") 回复该评论
            div#reply-form.send-new
                h3(v-if="reply.reply_to===null") 发表评论
                h3(v-if="reply.reply_to!==null") 回复给 {{getReplyTo(reply.reply_to).name}}
                table.form-table: tbody
                    tr
                        th 姓名
                        td: input.full(v-model="reply.name",placeholder="必填")
                    tr
                        th GitHub ID
                        td: input.full(v-model="reply.github_id",placeholder="选填，填写可显示头像")
                    tr
                        th 电子邮件
                        td: input.full(v-model="reply.email",placeholder="选填，邮件不会公开")
                    tr
                        th 评论
                        td: textarea.content(v-model="reply.content",placeholder="必填")
                    tr 
                        td
                        td
                            button(@click="submit") 提交
                            button(@click="reset" style="margin-left:10px") 重置
</template>
<script>
import api from "../api/reply";
import timeToString from "../utils/timeToString";
export default {
  name: "Reply",
  data() {
    return {
      id: this.$route.params.id,
      reply: {
        name: "",
        github_id: "",
        reply_to: null,
        email: "",
        content: ""
      },
      replies: []
    };
  },
  // computed: {
  //   replyTree() {
  //     let tree = Object.assign([], this.replies);
  //     console.log(tree);
  //     tree.forEach((reply, r_index, r_arr) => {
  //       if (reply.reply_to) {
  //         this.replies.forEach((el, index) => {
  //           if (el._id == reply.reply_to) {
  //             r_arr.splice(index + 1, 0, reply);
  //             r_arr.splice(r_index, 1);
  //           }
  //         });
  //       }
  //     });
  //     console.log(this.replies);
  //     return tree;
  //   }
  // },
  mounted() {
    this.getReplies();
  },
  methods: {
    timeToString,
    submit() {
      let reply = {
        post_id: this.id,
        ...this.reply
      };
      api.createReply(reply).then(res => {
        if (res.status == "ok") {
          alert("回复成功");
          this.getReplies();
          this.reset();
        }
      });
    },
    getReplies() {
      api.getReplies(this.id).then(res => {
        if (res.status == "ok") this.replies = res.replies;
      });
    },
    getReplyTo(replyTo) {
      let result;
      this.replies.forEach(reply => {
        if (reply._id == replyTo) result = reply;
      });
      return result;
    },
    setReplyTo(id) {
      this.reply.reply_to = id;
      this.focusReplyForm();
    },
    focusReplyForm() {
      this.$el.querySelector("#reply-form").scrollIntoView();
    },
    reset() {
      Object.assign(this.$data.reply, {
        name: "",
        github_id: "",
        email: "",
        content: "",
        reply_to: null
      });
    }
  }
};
</script>
<style lang="scss">
@import "../style/global.scss";
@import "../style/form-table.scss";
div.reply {
  div.content {
    padding: 0 1em;
  }
  table th {
    text-align: right;
    width: 90px;
    vertical-align: top;
    font-weight: normal;
  }
  table {
    width: 90%;
    border-spacing: 5px;
    textarea.content {
      height: 8em;
    }
  }
  div.raw-content {
    white-space: pre;
  }
  ul.replies-list {
    padding: 0;
    list-style: none;

    > li {
      position: relative;
      display: flex; //flex布局
      padding: 1em 1em 0.4em 0.3em;
      margin: 0.5em 0 0.5em 0;
      border-radius: 2px;
      line-height: 1.2em;

      a.reply-to {
        font-size: 12px;
        position: absolute;
        bottom: 5px;
        right: 8px;
        opacity: 0;
        transition: all ease 0.3s;
        &:not(:hover) {
          border-bottom: 1px solid transparent;
        }
      }

      div.avatar,
      div.github-avatar {
        width: 40px;
        height: 40px;
      }
      div.avatar {
        flex-grow: 0;
        flex-shrink: 0;
        border-radius: 20px;
        overflow: hidden;
        margin-top: 5px;
        margin-right: 1em;
      }
      div.github-avatar {
        background-size: cover;
      }
      div.fallback-avatar {
        line-height: 40px;
        max-width: 40px;
        text-align: center;
        font-size: 20px;
        background-color: lightseagreen;
        color: #fff;
        user-select: none;
      }
    }
    > li:hover {
      a.reply-to {
        opacity: 1;
        transition: none;
      }
    }
    div.name {
      font-weight: bold;
    }
    div.date,
    div.name {
      font-size: 0.8em;
      color: grey;
    }
  }
}
</style>