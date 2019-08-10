// 管理员模型
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// 新建模型schema，来定义表的字段有哪些，其实就是数据库里面的表，他有一个name字段，mongoose数据库会自动添加_id字段作为主键
const schema = new mongoose.Schema({
    username: {type: String},
    // npm i bcryptjs 进行加密存储,作密码散列
    password: {
        type: String,
        select: false, // 默认不让密码查出来
        set(val) {
            // hashSync同步方法，10-12加密级别，越高越安全也耗时
            let salt = bcrypt.genSaltSync(10);
            return  bcrypt.hashSync(val, salt); 
        }
    }
})
// 导出表，哪里需要哪里引用
module.exports = mongoose.model('Aduser', schema)