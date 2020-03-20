<template>
  <div class="nav">
    <el-row :gutter="10">
      <el-col :span="3">
        <div class="block">
          <img :src="imgUlr"
               alt="">
        </div>
      </el-col>
      <el-col :span="3">
        <div>MyBlog</div>
      </el-col>
      <el-col :span="6"
              :offset="6"
              class="changePR">
        <router-link to="/passageList">首页</router-link>
        <router-link to="/Release">写博客</router-link>
      </el-col>
      <el-col :span="6">
        <div>
          <el-button v-if='!userLogin'>
            <router-link class="routerlink"
                         to="/Login">请登录</router-link>
          </el-button>
          <el-dropdown @command="handleCommand"
                       v-if='userLogin'>
            <el-button>
              当前用户：{{user}}<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">切换用户</el-dropdown-item>
              <el-dropdown-item command="b">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'headerNav',
  data () {
    return {
      imgUlr: require('../src/assets/qb.png'),
      user: window.sessionStorage.getItem('user'),
      userLogin: Boolean(window.sessionStorage.getItem('user'))
    }
  },
  methods: {
    handleCommand (command) {
      if (command === 'a') {
        this.$message({
          message: '切换用户——不清除已登录信息',
          duration: 1000
        })
        this.$router.push('Login')
      } else if (command === 'b') {
        this.$message({
          message: '退出登录——清理已登录信息',
          duration: 1000
        })
        this.logout()
        this.$router.push('Login')
      }
    },
    // 退出登录的方法
    logout () {
      // 1.发送请求，清除服务端session信息
      this.axios.get('http://localhost:3000/logout')
        .then(res => {
          if (res.data === '') {
            this.$message('退出登录成功——请重新登陆')
            // 2.删除sessionStorgy中存储的账号信息
            window.sessionStorage.removeItem('user')
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

}
</script>
<style scoped>
.routerlink {
  text-decoration: none;
  color: rgb(66, 69, 235);
}
.el-dropdown-link {
  cursor: pointer;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.nav {
  width: 100%;
  height: 100%;
  text-align: center;
}
.el-row {
  height: 100%;
  color: white;
}
.el-col {
  height: 100%;
  /* 使得子元素垂直居中 */
  display: flex;
  align-items: center;
  justify-content: center;
}
.changePR a {
  padding: 10px 5px;
  border-radius: 5px;
  margin: 5px;
  text-decoration: none;
}
.router-link-active {
  background-color: white;
}
</style>
