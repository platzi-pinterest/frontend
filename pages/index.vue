<template>
  <div class="mx-0 px-0 my-0 py-0">
    <Onboarding />
    <section class="fill-height" fluid>
      <h1 class="mx-auto my-10 fit-width-content">Get your next</h1>
      <h2 class="mx-auto my-5 fit-width-content">Special moment</h2>
      <div class="mt-10 py-10"><v-img src="/images/1.png" cover /></div>
    </section>
  </div>
</template>
<script>
import Onboarding from '~/components/layout/onboarding'

export default {
  components: {
    Onboarding
  },
  layout: 'single'
}
</script>
<style lang="scss" scoped>
h1 {
  font-size: 3rem;
}
h2 {
  font-size: 2rem;
}
.example {
  margin: auto;
}
</style>