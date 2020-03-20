<template>
  <div id="login">
    <div class="header">
      <img :src="imgURL"
           class="imgControl">
    </div>
    <div class="container">
      <div class="loginBox">
        <h2>登录页面</h2>
        <div class="loginBoxBody">
          <el-form ref="form"
                   :model="form"
                   size="small"
                   :rules="rules"
                   :hide-required-asterisk="true">
            <el-form-item label="用户名"
                          prop="name">
              <el-input v-model="form.name"
                        :validate-event="false"></el-input>
            </el-form-item>
            <el-form-item label="密码"
                          prop="password">
              <el-input v-model="form.password"
                        type="password"
                        :validate-event="false"></el-input>
            </el-form-item>
            <el-button size="medium "
                       class="btn"
                       @click="submitForm()">登 录</el-button>
          </el-form>
        </div>
        <p class="create_account_call">还没有注册？请进行<router-link to="/Register">账号注册</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符' }
        ],
        password: [{ required: true, message: '请输密码' }]
      },
      imgURL: require('../assets/qiaoba.png')
    }
  },
  methods: {

    //
    submitForm () {
      // 这里  在表单提交的时候  进行表单验证
      this.$refs.form.validate((valid) => {
        // 验证成功
        if (valid) {
          alert('submit!')
          this.loginIn()
        } else {
          alert('error submit!!')
          return false
        }
      })
    },
    // 进行登录，若登陆成功，则进入主页面
    loginIn () {
      // 在这里先定义一个全局路由对象，因为在get/post回调函数中，this不再指向vue实例，因此拿不到路由对象
      var router = this.$router
      this.axios.post('http://localhost:3000/login', this.form)
        .then((res) => {
          // console.log(res)
          if (!res.data.result) {
            alert(res.data.message)
          } else {
            window.sessionStorage.setItem('user', res.data.user)
            alert(res.data.message)
            router.push('Home')
          }
        })
        .catch(function (error) {
          return error
        })
    }
  }

}
</script>

<style scoped >
.header {
  width: 100%;
  height: 105px;
  position: relative;
  /* background-image: "../assets/logo.png"; */
}
.imgControl {
  width: 70px;
  height: 70px;
  position: absolute;
  border: 2px solid rgb(77, 206, 223);
  border-radius: 50%;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loginBox {
  width: 300px;
  /* border: 1px solid #a4a4a8; */
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.loginBoxBody {
  border: 1px solid #a4a4a8;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
}
.btn {
  width: 100%;
  display: block;
  color: #fff;
  background-color: #28a745;
  background-image: linear-gradient(-180deg, #34d058, #28a745 90%);
}
.create_account_call {
  padding: 15px 20px;
  text-align: center;
  border: 1px solid #a4a4a8;
  padding: 20px;
  border-radius: 5px;
  font-size: 14px;
}
.create_account_call a {
  color: #0366d6;
  text-decoration: none;
}
</style>
