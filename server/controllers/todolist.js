import todolist from '../models/todolist.js'

const getTodolist = async function (ctx) {
  const id = ctx.params.id // 获取url里传过来的参数里的id
  const result = await todolist.getTodolistById(id) // 通过await “同步”地返回查询结果
  ctx.body = {
    respHeader: {
      resultCode: 0,
      message: '正确执行'
    },
    respBody: {
      todoList: result,
      total: result.length
    }
  }
}

const createTodolist = async function (ctx) {
  const data = ctx.request.body.reqBody
  console.log(data)
  await todolist.createTodolist(data)
  ctx.body = {
    respHeader: {
      resultCode: 0,
      message: '正确执行'
    }
  }
}

const removeTodolist = async function (ctx) {
  const id = ctx.params.id
  const userId = ctx.params.userId
  const success = await todolist.removeTodolist(id, userId)
  if (success) {
    ctx.body = {
      respHeader: {
        resultCode: 0,
        message: '正确执行'
      }
    }
  }
}

const updateTodolist = async function (ctx) {
  const id = ctx.params.id
  const userId = ctx.params.userId
  let status = ctx.params.status
  status === '0' ? status = true : status = false// 状态反转（更新）

  const success = await todolist.updateTodolist(id, userId, status)

  ctx.body = {
    success
  }
}

export default {
  getTodolist,
  createTodolist,
  removeTodolist,
  updateTodolist
}
