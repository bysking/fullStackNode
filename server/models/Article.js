const mongoose = require('mongoose')

// 新建模型schema，来定义表的字段有哪些，其实就是数据库里面的表，他有一个name字段，mongoose数据库会自动添加_id字段作为主键
const schema = new mongoose.Schema({
    name: {type: String},
    // parentname: {type: String}

     // 例子，文章有许多分类，而分类是数据库已存在的数据，作关联
    // 比如一篇文章对应多个分类，就要定义成数组
    categories: [{type: mongoose.SchemaTypes.ObjectId, ref: 'Catgory'}], 

    // 比如一个英雄有许多的技能，每个技能有它自己的名字，图标，描述
    skills:[
        {
            name: {type: String},
            icon: {type: String},
            desc: {type: String}
        }
    ]

    // vue文件里面，需要定义model数据，然后使用this.$set(目标对象，键，值)显示赋值，
    // 或者对象合并 Object.assign({}, obj1, obj2)

    
   


})
// 导出表，哪里需要哪里引用
module.exports = mongoose.model('Artic', schema)