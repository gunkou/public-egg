<template>
<div>
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

  <div class="pager">
    <p class="pager__text">{{pageNumber}} / {{allPages}}</p>
    <ul class="pager__link">
      <li class="pager__prev"
      v-if="pageNumber === 2">
        <nuxt-link to="/">
        前
        </nuxt-link>
      </li>
      <li class="pager__prev"
      v-if="pageNumber !== 1 && pageNumber !== 2">
        <nuxt-link :to="`/page/${pageNumber - 1}`">
        前
        </nuxt-link>
      </li>
      <li class="pager__next"
      v-if="pageNumber < allPages">
        <nuxt-link :to="`/page/${pageNumber + 1}`">
        次
        </nuxt-link>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      items: [],
      pageNumber: 1,
      allPages: 0
    };
  },
  async asyncData({route}) {
    let offset = 0;
    const limit = process.env.LIMIT;

    // 2ページ目以降
    if (typeof route.params.id !== 'undefined') {
      // route.params.idは2から始まる
      offset = parseInt(route.params.id);
      // offsetは0から始まるので1引く
      offset = offset - 1;
    }

    const { data } = await axios.get(
      `https://gunkou.microcms.io/api/v1/sunny-side-up?offset=${offset * limit}&limit=${limit}`,
      {
        headers: { 'X-API-KEY': process.env.API_KEY }
      }
    );

    // offsetを元に戻す
    const pageNumber = offset + 1;
    const allPages = Math.ceil(data.totalCount / limit);

    return {
      items: data.contents,
      pageNumber: pageNumber,
      allPages: allPages
    };
  }
}
</script>

<style lang="scss">
.media-list {
  box-sizing: border-box;
  text-align: center;
  margin: 0;
  padding: 0 1.6rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min-content, 400px));
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
    width: 100%;
    box-sizing: border-box;
  }
}
.pager {
  margin: 0;
  padding: 2rem 1rem;
  text-align: center;
  &__text {
    margin: 0 0 0.5rem 0;
  }
  &__link {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
  }
  &__prev,
  &__next {
    margin: 0;
    padding: 0 0.5rem;
    &:empty {
      display: none;
    }
  }
}
</style>
