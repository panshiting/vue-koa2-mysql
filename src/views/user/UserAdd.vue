<template>
  <section class="form">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" style="width: 80%" label-width="100px" class="demo-ruleForm">
      <el-form-item label="用户名" prop="user_name">
        <el-input v-model="ruleForm.user_name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="sex">
        <el-radio-group v-model="ruleForm.sex">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-radio-group v-model="ruleForm.status">
          <el-radio :label="1">可用</el-radio>
          <el-radio :label="0">不可用</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">新建</el-button>
        <el-button @click="goBack">返回</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import {user, getUser} from '@/api/user'
export default {
  name: 'UserAdd',
  data () {
    return {
      ruleForm: {
        id: '',
        user_name: '',
        password: '',
        sex: '男',
        status: 1
      },
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        age: [
          { required: true, message: '请输入年龄', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getDetail (id) {
      try {
        let {user} = await getUser(id)
        this.ruleForm = user
      } catch (e) {
        console.log(e)
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.submit()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async submit () {
      console.log(this.ruleForm)
      try {
        let res = await user(this.ruleForm)
        if (res === '正确执行') {
          if (this.$route.params.id) {
            this.$message.success('编辑成功')
          } else {
            this.$message.success('新增成功')
          }
          this.$router.push({path: '/user'})
        }
      } catch (e) {
        console.log(e)
      }
    },
    goBack () {
      this.$refs['ruleForm'].resetFields()
      this.$router.push({name: 'User'})
    }
  },
  created () {
    if (this.$route.params.id) {
      this.getDetail(this.$route.params.id)
    }
  }
}
</script>

<style scoped lang="scss">
  .form {
    padding: 20px;
  }
</style>
