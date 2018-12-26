const Compress = require('koa-compress')
const path = require('path')
const staticServer = require('koa-static')
const Koa = require('koa')
const koaJson = require('koa-json')
const logger = require('koa-logger')
// const jwt = require('koa-jwt')
// const historyApiFallback = require('koa2-history-api-fallback')
// const koaRouter = require('koa-router')
const koaBodyparser = require('koa-bodyparser')
const auth = require('./routes/auth')
// const api = require('./routes/api')

const app = new Koa()
// const router = koaRouter()

// let port = process.env.PORT

app.use(koaBodyparser())
app.use(koaJson())
app.use(logger())
app.use(Compress({
  threshold: 2048 // 要压缩的最小响应字节
}))

app.use(async function (ctx, next) {
  let start = new Date()
  await next()
  let mx = new Date() - start
  console.log('%s %s - %s', ctx.method, ctx.url, mx)
})

// 如果jwt验证失败，返回验证失败信息
app.use(async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401
      ctx.body = {
        success: false,
        token: null,
        info: 'Protected resource, use Authorization header to get access'
      }
    } else {
      throw err
    }
  }
})

app.on('error', function (err, ctx) {
  console.log('server error', err)
})

// 挂载到koa-router上，同时会让所有的auth的请求路径前面加上'/auth'的请求路径
// router.use('/auth', auth.routes())
auth(app)
// 所有走/api/打头的请求都需要经过jwt验证。
// router.use('api', jwt({secret: 'vue-koa-demo'}), api.routes())

// 将路由规则挂载到Koa上
// app.use(router.routes())
// app.use(historyApiFallback())
// 将webpack打包好的项目目录作为koa静态文件服务的目录
// app.use(serve(path.resolve('dist')))
app.use(staticServer(path.resolve('dist')))

app.listen(9999, () => {
  console.log(`koa is listening in 9999 release`)
})
// export default app
