<template lang="pug">
  div.pagination
    div.pages-wrap
        div.prev-page
            //- router-link()
        div.pages
        div.next-page
</template>
<script>
export default {
  name: "Pagination",
  props: {
    length: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    prefix: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      pages: []
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      let current = 1;
      let left = Math.max(1, current - Math.floor(Number(this.length) / 2));
      console.log(this.prefix);
      console.log(this.max);
      console.log(this.length);
    }
  }
};
</script>