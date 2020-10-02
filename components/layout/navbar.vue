<template>
  <div>
    <v-app-bar
      elevate-on-scroll
      scroll-target="#scrolling-pinterest"
    >
      <v-toolbar-title class="my-auto">
        <div class="my-auto nav-logo fix-navbar-icon" @click="goTo('/')">
          <svg
            height="24"
            width="24"
            viewBox="0 0 24 24"
            aria-hidden="true"
            class="my-auto"
            fill="#e60023"
            role="img"
          ><path d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.11-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12" /></svg>
        </div>
      </v-toolbar-title>

      <v-btn text class="nav-button nav-button-text mx-1" @click="goTo('/')">
        Home
      </v-btn>

      <v-btn text class="nav-button nav-button-text mx-1">
        Following
      </v-btn>
      <v-text-field
        filled
        label="Buscar"
        prepend-inner-icon="mdi-magnify"
        class="my-5"
        color="#52525262"
        hide-details
        rounded
        dense
      >
        <template v-if="false" v-slot:append-outer>
          <v-menu
            style="top: -12px"
            offset-y
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left>
                  mdi-menu
                </v-icon>
                Menu
              </v-btn>
            </template>
            <v-card>
              <v-card-text class="pa-6">
                <v-btn
                  large
                  flat
                  color="primary"
                  @click="clickMe"
                >
                  <v-icon left>
                    mdi-target
                  </v-icon>Click me
                </v-btn>
              </v-card-text>
            </v-card>
          </v-menu>
        </template>
      </v-text-field>
      <v-btn icon class="nav-button nav-button-icon mx-1">
        <v-icon>mdi-bell</v-icon>
      </v-btn>
      <v-btn icon class="nav-button nav-button-icon mx-1">
        <v-icon>mdi-chat-processing</v-icon>
      </v-btn>
      <v-btn icon class="nav-button nav-button-icon mx-1">
        <v-img
          lazy-src="https://picsum.photos/id/11/10/6"
          max-height="20"
          max-width="20"
          src="https://picsum.photos/id/11/500/300"
        />
      </v-btn>

      <v-menu
        left
        bottom
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            v-bind="attrs"
            class="nav-button nav-button-icon mx-1"
            v-on="on"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="n in 5"
            :key="n"
            @click="() => {}"
          >
            <v-list-item-title>Option {{ n }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  methods: {
    goTo (url) {
      if (process.browser && typeof url !== 'undefined' && url) {
        window.location.href = url
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.fix-navbar-icon {
  max-height: 24px;
}
</style>
