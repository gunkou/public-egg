<template>
  <header :class="className" class="site-header">
    <div class="site-header__block">
      <p class="site-header__logo">目玉焼き</p>

      <button
        v-on:click="siteNavShow = !siteNavShow"
        tabindex="0"
        class="site-header__button menu-trigger"
        aria-controls="site-header-nav-panel"
        :aria-expanded="siteNavShow ? 'true' : 'false'"
        :class="{'menu-trigger--open': siteNavShow}"
      >
        <span class="menu-trigger__line"></span>
        <span class="menu-trigger__line"></span>
        <span class="menu-trigger__line"></span>
        <span class="menu-trigger__text" v-if="siteNavShow">close</span>
        <span class="menu-trigger__text" v-else>open</span>
      </button>

    </div>

    <transition name="fade"
      v-on:after-enter="afterEnter"
      v-on:after-leave="afterLeave"
    >
    <div class="site-header__nav"
     id="site-header-nav-panel"
     aria-labelledby="site-header-nav-hook"
     v-show="siteNavShow">
     <div class="site-header-nav-body">
       <div class="site-header-nav-body__main">
        <nav class="site-header-nav">
          <p class="site-header-nav__text">素敵な目玉焼きを目指して、今まで作った目玉焼きを掲載しています。</p>
          <p class="site-header-nav__text site-header-nav__text--note">注意：<br>訪問状況を把握するために<a target="_blank" href="https://marketingplatform.google.com/intl/ja/about/analytics/">Google Analytics</a>を利用しています。Google Analyticsはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、特定の個人を識別する情報は一切含まれません。</p>
        </nav>
       </div>
       <div class="site-header-nav-body__footer">
          <p>Contact: gun.kou@outlook.com</p>
       </div>
     </div>
    </div>
    </transition>
  </header>
</template>

<script>
export default {
  props: ['className'],
  data() {
    return {
      siteNavShow: false,
      documentElement: null
    }
  },
  mounted: function () {
    const documentElement = document.documentElement;
    documentElement.setAttribute('data-scroll-disabled', this.siteNavShow);
    this.documentElement = documentElement;
  },
  methods: {
    afterEnter: function () {
        this.documentElement.setAttribute('data-scroll-disabled', true);
    },
    afterLeave: function () {
        this.documentElement.setAttribute('data-scroll-disabled', false);
    }
  }
}
</script>

<style lang="scss">
@import "~/assets/css/foundation/_variable";
@import "~/assets/css/foundation/_utility";

.site-header {
  position: relative;
  &__logo {
    display: block;
    color: #333;
    font-family: 'Kosugi Maru', sans-serif;
    font-weight: bold;
    font-style: normal;
    font-size: to-em($font-size-h3);
    letter-spacing: 0.2em;
    line-height: 1;
    margin: 0;
    z-index: 10;
    position: fixed;
    @include mq(s) {
      writing-mode: vertical-rl;
      text-orientation: sideways;
      left: 0;
      top: to-vw($width-gutter--sp);
    }
    @include mq(landscape) {
      top: to-em($width-gutter--sp, $font-size-h3);
    }
    @include mq() {
      margin-left: 2em;
      position: relative;
      top: to-em(2px, $font-size-h3);
    }
  }
  &__button {
    position: fixed;
    z-index: 10;
    bottom: to-vw($width-gutter--sp);
    left: 0;
    @include mq(landscape) {
      bottom: to-em($width-gutter--sp);
    }
    @include mq() {
      position: absolute;
      top: 0;
      bottom: auto;
    }
  }
  &__nav {
    z-index: 5;
    position: absolute;
    top: 0;
    left: to-vw($width-header--sp + $width-gutter--sp);
    width: to-vw($width-col-4--sp);
    padding: to-vw($width-gutter--sp) 0 to-vw($width-gutter--sp) 0;
    @include mq(landscape) {
      left: to-em($width-header--sp + $width-gutter--sp);
      width: to-em($width-col-4--sp);
      padding: to-em($width-gutter--sp) 0 to-em($width-gutter--sp) 0;
    }
    @include mq() {
      position: relative;
      padding: $width-gutter 0 0 0;
      width: 100%;
      left: 0;
    }
    &::after {
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100vh;
      content: "";
      background: rgba(#fff, 0.6);
    }
  }
}
.site-header-nav {
  &__text {
    &--note {
      color: #666;
      margin-top: to-vw($spacing-medium);
      @include mq(landscape) {
        margin-top: to-em($spacing-medium);
      }
    }
  }
}
.site-header-nav-body {
  min-height: 100%;
  &__footer {
    margin-top: to-vw($spacing-x-large);
    @include mq(landscape) {
      margin-top: to-em($spacing-x-large);
    }
  }
}
.menu-trigger {
  $rootOpen: [];

  width: 2.4em;
  height: 2.4em;
  color: #333;
  background: none;
  font-size: 1em;
  padding: 0.2em 0.8em;;
  border: 0;
  &:focus {
    outline: none;
  }
  &__text {
    font-size: 0;
    color: transparent;
  }
  &--open {
    $rootOpen: &;
  }
  &__line {
    $lineW: 70%;

    display: inline-block;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    width: $lineW;
    height: 2px;
    background-color: #333;
    border-radius: 8px;
    transition: width .4s;
    &:nth-of-type(1) {
      top: 0;
      #{$rootOpen} & {
        width: 100%;
      }
    }
    &:nth-of-type(2) {
      bottom: 50%;
      transform: translateY(50%);
      width: 100%;
      #{$rootOpen} & {
        width: $lineW;
      }
    }
    &:nth-of-type(3) {
      bottom: 0;
      #{$rootOpen} & {
        width: 100%;
      }
    }
  }
}
html[data-scroll-disabled="true"] body {
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity .5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
