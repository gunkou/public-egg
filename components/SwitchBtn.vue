
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
.switch {
  $slider: "";

  &__title {
    display: block;
    margin: 0 0 0.1rem 0;
  }
  &__label {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
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
    border-radius: 34px;
    &::before {
      position: absolute;
      content: "";
      height: 26px;
      width: 26px;
      left: 4px;
      bottom: 4px;
      background-color: #fff;
      transition: .4s;
      z-index: 2;
      border-radius: 50%;
    }
  }
  &__input {
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + #{$slider}::before {
      transform: translateX(26px);
    }
  }
  &__text {
    position: absolute;
    top: 10px;
    z-index: 0;
    font-size: 12px;
    &--col1 {
      right: 10px;
    }
    &--col2 {
      left: 10px;
    }
  }
}
</style>
