<template>
  <section class="fill-height" fluid>
    <v-row>
      <v-col
        v-for="item in items"
        :key="item"
        class="d-flex child-flex"
        cols="4"
      >
        <v-img
          :src="item.picture"
          :lazy-src="item.picture"
          aspect-ratio="1"
          class="grey lighten-2"
        >
          <template v-slot:placeholder>
            <v-row
              class="fill-height ma-0"
              align="center"
              justify="center"
            >
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              />
            </v-row>
          </template>
        </v-img>
      </v-col>
    </v-row>
  </section>
</template>

<script>
export default {
  data () {
    return {
      items: []
    }
  },
  mounted () {
    this.getAllPhotos()
  },
  methods: {
    getAllPhotos () {
      this.$store.dispatch('home/allPhotos').then((response) => {
        if (response.status === 200) {
          this.items = response.data.data.results
        }
      })
    }
  }
}
</script>
