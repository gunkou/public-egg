<template>
  <footer :class="className" class="site-footer">
    <small  class="site-footer__copy">(c) 2020 Public Egg</small>
  </footer>
</template>


<script>
export default {
  props: ['className']
}
</script>

<style lang="scss">
.site-footer {
  &__copy {
    display: block;
    font-style: normal;
    text-align: center;
  }
}
</style>
