<template>
  <div class="post-container">
    <div class="post-editor card">
      <h3 class="title">创建/编辑文章</h3>
      <div class="container">
        <table class="form-table">
          <tbody>
            <tr>
              <td class="label">标题:</td>
              <td>
                <input type="text" class="full" v-model="current.title">
              </td>
            </tr>
            <tr>
              <td class="label">文章内容：</td>
              <td>
                <textarea v-model="current.content" class="content"></textarea>
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button v-if="id" @click="updatePost">更新文章</button>
                <button v-else @click="createPost">发布文章</button>
                <button
                  v-if="id!==''"
                  style="float: right; margin-right: 28px;background:#c10;color:#fff;"
                  @click="deletePost"
                >删除文章</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/mock";
// import mon from "../../api/post.js";
import $ from "axios";

export default {
  data() {
    return {
      current: {},
      id: this.$route.params.id
    };
  },
  mounted() {
    if (this.id) {
      console.log(this.id);
      this.read(this.id);
    }
  },
  methods: {
    onSubmit() {},
    createPost() {
      $({
        // url: "http://localhost:3000/api/post",
        url: "/api/post",
        method: "post",
        data: {
          title: this.current.title,
          content: this.current.content
        }
      }).then(r => {
        console.log(r.data);
      });

      console.log(this.current);
      // api("post/create", this.current).then(r => {
      //   // console.log(r); //api中return的Promise
      //   if (r.success) {
      //     // this.read();
      //     this.resetCurrent();
      //     alert("创建成功！");
      //   }
      // });
    },
    updatePost() {
      console.log(this.current);
      //mock接口
      // api("post/update", { id: this.id, ...this.current }).then(r => {
      //   // console.log(r);
      //   if (r.success) {
      //     this.resetCurrent();
      //     alert("更新成功！");
      //   }
      // });
      //mongodb接口
      $({
        method: "post",
        url: `/api/api/update/${this.id}`,
        data: {
          title: this.current.title,
          content: this.current.content
        }
      }).then(r => {
        if (r.status === 200) {
          alert("更新成功");
        }
      });
    },
    deletePost() {
      if (!confirm("确定要删除文章？此操作不可撤销。")) {
        return;
      }
      //mock接口
      // api("post/delete", { id: this.id }).then(r => {
      //   if (r.success) {
      //     window.history.go(-1);
      //     alert("删除成功！");
      //   }
      // });
      //mongodb接口
      $({
        method: "post",
        url: `/api/api/delete/${this.id}`
      }).then(r => {
        if (r.status === 200) {
          window.history.go(-1);
          alert("删除成功");
        }
      });
    },
    read(id) {
      //mock接口
      // api("post/find", { id }).then(r => {
      //   this.current = r.data;
      // });
      //mongodb接口
      $({
        method: "get",
        url: `/api/api/read/${id}`
      }).then(r => {
        this.current = r.data;
      });
    },
    resetCurrent() {
      this.current = {};
    }
  }
};
</script>
<style>
table {
  width: 100%;
}
.post-list td:first-of-type,
.post-list th:first-of-type {
  text-align: left;
}
.post-list td:last-of-type,
.post-list th:last-of-type {
  text-align: right;
}
.post-list td,
.post-list th {
  padding: 1rem;
}
.post-list td.operation > * {
  padding: 6px 4px 5px 4px;
  margin-left: 5px;
}
</style>