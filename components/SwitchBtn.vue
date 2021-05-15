
<template>
  <div class="switch">
    <div class="switch__title">{{ label }}</div>
    <label class="switch__label">
      <input class="switch__input"
      type="checkbox"
      :checked="isSwitch"
      @change="$emit('change-switcher', false)"
      >
      <span class="switch__slider"></span>
      <span class="switch__text switch__text--col1">1</span>
      <span class="switch__text switch__text--col2">2</span>
    </label>
  </div>
</template>

<script>
export default {
  props: {
    isSwitch: Boolean,
    label: String
  }
}
</script>

<style lang="scss" scoped>
@import "~/assets/css/foundation/_variable";
@import "~/assets/css/foundation/_utility";

.switch {
  $slider: "";
  font-size: to-em($font-size-base, $font-size-base);

  &__title {
    display: block;
    margin: 0 0 0.1rem 0;
    font-size: to-vw($font-size-small);
    @include mq(landscape) {
      font-size: to-em($font-size-small, $font-size-base);
    }
    @include mq() {
      font-size: to-em($font-size-small, $font-size-base);
    }
  }
  &__label {
    position: relative;
    display: inline-block;
    width: to-vw(60px);
    height: to-vw(34px);
    @include mq(landscape) {
      width: to-em(60px, $font-size-base);
      height: to-em(34px, $font-size-base);
    }
    @include mq() {
      width: to-em(60px, $font-size-base);
      height: to-em(34px, $font-size-base);
    }
  }
  &__slider {
    $slider: &;

    cursor: pointer;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: #ccc;
    transition: .4s;
    border-radius: to-vw(34px);
    @include mq(landscape) {
      border-radius: to-em(34px, $font-size-base);
    }
    @include mq() {
      border-radius: to-em(34px, $font-size-base);
    }
    &::before {
      position: absolute;
      content: "";
      height: to-vw(26px);
      width: to-vw(26px);
      left: to-vw(4px);
      bottom: to-vw(4px);
      background-color: #fff;
      transition: .4s;
      z-index: 2;
      border-radius: 50%;
      @include mq(landscape) {
        height: to-em(26px, $font-size-base);
        width: to-em(26px, $font-size-base);
        left: to-em(4px, $font-size-base);
        bottom: to-em(4px, $font-size-base);
      }
      @include mq() {
        height: to-em(26px, $font-size-base);
        width: to-em(26px, $font-size-base);
        left: to-em(4px, $font-size-base);
        bottom: to-em(4px, $font-size-base);
      }
    }
  }
  &__input {
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + #{$slider}::before {
      transform: translateX(to-vw(26px));
      @include mq(landscape) {
        transform: translateX(to-em(26px, $font-size-base));
      }
      @include mq() {
        transform: translateX(to-em(26px, $font-size-base));
      }
    }
  }
  &__text {
    position: absolute;
    z-index: 0;
    top: to-vw(10px);
    font-size: to-vw($font-size-small);
    @include mq(landscape) {
      font-size: to-em($font-size-small, $font-size-base);
      top: to-em(10px, $font-size-small);
    }
    @include mq() {
      font-size: to-em($font-size-small);
      top: to-em(10px, $font-size-small);
    }
    &--col1 {
      right: to-vw(10px);
      @include mq(landscape) {
        right: to-em(10px, $font-size-small);
      }
      @include mq() {
        right: to-em(10px, $font-size-small);
      }
    }
    &--col2 {
      left: to-vw(10px);
      @include mq(landscape) {
        left: to-em(10px, $font-size-small);
      }
      @include mq() {
        left: to-em(10px, $font-size-small);
      }
    }
  }
}
</style>
