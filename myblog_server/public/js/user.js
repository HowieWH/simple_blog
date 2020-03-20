var pool = require('./mysql.js')
var md5 = require('md5')
// var Promise = require('promise')


// let selectSql = 'select * from user ';
// connection.query(selectSql, function (eerror, results, fieldsr) {
//   console.log(results)
// })

//通过数据库查找，如果找到，返回登陆成功；否则用户名不存在
exports.find = function (data, callback) {
  //得到连接池中一个连接
  pool.getConnection(function (err, conn) {
    //判断是否连接成功
    if (err) { return callback("POOL ==> " + err) }
    //连接成功后，进行数据查询
    let selectSql = 'select * from user where ? and ?';
    var password = md5(md5(data.password))
    conn.query(selectSql, [{ name: data.name }, { password: password }], function (error, results) {
      if (error) {
        return callback(error)
      }
      return callback(error, results)
    })
    //释放连接
    conn.release();
  })
}


//注册方法
//在注册前，需要查询用户名是否已经存在。若存在，则返回注册失败
exports.regester = function (data, callback) {
  pool.getConnection(function (err, conn) {
    if (err) { return callback("POOL ==> " + err) }
    var sql = "select * from user where name=?"
    conn.query(sql, [data.name], function (err, results) {
      if (err) { return callback(err) }
      else if (results.length != 0) { return callback(err, false) }
      else {
        var insertSQL = "Insert into user (name,password) values(?,?)"
        //使用md5对密码进行加密
        var password = md5(md5(data.password))
        conn.query(insertSQL, [data.name, password], function (err) {

          if (err) { return callback(err) }
          return callback(err, true)
        })
      }
    })
    conn.release();
  })
}


