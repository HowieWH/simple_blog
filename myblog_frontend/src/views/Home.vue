<template>
  <el-container>
    <el-header>
      <headerNav></headerNav>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import headerNav from '../../components/headerNav.vue'
export default {
  data () {
    return {
      imgIcon: require('../assets/qb.png')
    }
  },
  components: {
    headerNav
  }
}
</script>
<style scoped>
.el-main {
  background-color: #e9eef3;
  color: #333;
}
.el-header {
  background-color: #eb1111;
  text-align: center;
  margin: 0;
}

.el-container {
  height: 100%;
  padding: 0;
  margin: 0;
  width: 100%;
}
</style>
