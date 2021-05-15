<template>
  <div class="modal modal-overlay" @click.self="$emit('close')">
    <div class="modal-window">
      <div class="modal-content">
        <div class="media-details">
          <picture class="media-details__image">
            <source :srcset="`${val.imageSunnySideUp.url}?fm=webp&fit=crop&rect=415,180,570,570&q=100`" type="image/webp">
            <img :src="`${val.imageSunnySideUp.url}?fit=crop&rect=415,180,570,570&q=100`" alt="">
          </picture>
        </div>
        <p class="date">{{ val.dateCreate | dateFormat }}</p>
        <button @click="$emit('close')" class="btn">
          <span>Close</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
      val: Object
  },
  filters: {
    dateFormat: function (value) {
      if (!value) return '';
      const date = new Date(value);
      const y = date.getFullYear();
      const m = date.getMonth() + 1;
      const d = date.getDate();
      return `${y}.${m}.${d}`;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/css/foundation/_variable";
@import "~/assets/css/foundation/_utility";

.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(#fff, 0.4);
    backdrop-filter: blur(4px);
  }
  &-window {
    background: #fff;
    overflow: hidden;
    position: relative;
    width: 100%;
    max-width: calc(570px + 4rem);
    box-shadow: 0px 0px 18px 2px rgba(#000, 0.1);
  }
  &-content {
    padding: to-vw($width-gutter--sp);
    @include mq(landscape) {
      padding: to-em($width-gutter--sp);
    }
    @include mq() {
      padding: 2em;
    }
  }
}
.media-details {
  position: relative;
  display: block;
  margin: 0 0 0 auto;
  width: to-vw($width-col-4--sp);
  @include mq() {
    margin: 0;
    width: 100%;
  }
  &::before {
    content:"";
    display: block;
    padding-top: 100%;
    @include mq(landscape) {
      padding-top: calc(100vh - #{to-em($width-gutter--sp)} * 2);
    }
    @include mq() {
      padding-top: 100%;
    }
  }
  &__image {
    display: block;
    text-align: center;
    max-width: 570px;
    max-height: 570px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    @include mq(landscape) {
      width: calc(100vh - #{to-em($width-gutter--sp)} * 2);
      height: calc(100vh - #{to-em($width-gutter--sp)} * 2);
      margin: auto;
    }
    @include mq() {
      width: 100%;
      height: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      vertical-align: middle;
    }
  }
}
.btn {
  font-size: 0;
  width: 44px;
	height: 44px;
  background: none;
  border: 0;
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  span {
    display: block;
    width: 2rem;
    height: 2rem;
    padding: 3px;
    position: absolute;
    top: 0;
    right: 0;
    &::before,
    &::after{
      content: "";
      display: block;
      width: 100%;
      height: 3px;
      background: #333;
      transform: rotate(45deg);
      position: absolute;
      top: 8px;
      right: 0;
    }
    &::after{
        transform: rotate(-45deg);
    }
  }
  &:focus {
    outline: none;
  }
}
.date {
  text-align: center;
  margin: to-em($spacing-small) 0 0 0;
  @include mq(s) {
    position: absolute;
    left: 0;
    bottom: to-vw($width-gutter--sp);
    writing-mode: vertical-rl;
    text-orientation: sideways;
  }
}
</style>
