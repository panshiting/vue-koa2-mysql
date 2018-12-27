import {get, post} from '@/api'

// 获取列表
export function todoList (id) {
  return get('/api/todolist' + `/${id}`)
}

// 获取列表
export function createTodoList (params) {
  return post('/api/todolist', params)
}
