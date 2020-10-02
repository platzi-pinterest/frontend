<template>
  <v-app>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  mounted () {
    this.$store.dispatch('generateAccessToken')
    if (process.browser) {
      if (typeof localStorage.getItem('authToken') === 'undefined') {
        this.$cookie.removeAll()
        this.$store.dispatch('cleanAll')
      }
      this.$store.dispatch('generateAccessToken')
    }
  }
}
</script>
<style>
.v-btn__content {
    text-transform: none !important;
    letter-spacing: normal !important;
}
</style>
