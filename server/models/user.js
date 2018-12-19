// import db from '../config/db'
// const db = require('../config/db')
import db from '../config.db'
const userModel = '../schema/user'
const TodolistDb = db.Todolist

// 用sequelize的import方法引入表结构，实例化了User
const User = TodolistDb.import(userModel)

const getUserById = async function (id) {
  const userInfo = await User.findOne({
    where: {
      id: id
    }
  })
  return userInfo
}

const getUserByName = async function (name) {
  const userInfo = await User.findOne({
    where: {
      user_name: name
    }
  })
  return userInfo
}
export default {
  getUserById,
  getUserByName
}
