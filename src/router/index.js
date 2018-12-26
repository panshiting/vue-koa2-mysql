import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          path: '/',
          component: () => import('@/views/home'),
          name: 'Home',
          meta: {
            title: '首页'
          }
        },
        {
          path: '/todoList',
          name: 'ToDoList',
          component: () => import('@/views/todoList'),
          meta: {
            title: '待办列表'
          }
        },
        {
          path: '/user',
          name: 'User',
          component: () => import('@/views/user'),
          meta: {
            title: '用户'
          }
        },
        {
          path: '/user/add',
          component: () => import('@/views/user/UserAdd'),
          name: 'UserAdd',
          meta: {
            title: '新增'
          }
        },
        {
          path: '/user/edit/:id',
          component: () => import('@/views/user/UserAdd'),
          name: 'UserAdd',
          meta: {
            title: '编辑'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/login')
    }
  ]
})
