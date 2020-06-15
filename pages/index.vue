<template>
<div>
  <div class="media-style-change">
    <SwitchBtn
     v-bind:isGridStyle="isGridStyle"
     v-on:change-grid-style="changeGridStyle"
     ></SwitchBtn>
  </div>

  <ul class="media-list" v-bind:class="{ 'media-list--sp-col2': isGridStyle }">
    <li class="media-list__item"
    v-for="item in items"
    :key="item.id">
      <picture class="media" @click="openModal(item)" tabindex="0">
        <source :srcset="`
        ${item.imageSunnySideUp.url}?fm=webp&w=400,
        ${item.imageSunnySideUp.url}?fm=webp&w=400&dpr=2 2x
        `"
        type="image/webp">
        <img class="media__img" :src="`${item.imageSunnySideUp.url}?w=800`" alt="">
      </picture>
    </li>
  </ul>

  <MediaDetails :val="postItem" v-if="showModal" @close="closeModal"></MediaDetails>
  <Pager :pageNumber="pageNumber" :allPages="allPages"></Pager>
</div>
</template>

<script>
import axios from "axios";
import Pager from "~/components/Pager";
import MediaDetails from "~/components/MediaDetails";
import SwitchBtn from "~/components/SwitchBtn";

/**
 * 文字列("true", "false")をboolean型に変換する
 */
function toBoolean (str) {
  return str.toLowerCase() === 'true';
}

export default {
  components: {
    Pager,
    MediaDetails,
    SwitchBtn
  },
  data() {
    return {
      items: [],
      pageNumber: 1,
      allPages: 0,
      showModal: false,
      postItem: '',
      isGridStyle: false
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
  },
  mounted() {
    if (sessionStorage.isGridStyle) {
      this.isGridStyle = toBoolean(sessionStorage.isGridStyle);
    }
  },
  methods: {
    openModal(item) {
      this.postItem = item;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    changeGridStyle: function(event) {
      this.isGridStyle = !this.isGridStyle;
      sessionStorage.isGridStyle = this.isGridStyle;
    }
  },
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
  grid-row-gap: 2rem;
  grid-column-gap: 2rem;
  justify-content: center;
  &__item {
    box-sizing: border-box;
    list-style: none;
    margin: 0;
    padding: 0;
  }
  &--sp-col2 {
    @media (max-width: 768px) {
      padding: 0;
      grid-template-columns: repeat(auto-fit, minmax(min-content, 47vw));
      grid-row-gap: 2vw;
      grid-column-gap: 2vw;
    }
  }
}
.media {
  border: 1px solid #ccc;
  display: block;
  position: relative;
  width: 100%;
  cursor: pointer;
  &:focus {
    outline: 0;
  }
  &::before {
    content:"";
    display: block;
    padding-top: 66.666667%;
  }
  &__img {
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    vertical-align: middle;
    max-width: 100%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
.btn {
  display: block;
  background: none;
  border: 0;
  position: relative;
  text-decoration: underline;
  padding: 0;
}
.media-style-change {
  text-align: center;
  display: none;
  margin: 0 0 1rem 0;
  @media (max-width: 768px) {
    display: block;
  }
}
</style>
