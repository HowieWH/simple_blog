<template>
  <div id="release_container">
    <div>
      <h2>编辑博客</h2>
    </div>

    <el-form ref="passageform"
             :model="passageform"
             label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="passageform.title"
                  placeholder="文章标题"></el-input>
      </el-form-item>
      <el-form-item label="作者">
        <el-input v-model="passageform.name"
                  placeholder="作者名字"></el-input>
      </el-form-item>
      <el-form-item label="文章内容">
        <el-input type="textarea"
                  :autosize="{ minRows: 5, maxRows: 5}"
                  placeholder="请输入内容"
                  v-model="passageform.passage"></el-input>
      </el-form-item>
      <el-button type="primary"
                 @click="submitBlog">完成编辑</el-button>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Release',
  data () {
    return {
      passageform: {
        name: '',
        passage: '',
        title: ''
      }
    }
  },
  methods: {
    submitBlog () {
      var router = this.$router
      this.axios.post('https://vuedemo-55922.firebaseio.com/myblog.json', this.passageform)
        .then(function (response) {
          router.push('passageList')
        })
        .catch(function (error) {
          alert(error)
        })
    }
  }
}
</script>
<style scoped>
#release_container {
  width: 50%;
  margin: 10px auto;
  background-color: white;
  border-radius: 5px;
  border: 1px solid gray;
  padding: 10px 20px;
}
.el-form {
  margin-top: 10px;
}
</style>
