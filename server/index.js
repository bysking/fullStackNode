const express = require('express')
const app = express()
// app实例上面设置一个变量，用例token校验密钥
app.set('secret', 'bysking')
const cors = require('cors')

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors()) // 引入跨域模块
// app.use(bodyParser.json()) // 引入json处理中间件

//把公共图片文件交给node托管，可被访问
app.use('/uploads',express.static(__dirname + '/uploads'))

// 引入数据库，使用文件引入的方式
require('./plugins/db.js')(app)


// 引入外部定义的路由
require('./routes/admin/index')(app)

app.listen(3000,(req, res) => {
    console.log('监听地址为： http://localhost:3000')
})