import {login} from '@/api/login'

const user = {
  state: {
    token: '',
    userName: '',
    userId: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERNAME: (state, userName) => {
      state.userName = userName
    },
    SET_USERID: (state, userId) => {
      state.userId = userId
    }
  },
  actions: {
    async LoginByUsername ({commit, rootState}, params) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await login(params)
          commit('SET_TOKEN', res.token)
          commit('SET_USERNAME', res.user_name)
          commit('SET_USERID', res.user_id)
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
