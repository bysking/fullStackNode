// 后端路由


// 小技巧，导出一个函数，他接受一个app，类似代理

module.exports = app => {
    const express = require('express')
    // const router = express.Router() // express的子路由
    const router = express.Router({
        mergeParams: true // 合并参数 app.use('/admin/api/rest/:resource',router)
    }) 

    // // 导入模型Category.js
    // const Category = require('../../models/Category')
    router.get('/test', async (req,res) => {
        // 数据来源是req.body因为是请求，所以要等待，前边加await，函数定义为async，
        // 还需要在服务端主文件里面添加中间件 app.use(express.json())
        // const model = await Category.create(req.body)
        console.log('get后台/test')
        const modelName = require('inflection').classify(req.params.resource)
        res.send(modelName)
        // console.log(model)
    //    res.send('测试链接')
    })

    // 添加对象数据
    router.post('', async (req,res) => {
        // 数据来源是req.body因为是请求，所以要等待，前边加await，函数定义为async，
        // 还需要在服务端主文件里面添加中间件 app.use(express.json())
        console.log('post后台处理请求categories')
        const modelName = require('inflection').classify(req.params.resource)
        const model = require(`../../models/${modelName}`)
        const item = await model.create(req.body)
        res.send(item)
    })

//  获取列表
    router.get('', async (req,res) => {
        // 从数据库查询结果，限制查询条数10条
        // console.log('进入/list')
        const modelName = require('inflection').classify(req.params.resource)
        const model = require(`../../models/${modelName}`)
        const list = await model.find().limit(10)
        res.send(list)
    })

    //  获取指定id的数据对象
    router.get('/:id', async (req,res) => {
        // 从数据库查询结果，限制查询条数10条
        // console.log('进入/list')
        const modelName = require('inflection').classify(req.params.resource)
        const model = require(`../../models/${modelName}`)
        const item = await model.findById(req.params.id)
        res.send(item)
    })
    //  修改指定id的数据
    router.put('/:id', async (req,res) => {
        // 从数据库查询结果，限制查询条数10条
        // console.log('进入/list')
        const modelName = require('inflection').classify(req.params.resource)
        const model = require(`../../models/${modelName}`)
        const item = await model.findByIdAndUpdate(req.params.id,req.body)
        res.send(item)
    })
    //  删除指定id的数据
    router.delete('/:id', async (req,res) => {
        // 从数据库查询结果，限制查询条数10条
        // console.log('进入/list')
        const modelName = require('inflection').classify(req.params.resource)
        const model = require(`../../models/${modelName}`)
        const item = await model.findByIdAndDelete(req.params.id)
        res.send(item)
    })
}