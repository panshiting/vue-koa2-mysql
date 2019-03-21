<template>
  <div class="contain">
    <div class="content">
      <!--<el-col :xs="24" :sm="{span: 6, offset: 9}">-->
        <span class="title">欢迎登录</span>
        <div>
          <el-input v-model="user_name" placeholder="pst" type="text"></el-input>
          <el-input v-model="password" placeholder="123456" type="password"></el-input>
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      <!--</el-col>-->
    </div>
  </div>
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
  .contain {
    position: fixed;
    background-image: url("../../../src/assets/login-back.jpg");
    background-size: cover;
    width: 100%;
    height: 100%;
  }
  .content {
    position: absolute;
    width: 320px;
    top: 40%;
    left: 70%;
    transform: translate(-50%, -50%);
    text-align: center;
    .title {
      font-size: 28px;
      color: #fff;
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
