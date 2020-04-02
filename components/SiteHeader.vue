<template>
  <header class="site-header">
    <div class="site-header__block">
      <p class="site-header__logo">目玉焼き</p>
      <button
        v-on:click="siteNavShow = !siteNavShow"
        class="site-header__button menu-trigger"
        id="site-header-nav-hook"
        tabindex="0"
        aria-controls="site-header-nav-panel"
        :aria-expanded="siteNavShow ? 'true' : 'false'"
        :class="{'menu-trigger--open': siteNavShow}">
          <span class="menu-trigger__line"></span>
          <span class="menu-trigger__line"></span>
          <span class="menu-trigger__line"></span>
          <span class="menu-trigger__text" v-if="siteNavShow">close</span>
          <span class="menu-trigger__text" v-else>open</span>
      </button>
    </div>

    <transition name="fade">
    <div class="site-header__nav"
     id="site-header-nav-panel"
     aria-labelledby="site-header-nav-hook"
     v-show="siteNavShow">
     <div class="site-header-nav-body">
       <div class="site-header-nav-body__main">
        <nav class="site-header-nav">
          <p class="site-header-nav__text">素敵な目玉焼きを目指して、今まで作った目玉焼きを掲載しています。</p>
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
    position: absolute;
    z-index: 10;
    top: 2em;
    left: 0;
  }
  &__nav {
    position: relative;
    z-index: 5;
    padding: 1.6em;
    box-sizing: border-box;
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
    line-height: 1.6;
  }
}
.site-header-nav-body {
  min-height: 100%;
  display: grid;
  grid-template-rows: 1fr auto;
}
.menu-trigger {
  width: 2.4em;
  height: 2.4em;
  color: #333;
  background: none;
  font-size: 1em;
  padding: 0.2em 0.8em;;
  transition: transform .4s;
  border: 0;
  &:focus {
    outline: none;
  }
  &__text {
    font-size: 0;
    color: transparent;
  }
  &--open {
    transform: rotate(-90deg);
  }
  &__line {
    display: inline-block;
    box-sizing: border-box;
    position: absolute;
    left: 0;
    width: 90%;
    height: 2px;
    background-color: #333;
    border-radius: 8px;
    &:nth-of-type(1) {
      top: 0;
    }
    &:nth-of-type(2) {
      bottom: 50%;
      transform: translateY(50%);
      width: 100%;
    }
    &:nth-of-type(3) {
      bottom: 0;
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
