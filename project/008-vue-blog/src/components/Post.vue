<template>
  <div class="container">
    <h1>{{row.title}}</h1>
    <div class="post-content">{{row.content}}</div>
    <div class="replies">
      <div class="reply" v-for="reply in replyList">
        <div class="email">
          邮箱: {{reply.email}}<span v-if="reply.replyTo">回复<span>{{replyEmail[reply.replyTo]}}</span></span>
        </div>
        <div class="content">内容:{{reply.content}}</div>
        <div class="opreation">
          <button @click="setReplyTo(reply)">回复</button>
          <button @click="deleteReply(reply.id)">删除</button>
        </div>
      </div>
    </div>
    <div class="comment-area">
      <form v-if="commentForm" class="comment-form">
        <span v-if="replyTo" v-model="replyTo">回复{{replyEmail[replyTo]}}</span>
        <input type="email" placeholder="邮箱" v-model="currentReply.email">
        <textarea v-model="currentReply.content"></textarea>
        <button @click="createReply()">提交</button>
      </form>
    </div>
  </div>
</template>

<script>
import api from "../api/mock.js";
export default {
  data() {
    return {
      row: {},
      commentForm: true,
      currentReply: {},
      replyList: [],
      replyTo: null,
      replyEmail: {}
    };
  },
  mounted() {
    this.findPost(this.$route.params.id);
    this.readReply();
    this.currentReply.post_id = this.$route.params.id;
  },
  methods: {
    findPost(id) {
      api("post/find", { id }).then(r => {
        this.row = r.data;
      });
    },
    createReply() {
      console.log("done!");
      let a = { replyTo: this.replyTo, ...this.currentReply };
      api("replies/create", a).then(r => {
        if (r.success) {
          if (this.replyTo === null) alert("评论成功");
          else {
            alert(`回复${this.replyName}成功!`);
          }
          this.currentReply = {};
          this.readReply();
        }
      });
    },
    deleteReply(id) {
      api("replies/delete", { id }).then(r => {
        if (r.success) {
          console.log("删除评论成功！");
          this.readReply();
        }
      });
    },
    setReplyTo(reply) {
      this.replyTo = reply.id;
      this.focusReplyForm();
    },
    focusReplyForm() {
      this.$el.querySelector("input[type=email]").scrollIntoView();
    },
    readReply() {
      console.log(this.$route.params.id);
      api("replies/read", {
        where: { and: { post_id: this.$route.params.id } }
      }).then(r => {
        if (r.success) {
          this.replyList = r.data && r.data.reverse();
          r.data &&
            r.data.forEach(it => {
              let id = it.id;
              let email = it.email;
              this.replyEmail[id]=email ;
            });
          console.log(this.replyEmail);
        }
      });
    }
  }
};
</script>
<style >
.post-content {
  white-space: pre-wrap;
}
.comment-form {
  margin-left: 0;
}
.container {
  max-width: 30em;
}
.comment-form {
  margin-top: 5em;
}
.comment-form > * {
  width: 100%;
  margin-top: 0.5em;
  background: #fff;
}
.replies {
  margin-top: 10em;
}
.replies .reply {
  border: 1px solid #444;
  margin-bottom: 5px;
  padding: 5px;
  white-space: pre-wrap;
}
</style>