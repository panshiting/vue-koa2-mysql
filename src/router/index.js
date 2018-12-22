import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login'
import ToDoList from '@/views/todoList'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // },
    {
      path: '/',
      name: 'Login',
      component: Login
      // component: () => import('@/views/login')
    },
    {
      path: '/todoList',
      name: 'ToDoList',
      component: ToDoList
      // component: () => import('@/views/todoList')
    }
  ]
})
