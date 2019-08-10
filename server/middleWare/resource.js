module.exports = option => {
    // 资源中间件
       // 导入模型Category.js
    const Category = require('../models/Category')

    return async (req, res, next) => {
        // 从数据库查询结果，限制查询条数10条
        // console.log('进入/list')
        const modelName = require('inflection').classify(req.params.resource)
        req.model = require(`../models/${modelName}`)
        await next()
    }
}