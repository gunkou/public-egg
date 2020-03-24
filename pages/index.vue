<template>
  <ul>
    <li v-for="item in items">
      <img :src="`${item.imageSunnySideUp.url}?w=300`" alt="">
    </li>
  </ul>
</template>

<script>
import axios from "axios"

export default {
  data() {
    return {
      items: []
    };
  },
  async asyncData() {
    const { data } = await axios.get(
      "https://gunkou.microcms.io/api/v1/sunny-side-up",
      {
        headers: { "X-API-KEY": process.env.API_KEY }
      }
    );
    return {
      items: data.contents
    };
  }
}
</script>

<style lang="scss">
ul {
  margin: 0;
  padding: 0;
}
li {
  margin: 5px;
  padding: 0;
  list-style: none;
}
img {
  border: 1px solid #ccc;
  vertical-align: middle;
  max-width: 100%;
}
</style>
