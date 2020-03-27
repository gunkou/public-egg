<template>
  <header class="site-header">
    <div class="site-header__block">
      <p class="site-header__logo">目玉焼き</p>
      <button
        v-on:click="siteNavShow = !siteNavShow"
        class="site-header__button"
        id="site-header-nav-hook"
        tabindex="0"
        aria-controls="site-header-nav-panel"
        :aria-expanded="siteNavShow ? 'true' : 'false'"
        :class="{'site-header__button--open': siteNavShow}">
          <span v-if="siteNavShow">close</span>
          <span v-else>open</span>
      </button>
    </div>

    <transition name="fade">
    <div class="site-header__nav"
     id="site-header-nav-panel"
     aria-labelledby="site-header-nav-hook"
     v-show="siteNavShow">
      <nav class="site-header-nav">
        <p class="site-header-nav__text">目玉焼きの画像を掲載しています。</p>
        <ul class="site-header-nav__list">
          <li><a href="#">AAA</a></li>
          <li><a href="#">AAA</a></li>
        </ul>
      </nav>
    </div>
    </transition>
  </header>
</template>

<script>
export default {
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
  watch: {
    siteNavShow: function (val, oldVal) {
      this.documentElement.setAttribute('data-scroll-disabled', val);
    }
  }
}
</script>

<style lang="scss">
.site-header {
  position: relative;
  font-size: 1rem;
  line-height: 1;
  height: 7em; // &__blockのpadding 4em + &__logoのfont-size 3em
  &__block {
    padding: 2em 1.6em;
  }
  &__logo {
    display: block;
    color: #333;
    font-family: 'Kosugi Maru', sans-serif;
    font-size: 2.4em;
    font-weight: bold;
    font-style: normal;
    text-align: center;
    position: relative;
    z-index: 10;
    margin: 0;
  }
  &__button {
    display: none; // 何もないので非表示
    color: #333;
    position: absolute;
    z-index: 10;
    bottom: 50%;
    transform: translateY(50%);
    left: 1.6em;
    background: none;
    font-size: 1em;
    border-radius: 1em;
    padding: 0.2em 0.8em;;
  }
  &__nav {
    display: none; // 何もないので非表示
    position: relative;
    width: 100%;
    z-index: 5;
    padding: 1.6em;
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
html[data-scroll-disabled="true"] body {
  position: fixed;
  overflow: hidden;
  width: 100%;
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
