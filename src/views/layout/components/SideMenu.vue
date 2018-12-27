<template>
  <el-menu
    :show-timeout="200"
    :default-active="$route.path"
    :unique-opened="true"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router>
    <el-menu-item index="/">
      首页
    </el-menu-item>
    <el-menu-item :index="`/user`" key="/user">
      <i class="el-icon-menu"></i>
      <span slot="title">用户</span>
    </el-menu-item>
    <el-menu-item :index="`/todoList`" key="/todoList">
      <i class="el-icon-menu"></i>
      <span slot="title">待办列表</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'SideMenu',
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style scoped>
</style>
