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
        console.log('后台处理请求categories')
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
// 子路由挂在admin/api下
    app.use('/admin/api',router)
}