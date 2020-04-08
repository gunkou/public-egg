<template>
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
</template>

<script>
export default {
  props: ['pageNumber', 'allPages']
}
</script>

<style lang="scss">
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
