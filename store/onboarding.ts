/**
 * Init Constructor TS - Kubo
 * @author Miguel Ángel <mtorres@kubo.co>
 */
/** CONFIG BASE  **/
// Load Library
import axios from 'axios'
import sha1 from 'crypto-js/sha1'
/* Init variables */
// Add Config
const nameHeaders = [
  'X-' + process.env.SHORT_NAME + '-Access-Token',
  'X-' + process.env.SHORT_NAME + '-Auth-Token'
]
const URL = {
  API: process.env.URL_API
}
// Variables
export const state = () => ({
  accessToken: '',
  authToken: '',
  headers: {}
})
// Setters
export const mutations = {
  setAccessToken (state: any, newAccessToken: string) {
    state.accessToken = newAccessToken
  },
  setAuthToken (state: any, newAuthToken: string) {
    state.authToken = newAuthToken
  },
  setHeader (state: any, position: number, typeContent = 'application/json') {
    let access
    switch (position) {
      case 0:
        access = localStorage.getItem('accessToken') || getters.getAccessToken(state) || state.accessToken
        break
      case 1:
        access = localStorage.getItem('authToken') || getters.getAuthToken(state) || state.authToken
        break
    }
    // Config Headers
    const config = {
      withCredentials: false,
      headers: {
        tempHeader: access,
        'Content-Type': typeContent
      }
    }
    const headers = config.headers
    const object: any = (Object.getOwnPropertyDescriptor(headers, 'tempHeader')) // { get, set, ... }

    if (position === 0) {
      Object.defineProperty(headers, nameHeaders[position], object)
    } else {
      Object.defineProperty(headers, nameHeaders[position].toLowerCase(), object)
    }
    delete config.headers.tempHeader
    // Set header
    // return config
    state.headers = config
  }
}

