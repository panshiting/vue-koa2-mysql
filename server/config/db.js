// const Sequelize = require('sequelize')
import Sequelize from 'sequelize'

// 使用url连接的形式进行连接，注意将root:root(用户:密码)
const Todolist = new Sequelize('mysql://root:root@localhost/todolist', {
  define: {
    timestamps: false // 取消Sequelize自动给数据表加入时间戳
  }
})

export default {
  Todolist
}
