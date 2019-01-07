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
                <button>更新文章</button>
                <button @click="create">发布文章</button>
                <button>删除文章</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import "../../css/PostEditor.css";
import api from "../../api/mock";
export default {
  data() {
    return {
      current: {},
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    onSubmit() {},
    create() {
      api("post/create", this.current).then(r => {
        console.log(r); //api中return的Promise
        if (r.success) {
          this.read();
          this.resetCurrent();
        }
      });
    },
    update() {
      api("post/update", this.current).then(r => {
        console.log(r); //api中return的Promise
        if (r.sucess) this.read();
      });
    },
    remove() {},
    read() {
      api("post/read").then(r => {
        this.list = r.data;
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