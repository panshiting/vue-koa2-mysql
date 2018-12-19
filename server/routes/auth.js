import user from '../controllers/user'
// const user = require('../controllers/user')
// const KoaRouter = require('koa-router')
import KoaRouter from 'koa-router'

const router = new KoaRouter()

router.get('/user/:id', user.getUserInfo)
router.post('/user', user.postUserAuth)

export default router
