import {get, post, del, put} from '@/api'

// 获取列表
export function todoList (id) {
  return get('/api/todolist' + `/${id}`)
}

// 创建
export function createTodoList (params) {
  return post('/api/todolist', params)
}

// 删除
export function delTodoList (userId, id) {
  return del(`/api/todolist/${userId}/${id}`)
}

// 修改
export function putTodoList (userId, id, status) {
  return put(`/api/todolist/${userId}/${id}/${status}`)
}
