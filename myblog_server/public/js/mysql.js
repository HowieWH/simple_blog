var mysql = require('mysql')

//使用连接池
var pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123',
  database: 'myblog',
  port: 3306
});

module.exports = pool