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
                    {{ index + 1 }}. {{ item.content }}
                  </span>
                  <span class="pull-right">
                    <el-button size="small" type="primary" @click="finished(index)">完成</el-button>
                    <el-button size="small" :plain="true" type="danger" @click="remove(index)">删除</el-button>
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
                  {{ index + 1 }}. {{ item.content }}
                </span>
                <span class="pull-right">
                  <el-button size="small" type="primary" @click="restore(index)">还原</el-button>
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
import { todoList, createTodoList } from '@/api/todoList'
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
      // this.list.push(obj)
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
    finished (index) {
      this.count++
      this.$set(this.list[index], 'status', true) // 通过set的方法让数组的变动能够让Vue检测到
      this.$message({
        type: 'success',
        message: '任务完成'
      })
    },
    remove (index) {
      console.log(this.count)
      this.list.splice(index, 1)
      if (this.count > 0) {
        this.count--
      }
      this.$message({
        type: 'info',
        message: '任务删除'
      })
    },
    restore (index) {
      this.$set(this.list[index], 'status', false)
      this.count--
      this.$message({
        type: 'info',
        message: '任务还原'
      })
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
