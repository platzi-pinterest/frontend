<template>
  <section class="fill-height" fluid>
    <v-row>
      <v-col
        v-for="item in items"
        :key="item"
        class="d-flex child-flex"
        cols="4"
      >
        <v-card
          class="mx-auto home-image"
          max-width="400"
          min-height="450"
          :style="'background: url(' + item.picture + ')'"
        >
          <v-card-title>
            <v-btn text class="home-button home-button-save" @click="goTo('/')">
              Save
            </v-btn>
          </v-card-title>

          <v-card-actions class="home-card-actions">
            <v-list-item class="grow">
              <v-row
                align="center"
                justify="end"
              >
                <v-btn v-if="item.link" text class="home-button home-button-actions home-button-text" @click="goTo(item.link, true)">
                  <v-icon>
                    mdi-arrow-top-right
                  </v-icon>
                  <span class="mr-1">{{ item.link.substring(0, 15) }}..</span>
                </v-btn>
                <v-menu offset-y>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      text
                      class="home-button home-button-actions"
                      v-bind="attrs"
                      v-on="on"
                    >
                      <svg
                        height="16"
                        width="16"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                        aria-label=""
                        role="img"
                      ><path d="M21 14c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2v-6c0-1.1.9-2 2-2s2 .9 2 2v4h14v-4c0-1.1.9-2 2-2zM8.82 8.84c-.78.78-2.05.79-2.83 0-.78-.78-.79-2.04-.01-2.82L11.99 0l6.02 6.01c.78.78.79 2.05.01 2.83-.78.78-2.05.79-2.83 0l-1.2-1.19v6.18a2 2 0 1 1-4 0V7.66L8.82 8.84z" /></svg>
                    </v-btn>
                  </template>
                  <v-list>
                    <v-list-item>
                      <v-list-item-title>
                        <p class="mx-auto fit-width-content">
                          Send this Pin
                        </p>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="home-width-content">
                        <v-button text class="mx-3 fit-width-content">
                          <svg
                            class="mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="48"
                            height="48"
                            version="1.1"
                          ><g id="surface1"><path d="M 48 24 C 48 37.253906 37.253906 48 24 48 C 10.746094 48 0 37.253906 0 24 C 0 10.746094 10.746094 0 24 0 C 37.253906 0 48 10.746094 48 24 Z M 48 24 " style="fill: rgb(37, 211, 102); stroke: transparent;" /><path d="M 33.851562 13.910156 C 28.871094 9.039062 21.070312 8.566406 15.539062 12.800781 C 10.011719 17.039062 8.4375 24.695312 11.851562 30.769531 L 9.871094 38 L 17.28125 36 C 19.332031 37.148438 21.644531 37.757812 24 37.769531 C 31.730469 37.769531 38 31.503906 38 23.769531 C 38.019531 20.058594 36.542969 16.496094 33.910156 13.878906 M 24 35.410156 C 21.921875 35.410156 19.878906 34.851562 18.089844 33.789062 L 17.671875 33.539062 L 13.269531 34.699219 L 14.441406 30.410156 L 14.128906 30 C 11.304688 25.523438 11.863281 19.707031 15.484375 15.847656 C 19.109375 11.992188 24.886719 11.074219 29.527344 13.621094 C 34.167969 16.164062 36.5 21.523438 35.199219 26.652344 C 33.898438 31.785156 29.292969 35.386719 24 35.410156 M 30.371094 26.710938 C 30.019531 26.539062 28.300781 25.710938 27.980469 25.578125 C 27.660156 25.449219 27.429688 25.398438 27.199219 25.75 C 26.96875 26.101562 26.300781 26.890625 26.089844 27.121094 C 25.878906 27.351562 25.679688 27.378906 25.328125 27.210938 C 24.304688 26.792969 23.359375 26.203125 22.53125 25.46875 C 21.765625 24.765625 21.109375 23.953125 20.578125 23.058594 C 20.378906 22.710938 20.578125 22.519531 20.738281 22.339844 C 20.898438 22.160156 21.089844 21.929688 21.261719 21.730469 C 21.40625 21.554688 21.523438 21.359375 21.609375 21.148438 C 21.71875 20.960938 21.71875 20.730469 21.609375 20.539062 C 21.519531 20.359375 20.820312 18.640625 20.53125 17.941406 C 20.238281 17.238281 19.960938 17.351562 19.75 17.339844 L 19 17.339844 C 18.640625 17.351562 18.304688 17.511719 18.070312 17.78125 C 17.269531 18.53125 16.820312 19.589844 16.839844 20.691406 C 16.957031 22.007812 17.453125 23.261719 18.269531 24.300781 C 19.773438 26.554688 21.84375 28.375 24.269531 29.578125 C 24.921875 29.859375 25.589844 30.105469 26.269531 30.308594 C 26.980469 30.527344 27.734375 30.578125 28.46875 30.449219 C 29.453125 30.25 30.308594 29.648438 30.828125 28.789062 C 31.058594 28.269531 31.128906 27.691406 31.03125 27.128906 C 30.941406 26.988281 30.710938 26.898438 30.359375 26.71875 " style="fill: rgb(255, 255, 255); stroke: transparent;" /></g></svg>
                          <p class="mx-auto my-0 fit-width-content">
                            WhatsApp
                          </p>
                        </v-button>
                      </v-list-item-title>
                      <v-list-item-title class="home-width-content">
                        <v-button text class="mx-3 fit-width-content">
                          <svg
                            class="mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 48 48"
                            width="48"
                            height="48"
                          ><title>f_logo_RGB-Blue_1024</title><g id="surface1"><path d="M 48 24 C 48 10.746094 37.253906 0 24 0 C 10.746094 0 0 10.746094 0 24 C 0 35.980469 8.777344 45.90625 20.25 47.707031 L 20.25 30.9375 L 14.15625 30.9375 L 14.15625 24 L 20.25 24 L 20.25 18.710938 C 20.25 12.699219 23.832031 9.375 29.316406 9.375 C 31.941406 9.375 34.6875 9.84375 34.6875 9.84375 L 34.6875 15.75 L 31.660156 15.75 C 28.679688 15.75 27.75 17.601562 27.75 19.5 L 27.75 24 L 34.40625 24 L 33.34375 30.9375 L 27.75 30.9375 L 27.75 47.707031 C 39.222656 45.90625 48 35.980469 48 24 Z M 48 24 " style="fill: rgb(24, 119, 242); stroke: transparent;" /><path d="M 33.34375 30.9375 L 34.40625 24 L 27.75 24 L 27.75 19.5 C 27.75 17.601562 28.679688 15.75 31.660156 15.75 L 34.6875 15.75 L 34.6875 9.84375 C 34.6875 9.84375 31.941406 9.375 29.316406 9.375 C 23.832031 9.375 20.25 12.699219 20.25 18.710938 L 20.25 24 L 14.15625 24 L 14.15625 30.9375 L 20.25 30.9375 L 20.25 47.707031 C 22.734375 48.097656 25.265625 48.097656 27.75 47.707031 L 27.75 30.9375 Z M 33.34375 30.9375 " style="fill: rgb(255, 255, 255); stroke: transparent;" /></g></svg>
                          <p class="mx-auto my-0 fit-width-content">
                            Facebook
                          </p>
                        </v-button>
                      </v-list-item-title>
                      <v-list-item-title class="home-width-content">
                        <v-button text class="mx-3 fit-width-content">
                          <svg
                            class="mx-auto"
                            viewBox="0 0 48 48"
                            width="48"
                            height="48"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          ><g id="surface1"><path d="M 48 24 C 48 37.253906 37.253906 48 24 48 C 10.746094 48 0 37.253906 0 24 C 0 10.746094 10.746094 0 24 0 C 37.253906 0 48 10.746094 48 24 Z M 48 24 " style="fill: rgb(13, 194, 255); stroke: transparent;" /><path d="M 19.609375 36.660156 C 30.253906 36.660156 36.070312 27.839844 36.070312 20.195312 C 36.070312 19.945312 36.070312 19.691406 36.058594 19.453125 C 37.1875 18.636719 38.171875 17.617188 38.953125 16.453125 C 37.921875 16.90625 36.804688 17.21875 35.628906 17.363281 C 36.828125 16.644531 37.738281 15.515625 38.171875 14.160156 C 37.054688 14.820312 35.820312 15.300781 34.5 15.5625 C 33.445312 14.4375 31.945312 13.738281 30.277344 13.738281 C 27.085938 13.738281 24.492188 16.332031 24.492188 19.523438 C 24.492188 19.980469 24.539062 20.425781 24.648438 20.84375 C 19.835938 20.605469 15.574219 18.300781 12.71875 14.796875 C 12.226562 15.648438 11.941406 16.644531 11.941406 17.699219 C 11.941406 19.703125 12.960938 21.480469 14.519531 22.511719 C 13.570312 22.488281 12.683594 22.222656 11.902344 21.792969 C 11.902344 21.816406 11.902344 21.839844 11.902344 21.863281 C 11.902344 24.671875 13.894531 27 16.546875 27.539062 C 16.066406 27.671875 15.550781 27.742188 15.023438 27.742188 C 14.652344 27.742188 14.292969 27.707031 13.933594 27.636719 C 14.664062 29.941406 16.800781 31.609375 19.332031 31.65625 C 17.351562 33.203125 14.855469 34.128906 12.144531 34.128906 C 11.675781 34.128906 11.21875 34.105469 10.765625 34.042969 C 13.296875 35.699219 16.34375 36.660156 19.609375 36.660156 " style="fill: rgb(255, 255, 255); stroke: transparent;" /></g></svg>
                          <p class="mx-auto my-0 fit-width-content">
                            Twitter
                          </p>
                        </v-button>
                      </v-list-item-title>
                      <v-list-item-title class="home-width-content">
                        <v-button text class="mx-3 fit-width-content">
                          <svg
                            class="mx-auto"
                            width="48"
                            height="48"
                            viewBox="0 0 36 36"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                          ><g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle id="Oval" fill="#EFEFEF" cx="18" cy="18" r="18" /><g transform="translate(9.000000, 12.000000)" fill="#111111" fill-rule="nonzero"><path d="M16.7972727,2.052 L10.5905455,8.14909091 C10.152,8.57945455 9.576,8.79545455 9,8.79545455 C8.424,8.79545455 7.848,8.57945455 7.40863636,8.14909091 L1.20190909,2.052 C0.962181818,1.81636364 0.962181818,1.43427273 1.20190909,1.19863636 C1.44163636,0.963818182 1.83027273,0.963818182 2.07,1.19863636 L8.27672727,7.29572727 C8.67518182,7.68845455 9.324,7.68845455 9.72327273,7.29572727 L15.9291818,1.19863636 C16.1689091,0.963818182 16.5575455,0.963818182 16.7972727,1.19863636 C17.037,1.43427273 17.037,1.81636364 16.7972727,2.052 Z M0,11.4545455 L18,11.4545455 L18,0 L0,0 L0,11.4545455 Z" /></g></g></svg>
                          <p class="mx-auto my-0 fit-width-content">
                            Email
                          </p>
                        </v-button>
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title class="home-width-content">
                        <v-button text class="mx-3 fit-width-content">
                          <svg
                            class="mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            width="48"
                            height="48"
                            viewBox="0 0 36 36"
                            version="1.1"
                          ><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><circle fill="#EFEFEF" cx="18" cy="18" r="18" /><g id="Icons/link" transform="translate(9.000000, 9.000000)" fill="#111111" fill-rule="nonzero"><path id="path-1" d="M15.75075,5.43075 L12.711,8.46975 L11.916,7.67475 L12.42,7.17075 C12.8595,6.732 12.8595,6.0195 12.42,5.58 C11.9805,5.14125 11.268,5.14125 10.82925,5.58 L10.326,6.084 L9.53025,5.289 L12.56925,2.25 L15.75075,5.43075 Z M8.46975,12.71175 L5.43075,15.75075 L2.24925,12.57 L5.289,9.53025 L6.08325,10.32525 L5.58,10.82925 C5.14125,11.26875 5.14125,11.9805 5.58,12.42 C6.01875,12.8595 6.732,12.85875 7.17075,12.42 L7.674,11.916 L8.46975,12.71175 Z M10.97925,0.65925 L7.9395,3.69825 C7.06125,4.5765 7.06125,6.00075 7.9395,6.87975 L8.73525,7.67475 L7.674,8.73525 L6.879,7.9395 C6.00075,7.06125 4.5765,7.06125 3.69825,7.9395 L0.65925,10.9785 C-0.21975,11.8575 -0.21975,13.28175 0.65925,14.16 L3.84,17.3415 C4.71825,18.21975 6.1425,18.21975 7.02075,17.3415 L10.0605,14.3025 C10.93875,13.4235 10.93875,11.99925 10.0605,11.121 L9.2655,10.32525 L10.326,9.2655 L11.121,10.0605 C11.99925,10.93875 13.4235,10.93875 14.30175,10.0605 L17.34075,7.0215 C18.21975,6.14325 18.21975,4.719 17.34075,3.84 L14.16,0.65925 C13.28175,-0.21975 11.8575,-0.21975 10.97925,0.65925 Z" /></g></g></svg>
                          <p class="mx-auto my-0 fit-width-content">
                            Copy Link
                          </p>
                        </v-button>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>

                <v-btn text class="home-button home-button-actions">
                  <v-menu
                    top
                    :offset-x="offset"
                    rounded
                    class="mx-0 my-0 px-0 py-0"
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        icon
                        v-bind="attrs"
                        color="black"
                        v-on="on"
                      >
                        <v-icon>
                          mdi-dots-horizontal
                        </v-icon>
                      </v-btn>
                    </template>

                    <v-list>
                      <v-list-item-title>
                        <p class="mx-5 my-5 black--text">
                          This Pin was inspired by your recent activity
                        </p>
                        <v-divider />
                      </v-list-item-title>
                      <v-list-item>
                        <v-list-item-title>
                          <v-button text class="home-button-open" @click="goTo(item.picture, true)">
                            Download image
                          </v-button>
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </v-menu>
                </v-btn>
              </v-row>
            </v-list-item>
          </v-card-actions>
        </v-card>
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
    goTo (url, open = false) {
      if (process.browser && typeof url !== 'undefined' && url) {
        if (open) {
          window.open(url, '_blank')
        } else {
          window.location.href = url
        }
      }
    },
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
<style lang="scss" scoped>
.add-complement {
  max-height: 24px;
}
</style>
