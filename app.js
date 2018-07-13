
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
// app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});


const moment = require('moment')
//导入cors模块,该模块为跨域所用
const cors = require('cors');
app.use(cors());

//解析表单的插件
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))



//创建数据库连接对象
const mysql = require('mysql');
const conn = mysql.createConnection({
host: '192.168.60.161',//数据库地址
user: 'test',//账号
password: '123456',//密码
database: 'report',//库名
port:3306,
multipleStatements: true //允许执行多条语句
})

conn.connect();

app.get('/api/get_sale_job_num', (req, res) => {
  console.log('The req.query is: ', req.query);
  //console.log('The req.query.number  is: ', req.query.number);
  //console.log('The req.query.job_num  is: ', req.query.job_num);
const job_num = req.query.job_num
const sqlStr = 'select * from report.sale_201807 where job_num=?;'
conn.query(sqlStr, job_num, (err, results) => {
  //console.log('The results  is: ', results);
if (err) return res.json({ err_code: 1, message: '资料不存在', affextedRows: 0 })
res.json({ err_code: 200, message: results, affextedRows: results.affextedRows })
})
})

conn.query('SELECT 1 + 1 AS solution;', function (error, results, fields) {
  console.log('The results  is: ', results);
  console.log('The error    is: ', error);
  console.log('The solution is: ', results[0].solution);
});

app.get('/api/getlist', (req, res) => {
const sqlStr = 'select * from report.sale_201807 limit 1;'
conn.query(sqlStr, (err, results) => {
if (err) return res.json({ err_code: 1, message: '资料不存在', affextedRows: 0 })
res.json({ err_code: 200, message: results, affextedRows: results.affextedRows })
})
})

