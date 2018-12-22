// import user from '../controllers/user'
const user = require('../controllers/user')
const router = require('koa-router')()

// import KoaRouter from 'koa-router'

module.exports = (app) => {
  router.get('/user/:id', user.getUserInfo)
  router.post('/user', user.postUserAuth)
  app.use(router.routes())
    .use(router.allowedMethods())
}
