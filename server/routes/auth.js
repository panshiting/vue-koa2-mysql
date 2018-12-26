// import user from '../controllers/user'
const user = require('../controllers/user')
const router = require('koa-router')()

module.exports = (app) => {
  router.post('/auth/login', user.postUserAuth)
  router.get('/auth/user/:id', user.getUserInfo)
  router.post('/auth/user/list', user.postUserList)
  router.post('/auth/user', user.postUser)
  router.post('/auth/user/delete', user.deleteUser)
  app.use(router.routes())
    .use(router.allowedMethods())
}
// router.get('/auth/user/:id', user.getUserInfo)
// router.post('/auth/login', user.postUserAuth)
//
// export default router
