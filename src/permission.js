import router from './router'
router.beforeEach((to, form, next) => {
  const token = localStorage.getItem('token')
  if (to.path === '/login') {
    if (token) {
      next('/') // 如果有token就转向首页不返回登录页
    } else {
      next() // 否则跳转回登录页
    }
  } else {
    if (token) {
      next() // 如果有token就正常转向
    } else {
      next('/login') // 否则跳转回登录页
    }
  }
})
