// import user from '../models/user'
// import jwt from 'jsonwebtoken'
// import bcrypt from 'bcryptjs'

const user = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

export async function getUserInfo (ctx) {
  const id = ctx.params.id // 获取url传过来的参数里的id
  const result = await user.getUserById(id) // 通过await“同步”的返回查询结果
  if (result) {
    ctx.body = {
      success: true,
      info: '查询成功',
      respBody: result
    }
  } else {
    ctx.body = {
      success: false,
      info: '用户不存在',
      respBody: null
    }
  }
}

export async function postUserAuth (ctx) {
  const data = ctx.request.body // post过来的数据存在request.body里面
  const userInfo = await user.getUserByName(data.name)
  if (!userInfo) {
    if (!bcrypt.compareSync(data.password, userInfo.password)) {
      ctx.body = {
        success: false, // success标志位是方便前端判断返回是正确与否
        info: '密码错误',
        respBody: null
      }
    } else {
      const userToken = {
        name: userInfo.user_name,
        id: userInfo.id
      }
      const secret = 'vue-koa-demo' // 指定密钥，这是之后用来判断token合法性的标志
      const token = jwt.sign(userToken, secret)
      ctx.body = {
        success: true,
        info: '登录成功',
        token: token
      }
    }
  } else {
    ctx.body = {
      success: false,
      info: '用户不存在',
      respBody: null
    }
  }
}
