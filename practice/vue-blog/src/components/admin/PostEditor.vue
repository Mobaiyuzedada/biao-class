<template lang="pug">
    div.post-editor.card
        h3.title 创建/编辑文章
        div.container: table.form-table: tbody
            tr
                td.label 标题
                td: input.full(v-model="title")
            tr
                td.label 文章内容
                td: textarea.content(v-model="content")
            tr
                td
                td
                    button(v-if="id" @click="updatePost") 更新文章
                    button(v-else @click="createPost") 发布文章
                    button.delete(@click="deletePost" 
                                  v-if="id!==''") 删除文章  
</template>
<script>
import api from "../../api/post.js";

export default {
  name: "PostEditor",
  data() {
    return {
      title: "",
      content: "",
      id: ""
    };
  },
  mounted() {
    if (this.$route.params.id) {
      this.fetchPost();
    }
  },
  watch:{
    '$route':function(){
      Object.assign(this.$data,this.$options.data());//用一个空数据来合并data里的数据
      //这个的功能相当于每次打开创建文章都会清空this.$data里的关于文章的数据
      if(this.$route.params.id){
        this.fetchPost();
      }
    }
  },
  methods: {
    createPost() {
      if (!this.title) {
        alert("标题是必须的");
        return;
      }
      api.createPost({
          title: this.title,
          content: this.content
        }).then(r => {
          alert("文章已创建");
          this.$router.push(`/admin/post/edit/${r.id}`);//创建成功就推到编辑页
          })
        .catch(err => {alert("会话过期，请手动刷新");});
    },
    updatePost() {
      api.updatePost({
        id:this.id,
        post:{
        title:this.title,
        content:this.content
        }
      }).then(r=>{
        alert('文章已更新');
        this.fetchPost();
      }).catch(err=>{
        alert("会话过期，请手动刷新");
      })
    },
    deletePost() {
        if(!confirm('确定要删除文章？此操作不可撤销。')){
          return;
        }
        api.deletePost({id:this.id}).then(()=>{
          this.back();
        }).catch(e=>{
          alert("会话过期，请手动刷新");
        })
    },
    fetchPost() {
      api.getPostById({ id: this.$route.params.id }).then(post => {
        this.title = post.title;
        this.id = post._id;
        this.content = post.content;
      });
    },
    back(){
      window.history.go(-1);
    }
  }
};
</script>

<style lang="scss">
@import "../../style/form-table.scss";

div.post-editor {
  .container {
    padding: 1em;
  }
  button {
    font-size: 12px;
    margin-right: 2px;
  }
  button.delete {
    float: right;
    margin-right: 28px;
    background: #c10;
    color: #fff;
  }
  button.delete:hover {
    background: mix(#c10, #444, 80%);
  }
}
</style>