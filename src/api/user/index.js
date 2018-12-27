import {get, post, del} from '@/api'

// 登录
export function userList (params) {
  return post('/auth/user/list', params)
}
// 新增用户
export function user (params) {
  return post('/auth/user', params)
}
// 删除用户
export function userDelete (id) {
  return del('/auth/user' + `/${id}`)
}
// 获取用户数据
export function getUser (id) {
  return get('/auth/user' + `/${id}`)
}
