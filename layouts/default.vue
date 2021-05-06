<template>
  <div class="site-root">
    <SiteHeader className="site-root__header" />
    <main class="site-root__main">
      <nuxt />
    </main>
    <SiteFooter className="site-root__footer" />
  </div>
</template>

<script>
import SiteHeader from '~/components/SiteHeader.vue'
import SiteFooter from '~/components/SiteFooter.vue'

export default {
  components: {
    SiteHeader,
    SiteFooter
  }
}
</script>

<style>
</style>
