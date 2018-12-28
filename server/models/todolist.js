import db from '../config/db.js' // 引入todolist的表结构
const todoModel = '../schema/list.js'
const TodolistDb = db.Todolist // 引入数据库

const Todolist = TodolistDb.import(todoModel)

// 查找所有的todolist
const getTodolistById = async function (id) {
  const todolist = await Todolist.findAll({
    where: {
      user_id: id
    }
    // attributes: ['id', 'content', 'status'] // 只需返回这三个字段的结果即可
  })
  return todolist // 返回数据
}

// 新增todolist
const createTodolist = async function (data) {
  const result = await Todolist.create({
    user_id: data.user_id,
    content: data.content,
    status: data.status
  })
  console.log(result)
  return result
}

// 删除todolist
const removeTodolist = async function (id, userId) {
  const result = await Todolist.destroy({
    where: {
      todo_id: id,
      user_id: userId
    }
  })
  return result === 1 // 如果成功删除了记录，返回1，否则返回0
}

// 更新todolist
const updateTodolist = async function (id, userId, status) {
  const result = await Todolist.update(
    {
      status
    },
    {
      where: {
        todo_id: id,
        user_id: userId
      }
    }
  )
  return result[0] === 1 // 返回一个数组，更新成功的条目为1否则为0。由于只更新一个条目，所以只返回一个元素
}

export default {
  getTodolistById,
  createTodolist,
  removeTodolist,
  updateTodolist
}
