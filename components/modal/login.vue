<template>
  <div>
    <v-dialog
      v-model="dialog"
      max-width="600px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          class="home-button home-button-save"
          v-bind="attrs"
          v-on="on"
        >
          Login
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <div class="headline px-auto mx-auto" style="align-items: center">
            <div class="mx-auto fit-width-content">
              <svg
                class="mx-auto my-auto fit-width-content"
                height="24"
                width="24"
                viewBox="0 0 24 24"
                aria-hidden="true"
                fill="#e60023"
                role="img"
              ><path d="M0 12c0 5.123 3.211 9.497 7.73 11.218-.11-.937-.227-2.482.025-3.566.217-.932 1.401-5.938 1.401-5.938s-.357-.715-.357-1.774c0-1.66.962-2.9 2.161-2.9 1.02 0 1.512.765 1.512 1.682 0 1.025-.653 2.557-.99 3.978-.281 1.189.597 2.159 1.769 2.159 2.123 0 3.756-2.239 3.756-5.471 0-2.861-2.056-4.86-4.991-4.86-3.398 0-5.393 2.549-5.393 5.184 0 1.027.395 2.127.889 2.726a.36.36 0 0 1 .083.343c-.091.378-.293 1.189-.332 1.355-.053.218-.173.265-.4.159-1.492-.694-2.424-2.875-2.424-4.627 0-3.769 2.737-7.229 7.892-7.229 4.144 0 7.365 2.953 7.365 6.899 0 4.117-2.595 7.431-6.199 7.431-1.211 0-2.348-.63-2.738-1.373 0 0-.599 2.282-.744 2.84-.282 1.084-1.064 2.456-1.549 3.235C9.584 23.815 10.77 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12" /></svg>
            </div>
            <p class="mx-auto fit-width-content">
              Welcome to Pinterest
            </p>
          </div>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row class="mx-auto fit-max-width-content">
              <v-col cols="12" class="my-2 py-0">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  required
                  outlined
                  type="email"
                  :rules="[rules.requiredSingle]"
                  hide-details
                />
              </v-col>
              <v-col cols="12" class="my-2 py-0">
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  outlined
                  class="text-field"
                  :rules="[rules.requiredSingle, rules.min]"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  required
                  @click:append="show = !show"
                  @keyup.enter="login()"
                />
              </v-col>
            </v-row>
            <v-row class="my-0 ml-10">
              <v-btn text elevation="0" class="forget-password" @click="alert = ''; step = 1">
                ¿Se te olvido tu contraseña?
              </v-btn>
            </v-row>
            <p class="mx-auto mr-12 fit-width-content">
              *indicates required field
            </p>
          </v-container>
        </v-card-text>
        <v-card-actions class="my-0">
          <v-btn
            class="mx-auto mb-5 fit-width-content"
            large
            color="home-button home-button-save big-button"
            @click="login()"
          >
            Log in
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
      showData: false,
      step: 0,
      dialog: false,
      alert: '',
      success: '',
      // Align Content
      alignment: 'center',
      justify: 'center',
      // Btn Actions
      loadingButton: false,
      disabledButton: false,
      // Form
      show: false,
      form: {
        email: null,
        password: null
      },
      profile: {},
      rules: {
        requiredCustome: (value, field) => {
          const response = !!value || field
          this.showAlert(response)
          return response
        },
        requiredSingle: (value) => {
          const response = !!value || 'Este campo es requerido.'
          return response
        },
        required: (value, field) => {
          const response = !!value || 'El ' + field + ' es requerido.'
          this.showAlert(response)
          return response
        },
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          const response = pattern.test(value) || 'Correo electronico invalido.'
          this.showAlert(response)
          return response
        },
        min: (value) => {
          const response = (value && value.length >= 4) || 'Mínimo 4 caracteres'
          return response
        }
      }
    }
  },
  methods: {
    showErrors (data = false) {
      if (data) {
        this.$toast.error('Próximamente')
      }
    },
    goTo (url) {
      if (process.browser && typeof url !== 'undefined' && url) {
        window.location.href = url
      }
    },
    logOut () {
      this.$cookie.removeAll()
      this.$store.dispatch('cleanAll')
      this.goTo('/')
    },
    async getInfoProfile () {
      await this.$store
        .dispatch('onboarding/myUser')
        .then((response) => {
          if (response.status === 200 && response.data.code === 100) {
            this.profile = response.data.body
            this.profile.file = process.env.URL_IMG + this.profile.file
          }
        // eslint-disable-next-line handle-callback-err
        }).catch((err) => {
          // eslint-disable-next-line no-console
          console.err(err)
          this.$cookie.removeAll()
          this.$store.dispatch('cleanAll')
          this.goTo('/')
        })
    },
    checkIfIsLogin () {
      let authToken
      if (process.browser && localStorage.getItem('authToken')) {
        authToken = localStorage.getItem('authToken')
      }
      return authToken
    },
    closeWindow () {
      this.dialog = false
      this.alert = ''
      this.step = 0
    },
    async login () {
      const data = this.validationInputs()
      if (!data) {
        return
      }
      await this.$store
        .dispatch('onboarding/login', this.form)
        .then((response) => {
          this.alert = ''
          if (response.status === 200) {
            // Change View
            window.location.href = '/home'
            this.closeWindow()
          } else {
            this.showAlert(response.data.message)
          }
        })
        .catch((error) => {
          this.form.password = ''
          if (error.response) {
            if (error.response.status === 400) {
              const content = error.response.data
              this.showAlert(content.message)
            }
          }
          this.customButtons(false)
        })
    },
    async forget () {
      const data = this.validationInputs(false)
      if (!data) {
        return
      }
      await this.$store
        .dispatch('onboarding/forget', this.form)
        .then((response) => {
          const content = response.data
          this.alert = ''
          if (response.status === 200) {
            this.showSuccess(content.message)
            setTimeout(function () {
              this.goTo('/')
            }, 2000)
            // this.closeWindow()
          } else {
            this.showAlert(response.data.message)
          }
        })
        .catch((error) => {
          this.form.password = ''
          if (error.response) {
            if (error.response.status === 400) {
              const content = error.response.data
              this.showAlert(content.message)
            }
          }
          this.customButtons(false)
        })
    },
    validationInputs (login = true) {
      // Check Values
      const check = []
      if (login) {
        check.push(this.rules.min(this.form.password))
        check.push(this.rules.requiredCustome(
          this.form.password,
          'La Contraseña es requerida'
        ))
      }
      check.push(this.rules.email(this.form.email))
      check.push(this.rules.required(
        this.form.email,
        'Correo electronico'
      ))
      return this.checkData(check)
    },
    checkData (check) {
      let response = true
      // Set Post
      this.alert = ''
      check.forEach((element) => {
        if (typeof element === 'string' || element instanceof String) {
          this.showAlert(element)
          response = false
        }
      })
      // this.customButtons(response)
      return response
    },
    // Actions Base
    customButtons (value) {
      // Buttons Actions
      this.loadingButton = value
      this.disabledButton = value
      if (value) {
        this.alert = ''
      }
    },
    // Alerts
    showAlert (response) {
      this.alert = ''
      if (typeof response === 'string' || response instanceof String) {
        this.alert = response
      }
    },
    showSuccess (response) {
      if (typeof response === 'string' || response instanceof String) {
        this.success = response
        this.customButtons(false)
        setTimeout(function () {
          this.success = ''
        }, 5000)
      }
    },
    showError (error) {
      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data.code === 102) {
            this.showAlert(error.response.data.message)
          } else {
            this.showAlert(error.response.data.message)
          }
        }
      }
      this.customButtons(false)
    }
  }
}
</script>
<style lang="scss" scoped>
.example {
    display: none;
}
.big-button {
    width: 70%;
}
</style>
