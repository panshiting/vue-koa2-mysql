import router from './router'
import store from './store'
router.beforeEach((to, form, next) => {
  console.log(123)
  const token = localStorage.getItem('token')
  if (to.path === '/login') {
    if (token) {
      // 防止刷新，数据丢失
      if (!store.getters.userId) {
        store.dispatch('getUserInfo')
      }
      next('/') // 如果有token就转向首页不返回登录页
    } else {
      next() // 否则跳转回登录页
    }
  } else {
    if (token) {
      // 防止刷新，数据丢失
      if (!store.getters.userId) {
        store.dispatch('getUserInfo')
      }
      next() // 如果有token就正常转向
    } else {
      next('/login') // 否则跳转回登录页
    }
  }
})
