<template>
  <el-row class="content">
    <el-col :xs="{span:20,offset:2}" :sm="{span:8,offset:8}">
      <span>
        欢迎：{{name}}！你的待办事项是：
      </span>
      <el-input placeholder="请输入待办事项" v-model="todos" @keyup.enter.native="addTodos"></el-input>
      <el-tabs v-model="activeName">
        <el-tab-pane label="待办事项" name="first">
          <el-col :xs="24">
            <!--<template v-if="!(count === list.length || list.length === 0)"> &lt;!&ndash;v-if和v-for不能同时在一个元素内使用，因为Vue总会先执行v-for&ndash;&gt;-->
              <template v-for="(item, index) in list">
                <div class="todo-list" v-if="item.status === 1" :key="index">
                  <span class="item">
                    {{ item.content }}
                  </span>
                  <span class="pull-right">
                    <el-button size="small" type="primary" @click="finished(item)">完成</el-button>
                    <el-button size="small" :plain="true" type="danger" @click="remove(item)">删除</el-button>
                  </span>
                </div>
              </template>
            <!--</template>-->
            <!--<div v-else-if="count === list.length || list.length === 0">-->
              <!--暂无待办事项-->
            <!--</div>-->
          </el-col>
        </el-tab-pane>
        <el-tab-pane label="已完成事项" name="second">
          <!--<template v-if="count > 0">-->
            <template v-for="(item, index) in list">
              <div class="todo-list" v-if="item.status === 0" :key="index">
                <span class="item finished">
                  {{ item.content }}
                </span>
                <span class="pull-right">
                  <el-button size="small" type="primary" @click="restore(item)">还原</el-button>
                </span>
              </div>
            </template>
          <!--</template>-->
          <!--<div v-else>-->
            <!--暂无已完成事项-->
          <!--</div>-->
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>
</template>

<script>
import { mapGetters } from 'vuex'
import { todoList, createTodoList, putTodoList, delTodoList } from '@/api/todoList'
export default {
  name: 'ToDoList',
  data () {
    return {
      name: '',
      todos: '',
      activeName: 'first',
      list: [], // status为1代表待办
      count: 0 // 记录已完成事项的条数
    }
  },
  computed: {
    ...mapGetters(['userId'])
  },
  created () {
    this.getTodoList()
  },
  methods: {
    // 获取列表
    async getTodoList () {
      try {
        let res = await todoList(this.userId)
        this.list = res.todoList
      } catch (e) {
        console.log(e)
      }
    },
    // 添加
    async addTodos () {
      if (this.todos === '') {
        return
      }
      let params = {
        user_id: this.userId,
        status: 1,
        content: this.todos
      }
      try {
        let res = await createTodoList(params)
        console.log(res)
        if (res === '正确执行') {
          this.getTodoList()
          this.todos = ''
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 完成（修改状态）
    async finished (item) {
      try {
        let res = await putTodoList(item.user_id, item.todo_id, item.status)
        console.log(res)
        if (res === '正确执行') {
          this.$message({
            type: 'success',
            message: '任务完成'
          })
          this.getTodoList()
          this.todos = ''
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 删除
    remove (item) {
      this.$confirm(
        '确定删除数据吗?',
        '提示',
        {type: 'warning'}
      ).then(() => {
        delTodoList(item.user_id, item.todo_id).then(res => {
          if (res === '正确执行') {
            this.$message.success('删除成功')
            this.getTodoList()
          }
        }).catch(e => {
          console.log(e)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 状态还原
    async restore (item) {
      try {
        let res = await putTodoList(item.user_id, item.todo_id, item.status)
        console.log(res)
        if (res === '正确执行') {
          this.$message({
            type: 'success',
            message: '任务还原'
          })
          this.getTodoList()
          this.todos = ''
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .el-input {
    margin: 20px auto;
  }
  .content {
    margin-top: 50px;
  }
  .todo-list {
    width: 100%;
    margin-top: 8px;
    padding-bottom: 8px;
    border-bottom: 1px solid #eee;
    overflow: hidden;
    text-align: left;
    .item {
      font-size: 20px;
    }
    .finished {
      text-decoration: line-through;
      color: #ddd;
    }
  }
  .pull-right {
    float: right;
  }
</style>
