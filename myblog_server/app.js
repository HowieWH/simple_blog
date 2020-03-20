var express = require('express')
var router = require('./routes/router.js')
var bodyParser = require('body-parser')
var session = require('express-session')
var cookieparser = require("cookie-parser")

var cors = require('cors');





var app = express()
//使用cors模块，解决跨域问题
app.use(cors({
  origin: 'http://localhost:8080',
  credentials: true//是否可以带cookie
}));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

//配置Session
app.use(session({
  name: "mysession",
  secret: 'myblog',
  resave: false,
  saveUninitialized: false,
}))

app.use(router)

app.listen(3000, function (err) {
  console.log('开启了端口3000')
})