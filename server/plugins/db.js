// 数据库链接

module.exports = app =>{
    const mongoose = require('mongoose')
    // mongoose数据库的端口访问地址：本地的27017
    mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba',{
        useNewUrlParser: true
    }).catch(err =>{
        console.log(err)
    })
}
