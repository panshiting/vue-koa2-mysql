import {post} from '@/api'

// 登录
export function login (params) {
  return post('/auth/login', params)
}
