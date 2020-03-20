var express = require('express')

var user = require('../public/js/user.js')
var Passage = require('../public/js/passage.js')


var router = express.Router()

//处理登录请求
router.post('/login', (req, res) => {
  user.find(req.body, function (err, result) {
    if (err) { console.log('[SELECT 失败] - ', err.message); }
    else if (result.length == 0) {
      res.send({
        result: false,
        message: "账户或密码错误，请重试！"
      })
    }
    else {
      //console.log(result[0])
      req.session.user = result[0].name
      res.send({
        result: true,
        message: "登录成功！",
        user: req.session.user
      })
    }
  })
})
//处理注册请求
router.post('/register', function (req, res) {
  user.regester(req.body, function (err, result) {
    if (err) {
      console.log('[SELECT 失败] - ', err.message);
    }
    else if (!result) {
      console.log('[insert 失败]');
      res.send({
        result: false,
        message: "账户已存在！"
      })
    }
    else {
      res.send({
        result: true,
        message: "注册成功！"
      })
    }

  })
})

//处理 退出登录请求
router.get('/logout', function (req, res) {
  //销毁 session
  req.session.destroy()
  console.log(123)
  res.send(req.session)
})

//进行首页 文章列表的渲染
router.get('/passageList', function (req, res) {
  Passage.findAll(function (err, results) {
    if (err) {
      res.send({
        errorCode: 0,
        message: err.message
      })
    }
    else {
      res.send({
        errorCode: 1,
        message: "数据获取成功",
        data: results
      })
    }
  })

})
//通过传入文章id，进行单篇文章的渲染
router.get('/singlePassage', function (req, res) {
  Passage.findOne(req.query.id, function (err, results) {
    if (err) {
      res.send({
        errorCode: 0,
        message: err.message
      })
    }
    else {
      res.send({
        errorCode: 1,
        message: "数据获取成功",
        data: results
      })
    }
  })
})

//添加新的文章
router.post('/addPassage', (req, res) => {
  //在添加之前进行验证，如果没有登录，则不允许添加
  if (!req.session.user) {
    return res.send({
      errcode: 0,
      message: "还未进行登录，请先进行登录在操作！"
    })
  }
  Passage.addOne(req.body, (err) => {
    if (err) {
      res.send({
        errcode: 0,
        message: err.message
      })
    }
    else {
      res.send({
        errcode: 1,
        message: "添加成功"
      })
    }
  })
})



module.exports = router