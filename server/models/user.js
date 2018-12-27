// const db = require('../config')
import db from '../config/db'
const userModel = '../schema/user'
const TodolistDb = db.Todolist

// 用sequelize的import方法引入表结构，实例化了User
const User = TodolistDb.import(userModel)
module.exports = {
  // 登录验证
  loginValid: async (name, password) => {
    const userInfo = await User.findOne({
      where: {
        user_name: name,
        password: password
      }
    })
    return userInfo
  },
  // 获取单条用户数据
  getUserById: async (id) => {
    const userInfo = await User.findOne({
      where: {
        id: id
      }
    })
    return userInfo
  },
  // 获取所有用户列表
  userList: async (name) => {
    const userInfo = await User.findAll({
      where: {
        user_name: {
          like: `%${name}%`
        }
      }
    })
    return userInfo
  },
  // 新增编辑用户
  userOperate: async (params) => {
    let userInfo
    if (params.id) {
      userInfo = await User.findOne({
        where: {
          user_name: params.user_name,
          id: {
            not: params.id
          }
        }
      })
    } else {
      userInfo = await User.findOne({
        where: {
          user_name: params.user_name
        }
      })
    }
    if (userInfo) {
      return {
        respHeader: {
          resultCode: 9999,
          message: '该用户名已经存在'
        },
        respBody: null
      }
    } else {
      let result
      if (params.id) {
        result = await User.update({
          user_name: params.user_name,
          password: params.password,
          sex: params.sex,
          status: params.status
        }, {
          where: {
            id: params.id
          }
        })
      } else {
        result = await User.create({
          user_name: params.user_name,
          password: params.password,
          sex: params.sex,
          status: params.status
        })
      }
      return result
    }
  },
  // 删除某个用户
  userDelete: async (id) => {
    const userInfo = await User.destroy({
      where: {
        id: id
      }
    })
    return userInfo
  }
}

// 新增
// User.create({
//   name: '',
//   password: ''
// })
// 根据id查询
// User.findById(userid)
// 更新
// User.update({})
// 删除
// User.destroy({
//   where:{
//     id: crb.id
//   }
// })
