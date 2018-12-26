<template>
  <section class="table-list">
    <el-form>
      <el-form-item>
        <el-button type="primary" @click="goToAdd">新增</el-button>
      </el-form-item>
      <el-form-item class="search">
        <el-input placeholder="输入搜索名称" style="width: auto;" v-model="inputTex"></el-input>
        <el-button type="primary" @click.prevent="getList">点击</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="ID">
      </el-table-column>
      <el-table-column prop="user_name" label="用户名">
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="{row}">
          <span>{{row.status === 1 ? '可用' : '不可用'}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" @click="goToEdit(scope.row.id)">
            编辑
          </el-button>
          <span>|</span>
          <el-button type="text" @click="handleDelete(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </section>
</template>

<script>
import {userList, userDelete} from '@/api/user'
export default {
  name: 'User',
  data () {
    return {
      inputTex: '',
      tableData: []
    }
  },
  methods: {
    async getList () {
      try {
        let res = await userList({
          user_name: this.inputTex
        })
        this.tableData = res.userList
        console.log(res.userList)
      } catch (e) {
        console.log(e)
      }
    },
    goToAdd () {
      this.$router.push({ path: '/user/add' })
    },
    goToEdit (id) {
      this.$router.push({ path: `/user/edit/${id}` })
    },
    handleDelete (id) {
      this.$confirm(
        '确定删除数据吗?',
        '提示',
        {type: 'warning'}
      ).then(() => {
        userDelete({
          id: id
        }).then(res => {
          if (res === '正确执行') {
            this.$message.success('删除成功')
            this.getList()
          }
        }).catch((e) => {
          console.log(e)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  },
  created () {
    this.getList()
  }
}
</script>

<style scoped lang="scss">
  @import "../../styles/mixin";
  .table-list {
    @include clearfix;
    .el-form-item {
      display: inline-block;
    }
    .search {
      float: right;
    }
  }
</style>
