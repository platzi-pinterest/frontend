<template>
  <v-card
    class="mx-auto"
    max-width="800"
    outlined
  >
    <v-img
      v-if="form.picture"
      :src="form.picture"
      max-width="500"
      class="mx-auto my-10"
    />
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ form.title }}
        </v-list-item-title>
        <v-list-item-subtitle class="mb-10">
          {{ form.about }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  data () {
    return {
      profile: {},
      form: {
        title: '',
        about: '',
        link: '',
        board: '8b3e5c6a-812e-4a06-aaee-634a78ea5d20',
        file: null
      },
      // Buttons
      disabledButton: false,
      loadingButton: false,
      // Alerts
      alert: '',
      success: '',
      // Data
      step: 0,
      file: '',
      dataProfile: '',
      uploadZero: false,
      // Validation
      rules: {
        requiredSingle: (value) => {
          const response = !!value || 'Este campo es requerido.'
          return response
        },
        requiredCustome: (value, field) => {
          const response = !!value || field
          this.showAlert(response)
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
        checkPhone: (value) => {
          if (value) {
            const pattern = /^\D?[0-9]{3}\D?\s?[0-9]{3}\D?\s?[0-9]{4}$/
            const response =
                (pattern.test(value) && (value === '' || value.length <= 10)) ||
                'El número de télefono debe tener mínimo 10 dígitos sin espacios, letras o caracteres especiales.'
            if (typeof response === 'string' || response instanceof String) {
              this.showAlert(response)
              // } else {
              //   this.showAlert('')
            }
            return response
          }
          return ''
        },
        mainImage: () => {
          const checkValues = typeof this.form !== 'undefined' && this.form !== null && typeof this.form.file !== 'undefined' && this.form.file !== null && typeof this.form.file.url !== 'undefined' && this.uploadZero
          const response = checkValues || 'Se requiere la imagen.'
          this.showAlert(response)
          return response
        },
        checkSize: (element, field) => {
          const response = (element && element.length > 0) || field
          this.showAlert(response)
          return response
        }
      }
    }
  },
  mounted () {
    this.getInfo()
  },
  methods: {
    goTo (url) {
      if (process.browser && typeof url !== 'undefined' && url) {
        window.location.href = url
      }
    },
    async getInfo () {
      const pin = this.$route.params.id
      await this.$store
        .dispatch('home/pin', pin)
        .then((response) => {
          if (response.status === 200) {
            this.form = response.data.data
          }
        })
    },
    // Files
    pickFile () {
      document.getElementById('formfilesimages').value = ''
      this.$refs.formfilesimages.click()
    },
    onPickedFile (e) {
      const files = e.target.files
      // eslint-disable-next-line no-console
      console.log(files)
      const data = {}
      if (files[0] !== undefined) {
        const file = files[0]
        data.name = file.name
        const formatTypesAccepted = /(\.|\/)(png|jpg|jpeg)$/i
        if (!formatTypesAccepted.test(file.type)) {
          this.showAlert(`El archivo seleccionado no tiene un formato permitido type${!formatTypesAccepted.test(file.type)} type ${file.type}`)
          data.name = ''
          data.url = ''
          data.file = ''
          return null
        } else if (file.size >= 2000000) {
          this.showAlert('NO puede añadir un archivo mayor a 2 MB')
          data.name = ''
          data.url = ''
          data.file = ''
          return null
        } else if (data.name.lastIndexOf('.') <= 0) {
          return null
        }
        const fr = new FileReader()
        fr.readAsDataURL(file)
        fr.addEventListener('load', () => {
          data.picture = file // this is an image file that can be sent to server...
          data.url = fr.result
          this.profile.file = data.url
          this.file = data
          this.uploadZero = true
          this.form.file = data
        })
      } else {
        data.name = ''
        data.url = ''
        data.file = ''
      }
    },
    createPin () {
      const response = this.validationStep()
      if (!response) {
        this.customButtons(false)
        return null
      }
      this.$store
        .dispatch('home/createpin', this.form)
        .then((response) => {
          if (response.status === 201) {
            this.goTo('/home')
          }
        })
    },
    // Validation Steps
    validationStep () {
      this.customButtons(true)
      const check = []
    //   if (typeof this.form !== 'undefined' && typeof this.form.file !== 'undefined' && this.form.file !== null && this.form.file !== null && this.uploadZero) {
    //     check.push(this.rules.mainImage())
    //   }
    //   check.push(this.rules.required(this.form.name, 'Nombre'))
    //   check.push(this.rules.required(this.form.lastName, 'Apellido'))
    //   check.push(this.rules.required(this.form.email, 'Correo electrónico'))
    //   check.push(this.rules.email(this.form.email))
    //   check.push(this.rules.required(this.form.phone, 'Número de teléfono'))
    //   check.push(this.rules.checkPhone(this.form.phone))

      let response = true
      // Set Post
      check.forEach((element) => {
        if (typeof element === 'string' || element instanceof String) {
          this.showAlert(element)
          response = false
        }
      })
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
      // // eslint-disable-next-line no-console
      // console.log(response)
      if (typeof response === 'string' || response instanceof String) {
        this.alert = response
        this.customButtons(false)
      }
    },
    showSuccess (response) {
      if (typeof response === 'string' || response instanceof String) {
        this.success = response
        this.customButtons(false)
        setTimeout(function () { this.success = '' }, 5000)
      }
    },
    showError (error) {
      if (error.response) {
        if (error.response.status === 400) {
          if (error.response.data.code === 102) {
            this.showAlert(error.response.data.data.message)
          } else {
            this.showAlert(error.response.data.data.message)
          }
        }
      }
      this.customButtons(false)
    }
  }
}
</script>

<style>

</style>
