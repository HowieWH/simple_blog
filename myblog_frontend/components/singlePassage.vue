<template>
  <div class='singleP-container'>
    <div>
      <h2>{{blog.title}}</h2>
    </div>
    <div>
      <label></label>
      <h4>作者： {{blog.author}}</h4>
    </div>
    <div>
      <p v-html="blog.content"></p>
    </div>

  </div>
</template>
<script>
export default {
  name: 'singlePassage',
  data () {
    return {
      bolgId: '',
      blog: {}
    }
  },
  created () {
    this.bolgId = this.$route.params.id
    this.axios.get('http://localhost:3000/singlePassage?id=' + this.bolgId)
      .then((response) => {
        // console.log(this.bolgId)
        // console.log(response)
        this.blog = response.data.data[0]
      })
      .catch(function (error) {
        alert(error)
      })
  }
}

</script>

<style scoped>
.singleP-container {
  width: 60%;
  margin: 15px auto;
  min-height: 150px;
  background-color: aliceblue;
  border: 1px solid gray;
  border-radius: 5px;
  text-align: left;
  padding: 15px;
}
.singleP-container div {
  margin: 15px;
  width: 100%;
  height: auto;
  word-wrap: break-word;
  word-break: break-all;
  overflow: hidden;
}
</style>
