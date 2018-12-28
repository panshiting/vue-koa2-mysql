import {login} from '@/api/login'
import {getUser} from '@/api/user'

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
    // 登录
    LoginByUsername ({commit, rootState}, params) {
      return new Promise(async (resolve, reject) => {
        try {
          const res = await login(params)
          commit('SET_TOKEN', res.token)
          commit('SET_USERNAME', res.user_name)
          commit('SET_USERID', res.user_id)
          localStorage.setItem('token', res.token)
          localStorage.setItem('userId', res.user_id)
          resolve(res)
        } catch (e) {
          reject(e)
        }
      })
    },
    // 获取用户信息
    getUserInfo ({commit, rootState}) {
      return new Promise(async (resolve, reject) => {
        try {
          const {user} = await getUser(localStorage.getItem('userId'))
          commit('SET_USERNAME', user.user_name)
          commit('SET_USERID', user.id)
          commit('SET_TOKEN', localStorage.getItem('token'))
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    }
  }
}

export default user
