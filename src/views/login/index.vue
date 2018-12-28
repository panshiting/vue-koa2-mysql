<template>
  <el-row class="content">
    <el-col :xs="24" :sm="{span: 6, offset: 9}">
      <span class="title">欢迎登录</span>
      <el-row>
        <el-input v-model="user_name" placeholder="pst" type="text"></el-input>
        <el-input v-model="password" placeholder="123456" type="password"></el-input>
        <el-button type="primary" @click="login">登录</el-button>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: 'index',
  data () {
    return {
      user_name: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(['LoginByUsername']),
    async login () {
      if (this.user_name === '' || this.password === '') {
        this.$message.error('请输入完整数据')
      } else {
        let data = {
          user_name: this.user_name,
          password: this.password
        }
        this.LoginByUsername(data).then((res) => {
          if (res.token) {
            this.$router.push({ path: '/' })
          } else {
            this.$message.error(`${res}`)
          }
        }).catch((e) => {
          console.log(e)
        })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .content {
    margin-top: 100px;
    text-align: center;
    padding: 16px;
    .title {
      font-size: 28px;
    }
    .el-input {
      margin: 12px 0;
    }
    .el-button {
      width: 100%;
      margin-top: 12px;
    }
  }
</style>
