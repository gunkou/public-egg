<template>
  <ul class="media-list">
    <li class="media-list__item"
    v-for="item in items"
    :key="item.id">
      <picture class="media">
        <source :srcset="`
        ${item.imageSunnySideUp.url}?fm=webp&w=400,
        ${item.imageSunnySideUp.url}?fm=webp&w=400&dpr=2 2x
        `"
        type="image/webp">
        <img class="media__img" :src="`${item.imageSunnySideUp.url}?w=800`" alt="">
      </picture>
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
.media-list {
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, 400px);
  justify-content: center;
  grid-row-gap: 2rem;
  grid-column-gap: 2rem;
  &__item {
    box-sizing: border-box;
    list-style: none;
    margin: 0;
    padding: 0;
  }
}
.media {
  &__img {
    border: 1px solid #ccc;
    vertical-align: middle;
    max-width: 100%;
    box-sizing: border-box;
  }
}
</style>
