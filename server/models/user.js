// import db from '../config/db'
const db = require('../config/db')
const userModel = '../schema/user'
const TodolistDb = db.Todolist

// 用sequelize的import方法引入表结构，实例化了User
const User = TodolistDb.import(userModel)

export async function getUserById (id) {
  const userInfo = await User.findOne({
    where: {
      id: id
    }
  })
  return userInfo
}

export async function getUserByName (name) {
  const userInfo = await User.findOne({
    where: {
      user_name: name
    }
  })
  return userInfo
}
