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
  setHeader (state: any, position: number) {
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
  generateAccessToken ({ commit }: {
    commit: any
  }) {
    return new Promise((resolve, reject) => {
      axios
        .get(URL.API + process.env.SHORT_NAME!.toLocaleLowerCase() + '/generate-access-token', {
          withCredentials: false
        })
        .then((response: any) => {
          // Get Access Token
          const accessToken = response.data.body.accessToken
          commit('setAccessToken', accessToken)
          if (process.browser) {
            localStorage.setItem('accessToken', accessToken)
          }
          resolve(accessToken)
        })
        .catch((e: any) => {
          reject(e)
        })
    })
  },
  cleanAll ({ commit }:{
    commit: any
  }) {
    commit('setAccessToken', '')
    commit('setAuthToken', '')
    if (process.browser) {
      localStorage.setItem('accessToken', '')
      localStorage.setItem('authToken', '')
    }
  }
}
