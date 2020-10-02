<template>
  <v-app class="overflow-hidden">
    <Title />
    <v-sheet
      id="scrolling-pinterest"
      class="overflow-y-auto"
      max-height="93.5vh"
    >
      <v-container style="height: 100vh;">
        <nuxt />
      </v-container>
    </v-sheet>
  </v-app>
</template>

<script>
import Title from '~/components/layout/navbar'

export default {
  components: {
    Title
  }
}
</script>
<style>
.v-btn__content {
    text-transform: none !important;
    letter-spacing: normal !important;
}
</style>

<style lang="scss" scoped>

</style>