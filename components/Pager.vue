<template>
  <div class="pager">
    <ul class="pager__link">
      <li class="pager__prev">
        <nuxt-link v-if="prev !== null" :to="prev" class="pager__anchor">前</nuxt-link>
        <span v-else class="pager__anchor pager__anchor--disable">前</span>
      </li>
      <li class="pager__text">{{pageNumber}} / {{allPages}}</li>
      <li class="pager__next">
        <nuxt-link v-if="next !== null" :to="next" class="pager__anchor">次</nuxt-link>
        <span v-else class="pager__anchor pager__anchor--disable">次</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: [
    'pageNumber',
    'allPages'
  ],
  computed: {
    prev: function () {
      if (this.pageNumber === 2) {
        return '/';
      }

      if (this.pageNumber !== 1 && this.pageNumber !== 2) {
        return `/page/${this.pageNumber - 1}`;
      }

      return null;
    },
    next: function () {
      if (this.pageNumber < this.allPages) {
        return `/page/${this.pageNumber + 1}`;
      }

      return null;
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/css/foundation/_variable";
@import "~/assets/css/foundation/_utility";

.pager {
  $prev: [];
  $next: [];
  text-align: center;
  margin: to-vw($spacing-small) 0;
  @include mq(landscape) {
    margin: to-em($spacing-small, $font-size-base) 0;
  }
  @include mq() {
    text-align: right;
    margin: 0;
  }
  &__text {
    font-size: to-vw($font-size-base);
    @include mq(landscape) {
      font-size: to-em($font-size-base, $font-size-base);
    }
    @include mq() {
      font-size: to-em($font-size-base, $font-size-base);
    }
  }
  &__link {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    justify-content: center;
    @include mq() {
      justify-content: flex-end;
    }
  }
  &__prev,
  &__next {
    margin: 0;
    padding: 0 to-vw($spacing-x-small);
    font-size: to-vw($font-size-base);
    @include mq(landscape) {
      padding: 0 to-em($spacing-x-small, $font-size-base);
      font-size: to-em($font-size-base, $font-size-base);
    }
    @include mq() {
      padding: 0 to-em($spacing-x-small, $font-size-base);
      font-size: to-em($font-size-base, $font-size-base);
    }
    &:empty {
      display: none;
    }
  }
  &__prev {
    $prev: &;
  }
  &__next {
    $next: &;
  }
  &__anchor {
    color: transparent;
    position: relative;
    display: block;
    top: 0.35em;
    width: to-vw($font-size-small);
    height: to-vw($font-size-small);
    @include mq(landscape) {
      width: to-em($font-size-small, $font-size-base);
      height: to-em($font-size-small, $font-size-base);
    }
    @include mq() {
      width: to-em($font-size-small, $font-size-base);
      height: to-em($font-size-small, $font-size-base);
    }
    &::before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      border-top: solid 1px #000;
      border-right: solid 1px #000;
      transform: rotate(45deg);
      position: absolute;
      top: 0;
      left: 0;
    }
    &--disable {
      &::before {
      border-top-color: #999;
      border-right-color: #999;
      }
    }
    #{$prev} & {
      &::before {
        transform: rotate(-135deg);
      }
    }
  }
}
</style>
