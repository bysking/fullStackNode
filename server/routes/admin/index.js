// 后端路由

// 小技巧，导出一个函数，他接受一个app，类似代理

module.exports = app => {
    const express = require('express')
    const router = express.Router() // express的子路由

    // 导入模型Category.js
    const Category = require('../../models/Category')

    router.post('/categories', async (req,res) => {
        // 数据来源是req.body因为是请求，所以要等待，前边加await，函数定义为async，
        // 还需要在服务端主文件里面添加中间件 app.use(express.json())
        // console.log('后台处理请求categories')
        const model = await Category.create(req.body)
       res.send(model)
    })
    router.get('/test', async (req,res) => {
        // 数据来源是req.body因为是请求，所以要等待，前边加await，函数定义为async，
        // 还需要在服务端主文件里面添加中间件 app.use(express.json())
        // const model = await Category.create(req.body)
        // console.log('后台返回创建的modelduixiang')
        // console.log(model)
       res.send('测试链接')
    })

//  获取分类列表接口
    router.get('/categories', async (req,res) => {
        // 从数据库查询结果，限制查询条数10条
        // console.log('进入/list')
        const list = await Category.find().limit(10)
        res.send(list)
    })

    //  获取指定id的详情的接口
    router.get('/categories/:id', async (req,res) => {
        // 从数据库查询结果，限制查询条数10条
        // console.log('进入/list')
        const model = await Category.findById(req.params.id)
        res.send(model)
    })
    //  修改指定id的数据
    router.put('/categories/:id', async (req,res) => {
        // 从数据库查询结果，限制查询条数10条
        // console.log('进入/list')
        const model = await Category.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })
    //  修改指定id的数据
    router.delete('/categories/:id', async (req,res) => {
        // 从数据库查询结果，限制查询条数10条
        // console.log('进入/list')
        const model = await Category.findByIdAndDelete(req.params.id)
        res.send(model)
    })
// 子路由挂在admin/api下
    app.use('/admin/api',router)
}