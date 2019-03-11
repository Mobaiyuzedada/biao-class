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
            </tr>
          </thead>
          <tbody>
            <tr v-for="(it,index) in list" :key="index">
              <td>
                <router-link :to="'/admin/post/edit/'+it._id">{{it.title}}</router-link>
              </td>
              <td :title="it.content">{{it.content|cut}}</td>
              <td>{{it.id}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import api from "../../api/mock.js";
import $ from "axios";

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
  filters: {
    cut(value) {
      return value.length < 12 ? value : value.substring(0, 12) + "...";
    }
  },
  methods: {
    read() {
      //mock接口
      // api("post/read?limit=50").then(r => {
      //   this.list = r.data;
      //   console.log( this.list);
      // });
      //mongodb接口

      $({
        url: "/api/api/read",
        method: "get"
      }).then(r => {
        console.log(r.data);
        this.list = r.data;
        console.log(this.list);
      });
    }
  }
};
</script>