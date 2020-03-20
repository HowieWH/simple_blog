<template>
  <div class="articalContainer">
    <el-row>
      <el-col :span="15"
              :offset="1">
        <div class="singlePassage"
             v-for="blog in blogPassage"
             :key="blog.id">
          <div class="singlePassageHeader">
            <h2 class="singlePassageTitle">
              <router-link :to="'/singlePassage/'+blog.passageID">{{blog.title}}</router-link>
            </h2>
          </div>
          <el-divider></el-divider>
          <div class="singlePassageBody">
            <p v-html="blog.sortinfo"
               class="contentP"></p>
          </div>
          <div class="singlePassagefoot">
            <p style="font-size:14px;color:blue">作者:{{blog.author}}
              <i style="padding-left:20px"></i> 时间:{{blog.time}}</p>
          </div>
        </div>
      </el-col>
      <el-col :span="6"
              :offset="2">
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'passageList',
  data () {
    return {
      blogPassage: []
    }
  },
  created () {
    var message = this.$message
    this.axios.get('http://localhost:3000/passageList')
      .then((response) => {
        return response.data
      })
      .then((passages) => {
        // 时间转换 ，将获取到的每篇文章中的mysql时间转换为 年-月-日 的形式
        for (var pg in passages.data) {
          passages.data[pg].time = this.timeFormatChange(passages.data[pg].time)
        }
        this.blogPassage = passages.data
      })
      .catch(function (error) {
        message(error.message)
      })
  },
  methods: {

    // 时间转换 ，将mysql中的时间转换为 年-月-日 的形式
    timeFormatChange (oldDate) {
      var date = new Date(oldDate)
      var year = date.getFullYear()// getFullYear() 返回年
      var month = date.getMonth() + 1// getMonth() 返回月份 (0 ~ 11)
      var day = date.getDate()// getDate() 返回日 (1 ~ 31)
      var newDate = year + '-' + month + '-' + day
      return newDate
    }
  }
}
</script>
<style scoped>
.singlePassage {
  background-color: white;
  margin: 5px 5px;
  border: darkgrey solid 0.5px;
  border-radius: 5px;
  text-align: left;
  padding: 20px 10px;
}
.singlePassage .el-divider {
  margin: 5px;
}
.singlePassage .singlePassageBody {
  margin-top: 15px;
  margin-bottom: 10px;
}
.singlePassageTitle a {
  color: black;
}
.el-col {
  background-color: white;
  border-radius: 5px;
  min-height: 300px;
  -webkit-box-shadow: 0px 3px 3px #c8c8c8;
  -moz-box-shadow: 0px 3px 3px #c8c8c8;
  box-shadow: 0px 3px 3px #c8c8c8;
}
a {
  text-decoration-line: none;
}
a:hover {
  color: red;
}
.contentP {
  /* white-space: nowrap;
  text-overflow: ellipsis; */
  /* height: auto;
  word-wrap: break-word;
  word-break: break-all; */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
