import {login} from '@/api/login'

const user = {
  state: {
    token: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    async LoginByUsername ({commit, rootState}, params) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await login(params)
          commit('SET_TOKEN', res.token)
          localStorage.setItem('token', res.token)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    }
  }
}

export default user
