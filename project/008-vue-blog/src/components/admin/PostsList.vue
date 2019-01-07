<template>
  <div class="post-container">
    <div class="post-list card">
      <h3 class="title">文章列表</h3>
      <div class="container">
        <table>
          <thead>
            <tr>
              <th>标题</th>
              <th>预览</th>
              <th>id</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="it in list">
              <td>{{it.title}}</td>
              <td>{{it.content}}</td>
              <td>{{it.id}}</td>
              <td class="operation">
                <button>删除</button>
                <button>更新</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../api/mock.js";

export default {
  data() {
    return {
      current: {},
      list: []
    };
  },
  mounted() {
    this.read();
  },
  methods: {
    read() {
      api("post/read").then(r => {
        this.list = r.data;
      });
    }
  }
};
</script>