import {get, post} from '@/api'

// 登录
export function userList (params) {
  return post('/auth/user/list', params)
}
// 新增用户
export function user (params) {
  return post('/auth/user', params)
}
// 删除用户
export function userDelete (params) {
  return post('/auth/user/delete', params)
}
// 删除用户
export function getUser (id) {
  return get('/auth/user' + `/${id}`)
}
