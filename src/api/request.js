import axios from 'axios'
import store from '@/store'

const request = axios.create()

/**
 * 请求拦截器
 */
request.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

/**
 * 响应拦截器
 */
request.interceptors.response.use(response => {
  return response.data
}, error => { // 错误处理
  if (error && error.response) {
    switch (error.response.status) {
      case 400:
        error.message = '请求错误'
        break
      case 401:
        error.message = '未授权，请登录'
        store.dispatch('FedLogOut')
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = `请求地址出错: ${error.response.config.url}`
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器内部错误'
        break
      case 501:
        error.message = '服务未实现'
        break
      case 502:
        error.message = '网关错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网关超时'
        break
      case 505:
        error.message = 'HTTP版本不受支持'
        break
      default:
    }
  }

  return Promise.reject(error)
})

export default request
