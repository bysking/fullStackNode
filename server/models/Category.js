const mongoose = require('mongoose')

// 新建模型schema，来定义表的字段有哪些，其实就是数据库里面的表，他有一个name字段，mongoose数据库会自动添加_id字段作为主键
const schema = new mongoose.Schema({
    name: {type: String},
    parentname: {type: String}
})
// 导出表，哪里需要哪里引用
module.exports = mongoose.model('Catgory', schema)