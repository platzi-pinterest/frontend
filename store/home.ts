/**
 * Init Constructor TS
 *
 * @author Miguel Ángel <ingeniero.miguelvargas@gmail.com>
 */

// Load Library
import axios from 'axios'

/* Init variables */
// Add Config
const nameHeaders = [
  'X-' + process.env.SHORT_NAME + '-Access-Token',
  'Authorization'
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
  setHeader (state: any, position: number) {
    let access
    switch (position) {
      case 0:
        access = localStorage.getItem('accessToken') || getters.getAccessToken(state) || state.accessToken
        break
      case 1:
        access = localStorage.getItem('authToken') || getters.getAuthToken(state) || state.authToken
        access = 'Token ' + access
        break
    }
    // Config Headers
    const config = {
      withCredentials: false,
      headers: {
        tempHeader: access,
        'Content-Type': 'application/json'
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

export const actions = { // Methods
  allPhotos () {
    return new Promise((resolve, reject) => {
      axios
        .get(URL.API + 'pin/')
        .then((response: any) => {
          resolve(response)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  },
  pin ({ commit, getters }: {
    commit: any, getters: any
  }, id: string) {
    return new Promise((resolve, reject) => {
      // Create formdata
      commit('setHeader', 1)
      axios
        .get(URL.API + 'pin/' + id + '/', getters.getHeaders)
        .then((response: any) => {
          resolve(response)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  },
  // Update Profile
  createpin  ({ commit, getters }: {
    commit: any, getters: any
  }, form: any) {
    return new Promise((resolve, reject) => {
      if (typeof form === 'undefined') { reject(new Error('No data in the form')) }
      // Make Actions
      // eslint-disable-next-line no-console
      const dataSend = new FormData()
      dataSend.append('title', form.title)
      dataSend.append('about', form.about)
      dataSend.append('link', form.link)
      dataSend.append('board', form.board)
      // Files
      commit('setHeader', 1, 'multipart/form-data')
      dataSend.append('picture', form.file.picture)
      axios
        .post(URL.API + 'pin/', dataSend, getters.getHeaders)
        .then(function (json: any) {
          resolve(json)
        })
        .catch(function (error: any) {
          reject(error)
        })
    })
  }
}
