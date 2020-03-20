<template>
  <div id="release_container">
    <div>
      <h2>发布页面</h2>
    </div>

    <el-form ref="passageform"
             :model="passageform"
             label-width="80px">
      <el-form-item label="标题">
        <el-input v-model="passageform.title"
                  placeholder="文章标题"></el-input>
      </el-form-item>
      <!-- <el-form-item label="作者">
        <el-input v-model="passageform.author"
                  placeholder="作者名字"></el-input>
      </el-form-item> -->
      <el-form-item label="文章内容">
        <wangEditor @sendEditorContent="getEditorContent"></wangEditor>
        <!-- <el-input type="textarea"
                  :autosize="{ minRows: 5, maxRows: 5}"
                  placeholder="请输入内容"
                  v-model="passageform.passage"></el-input>-->
      </el-form-item>
      <el-button type="primary"
                 @click="submitBlog">发布博客</el-button>
    </el-form>
  </div>
</template>

<script>
import wangEditor from './wangEditor.vue'
export default {
  name: 'Release',
  data () {
    return {
      passageform: {
        title: '',
        author: window.sessionStorage.getItem('user'),
        tags: [],
        time: '',
        content: '',
        sortinfo: ''
      }
    }
  },
  components: { wangEditor },
  methods: {
    // 获取子组件 富文本文档 中的内容
    getEditorContent (content, text) {
      this.passageform.content = content
      // 截取富文本中 純文本部分的 前200个字符作为文章的简要信息
      this.passageform.sortinfo = text.slice(0, 200)
    },
    // 发表文章
    submitBlog () {
      var router = this.$router
      this.passageform.time = new Date().toISOString().slice(0, 19).replace('T', ' ')
      // console.log(this.passageform)
      this.axios.post('http://localhost:3000/addPassage', this.passageform)
        .then(res => {
          if (res.data.errcode === 0) {
            setTimeout(function () {
              router.push('Login')
            }, 1500)
            return this.$message(res.data.message)
          } else if (res.data.errcode === 1) {
            router.push('passageList')
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    }
  }
}
</script>
<style scoped>
#release_container {
  width: 60%;
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
