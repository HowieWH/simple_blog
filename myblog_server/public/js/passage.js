var pool = require('./mysql.js')

//添加新的文章内容
exports.addOne = function (passage, callback) {
  pool.getConnection((err, conn) => {
    if (err) { return callback(err) }
    var sql = "insert into  passage (title,author,time,content,sortinfo) values(?,?,?,?,?)"
    conn.query(sql, [passage.title, passage.author, passage.time, passage.content, passage.sortinfo], (error) => {
      if (error) { return callback(error) }
      return callback(error)
    })
    conn.release()
  })
}

//查询、返回passage表中所有的数据中的除了content之外字段，因为content占据一篇文章大部分容量
exports.findAll = function (callback) {
  pool.getConnection((err, conn) => {
    if (err) { return callback(err) }
    var sql = "select title,sortinfo,author,passageID,time from passage"
    conn.query(sql, (error, results) => {
      if (error) { return callback(error) }
      callback(error, results)
    })
    conn.release()
  })
}
//根据ID值，查询、返回passage表中符合条件的数据
exports.findOne = function (passageID, callback) {
  pool.getConnection((err, conn) => {
    if (err) { return callback(err) }
    var sql = "select * from passage where passageID = ?"
    conn.query(sql, [passageID], (error, results) => {
      if (error) { return callback(error) }
      callback(error, results)
    })
    conn.release()
  })
}
//根据id值，删除对应的文章
exports.deletOne = function (passageID, callback) {
  pool.getConnection((err, conn) => {
    if (err) { return callback(err) }
    var sql = "delet from passage where passageID = ?"
    conn.query(sql, [passageID], (error, results) => {
      if (error) { return callback(error) }
      callback(error, results)
    })
    conn.release()
  })
}