// Getters
export const getters = {
  getAccessToken (state: any) {
    return state.accessToken
  },
  getAuthToken (state: any) {
    return state.authToken
  },
  getHeaders (state: any) {
    return state.headers
  }
}
/** CONFIG BASE  **/
export const actions = { // Methods
  // Login
  login  ({ commit, getters }: {
    commit: any, getters: any
  }, form: any) {
    return new Promise((resolve, reject) => {
      if (typeof form === 'undefined') { reject(new Error('No data in the form')) }
      const request = form
      request.password = sha1(request.password).toString()
      // Make Actions
      axios
        .post(URL.API + 'users/login/', request)
        .then(function (json: any) {
          const authToken = json.data.data.authToken
          commit('setAuthToken', authToken)
          if (process.browser) {
            localStorage.setItem('authToken', authToken)
          }
          resolve(json)
        })
        .catch(function (error: any) {
          reject(error)
        })
    })
  },
  // signUp
  signup  ({ commit, getters }: {
    commit: any, getters: any
  }, form: any) {
    return new Promise((resolve, reject) => {
      if (typeof form === 'undefined') { reject(new Error('No data in the form')) }
      const request = form
      request.password = sha1(request.password).toString()
      // Make Actions
      axios
        .post(URL.API + 'users/signup/', request)
        .then(function (json: any) {
          resolve(json)
        })
        .catch(function (error: any) {
          reject(error)
        })
    })
  },
  /** FORGET **/
  // forget
  forget  ({ commit, getters }: {
    commit: any, getters: any
  }, form: any) {
    return new Promise((resolve, reject) => {
      if (typeof form === 'undefined') { reject(new Error('No data in the form')) }
      // Create formdata
      commit('setHeader', 0)
      // eslint-disable-next-line no-console
      // const dataSend = new FormData()
      // dataSend.append('email', form.email)
      // Make Actions
      axios
        .post(URL.API + 'onboarding/recovery-password', { email: form.email }, getters.getHeaders)
        .then(function (json: any) {
          resolve(json)
        })
        .catch(function (error: any) {
          reject(error)
        })
    })
  },
  // validateCode
  validateCode  ({ commit, getters }: {
    commit: any, getters: any
  }, form: any) {
    return new Promise((resolve, reject) => {
      if (typeof form === 'undefined') { reject(new Error('No data in the form')) }
      // Create formdata
      commit('setHeader', 0)
      // eslint-disable-next-line no-console
      const dataSend = new FormData()
      dataSend.append('code', form.code)
      // Make Actions
      axios
        .post(URL.API + 'onboarding/valid-code', dataSend, getters.getHeaders)
        .then(function (json: any) {
          resolve(json)
        })
        .catch(function (error: any) {
          reject(error)
        })
    })
  },
  // Recovery Password
  recovery  ({ commit, getters }: {
    commit: any, getters: any
  }, form: any) {
    return new Promise((resolve, reject) => {
      if (typeof form === 'undefined') { reject(new Error('No data in the form')) }
      // Create formdata
      commit('setHeader', 0)
      // eslint-disable-next-line no-console
      const dataSend = new FormData()
      dataSend.append('code', form.code)
      dataSend.append('password', form.password)
      // Make Actions
      axios
        .post(URL.API + 'onboarding/change-password', dataSend, getters.getHeaders)
        .then(function (json: any) {
          resolve(json)
        })
        .catch(function (error: any) {
          reject(error)
        })
    })
  },
  /** REGISTER **/
  // Register User
  register  ({ commit, getters }: {
    commit: any, getters: any
  }, form: any) {
    return new Promise((resolve, reject) => {
      if (typeof form === 'undefined') { reject(new Error('No data in the form')) }
      // Create formdata
      commit('setHeader', 0)
      // eslint-disable-next-line no-console
      const dataSend = new FormData()
      dataSend.append('name', form.name)
      dataSend.append('lastName', form.lastName)
      dataSend.append('email', form.email)
      dataSend.append('phone', form.phone)
      dataSend.append('password', form.password)
      // Make Actions
      axios
        .post(URL.API + 'onboarding/register/user', dataSend, getters.getHeaders)
        .then(function (json: any) {
          resolve(json)
        })
        .catch(function (error: any) {
          reject(error)
        })
    })
  },
  // Register User
  updateUser  ({ commit, getters }: {
    commit: any, getters: any
  }, form: any) {
    return new Promise((resolve, reject) => {
      if (typeof form === 'undefined') { reject(new Error('No data in the form')) }
      // Create formdata
      commit('setHeader', 1)
      // Make Actions
      axios
        .post(URL.API + 'onboarding/register/user', form, getters.getHeaders)
        .then(function (json: any) {
          resolve(json)
        })
        .catch(function (error: any) {
          reject(error)
        })
    })
  },
  logout ({ commit, getters }: {
    commit: any, getters: any
  }) {
    return new Promise((resolve, reject) => {
      // Create formdata
      commit('setHeader', 1)
      axios
        .get(URL.API + 'onboarding/logout', getters.getHeaders)
        .then(function (json: any) {
          resolve(json)
        })
        .catch(function (error: any) {
          reject(error)
        })
      if (process.browser) {
        localStorage.clear()
      }
    })
  },
  // Get Data User
  dataUser ({ commit, getters }: {
      commit: any, getters: any
    }) {
    return new Promise((resolve, reject) => {
      // Create formdata
      commit('setHeader', 1)
      axios
        .get(URL.API + 'user-details', getters.getHeaders)
        .then((response: any) => {
          resolve(response)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  },
  myUser ({ commit, getters }: {
      commit: any, getters: any
    }) {
    return new Promise((resolve, reject) => {
      // Create formdata
      commit('setHeader', 1)
      axios
        .get(URL.API + 'onboarding/profile', getters.getHeaders)
        .then((response: any) => {
          resolve(response)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  },
  // Update Profile
  updateProfile  ({ commit, getters }: {
    commit: any, getters: any
  }, form: any) {
    return new Promise((resolve, reject) => {
      if (typeof form === 'undefined') { reject(new Error('No data in the form')) }
      // Create formdata
      commit('setHeader', 1)
      // Make Actions
      // eslint-disable-next-line no-console
      const dataSend = new FormData()
      dataSend.append('name', form.name)
      dataSend.append('lastName', form.lastName)
      dataSend.append('email', form.email)
      dataSend.append('phone', form.phone)
      // Files
      if (typeof form !== 'undefined' && typeof form.file !== 'undefined' && form.file !== null && form.file !== null) {
        commit('setHeader', 1, 'multipart/form-data')
        // eslint-disable-next-line no-console
        console.log(form.file.file)
        dataSend.append('main', form.file.file)
        // headers: {
        //   tempHeader: access,
        //   'Content-Type': 'application/json'
        // }
      }
      axios
        .put(URL.API + 'student/update-profile', dataSend, getters.getHeaders)
        .then(function (json: any) {
          resolve(json)
        })
        .catch(function (error: any) {
          reject(error)
        })
    })
  }
}
