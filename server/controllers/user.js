import user from '../models/user'
import jwt from 'jsonwebtoken'

module.exports = {
  // 登录验证
  postUserAuth: async (ctx) => {
    const data = ctx.request.body.reqBody // post过来的数据存在request.body里面
    console.log(data)
    const userInfo = await user.loginValid(data.user_name, data.password)
    if (userInfo) {
      if (userInfo.dataValues.status === 1) {
        const userToken = {
          name: userInfo.user_name,
          id: userInfo.id
        }
        const secret = 'vue-koa-demo' // 指定密钥，这是之后用来判断token合法性的标志
        const token = jwt.sign(userToken, secret)
        ctx.body = {
          respHeader: {
            resultCode: 0,
            message: '登录成功'
          },
          respBody: {
            token: token,
            user_name: userInfo.user_name,
            user_id: userInfo.id
          }
        }
      } else {
        ctx.body = {
          respHeader: {
            resultCode: 9999,
            message: '当前用户状态不可用'
          },
          respBody: null
        }
      }
      // compareSync的第一个参数应该是未加密的数据，第二个参数是加密的数据，否则是无法验证通过的
      // if (!bcrypt.compareSync(data.password, userInfo.password)) {
      //   ctx.body = {
      //     success: false, // success标志位是方便前端判断返回是正确与否
      //     info: '密码错误',
      //     respBody: null
      //   }
      // } else {
      //   const userToken = {
      //     name: userInfo.user_name,
      //     id: userInfo.id
      //   }
      //   const secret = 'vue-koa-demo' // 指定密钥，这是之后用来判断token合法性的标志
      //   const token = jwt.sign(userToken, secret)
      //   ctx.body = {
      //     success: true,
      //     info: '登录成功',
      //     token: token
      //   }
      // }
    } else {
      ctx.body = {
        respHeader: {
          resultCode: 9999,
          message: '用户名或者密码错误'
        },
        respBody: null
      }
    }
  },
  // 获取单条用户数据
  getUserInfo: async (ctx) => {
    const id = ctx.params.id // 获取url传过来的参数里的id
    const result = await user.getUserById(id) // 通过await“同步”的返回查询结果
    if (result) {
      ctx.body = {
        respHeader: {
          resultCode: 0,
          message: '查询成功'
        },
        respBody: {
          user: result
        }
      }
    } else {
      ctx.body = {
        respHeader: {
          resultCode: 9999,
          message: '用户不存在'
        },
        respBody: null
      }
    }
  },
  // 获取用户列表
  postUserList: async (ctx) => {
    const data = ctx.request.body.reqBody
    const result = await user.userList(data.user_name)
    if (result) {
      ctx.body = {
        respHeader: {
          resultCode: 0,
          message: '查询成功'
        },
        respBody: {
          userList: result,
          total: result.length
        }
      }
    } else {
      ctx.body = {
        respHeader: {
          resultCode: 0,
          message: '查询成功'
        },
        respBody: {
          userList: []
        }
      }
    }
  },
  // 新增編輯用戶
  postUser: async (ctx) => {
    const data = ctx.request.body.reqBody
    const result = await user.userOperate(data)
    if (result && result.respHeader) {
      ctx.body = result
    } else {
      ctx.body = {
        respHeader: {
          resultCode: 0,
          message: '正确执行'
        }
      }
    }
  },
  // 删除用户
  deleteUser: async (ctx) => {
    const id = ctx.params.id
    const result = await user.userDelete(id)
    console.log(result)
    if (result) {
      ctx.body = {
        respHeader: {
          resultCode: 0,
          message: '正确执行'
        }
      }
    }
  }
}
