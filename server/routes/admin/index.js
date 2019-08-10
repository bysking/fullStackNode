// 后端路由


// 小技巧，导出一个函数，他接受一个app，类似代理

module.exports = app => {

    const express = require('express')
    // const router = express.Router() // express的子路由
    const bcrypt = require('bcryptjs')
    const assert = require('http-assert')

    const router = express.Router({
        mergeParams: true // 合并参数 app.use('/admin/api/rest/:resource',router)
    }) 

 
    router.get('/test', async (req,res) => {    
        // 数据来源是req.body因为是请求，所以要等待，前边加await，函数定义为async,
        // 还需要在服务端主文件里面添加中间件 app.use(express.json())
        // const model = await Category.create(req.body)
        const modelName = require('inflection').classify(req.params.resource)
        res.send(modelName)
        // console.log(model)
    //    res.send('测试链接')
    })

    // 抽离中间件
    const authMidleWare = require('../../middleWare/auth')
    const resourceMidleWare = require('../../middleWare/resource')
    // 添加对象数据
    router.post('', async (req,res) => {
        // 数据来源是req.body因为是请求，所以要等待，前边加await，函数定义为async，
        // 还需要在服务端主文件里面添加中间件 app.use(express.json())
        // console.log('post后台处理请求categories')
        const modelName = require('inflection').classify(req.params.resource)
        console.log(modelName)
        console.log(req.body)
        const model = require(`../../models/${modelName}`)
        const item = await model.create(req.body)
        res.send(item)
    })

    //  获取列表
    // 添加中间件校验token
    router.get('', authMidleWare(), resourceMidleWare(), async (req,res) => {
        // 从数据库查询结果，限制查询条数10条
        // console.log('进入/list')
        // const modelName = require('inflection').classify(req.params.resource)
        // const model = require(`../../models/${modelName}`)
        // const list = await model.find().limit(10)
        const list = await req.model.find().populate('parent') // 把parent的完整信息查询出来，不仅仅要她的id
        // console.log('查询分类')
        res.send(list)
    })

    //  获取指定id的数据对象
    router.get('/:id', authMidleWare(), resourceMidleWare(), async (req,res) => {
        // 从数据库查询结果，限制查询条数10条
        // console.log('进入/list')
        const item = await req.model.findById(req.params.id)
        res.send(item)
    })

    //  修改指定id的数据
    router.put('/:id', authMidleWare(), resourceMidleWare(), async (req,res) => {
        // 从数据库查询结果，限制查询条数10条
        // console.log('进入/list')
        const item = await req.model.findByIdAndUpdate(req.params.id,req.body)
        res.send(item)
    })

    //  删除指定id的数据
    router.delete('/:id', authMidleWare(), resourceMidleWare(), async (req,res) => {
        // 从数据库查询结果，限制查询条数10条
        // console.log('进入/list')
        const item = await req.model.findByIdAndDelete(req.params.id)
        res.send(item)
    })

    app.use('/admin/api/rest/:resource',router)

    // 处理文件上传，图片上传 需要
    // npm i multer插件
    const multer = require('multer') // 引入文件上传模块
    const upload = multer({dest: __dirname + '../../../uploads'}) // 配置文件上传路径：__dirname：绝对地址
    app.post('/admin/api/upload', authMidleWare(), upload.single('file'), async (req, res) => {
        const file = req.file // 为了让文件可以被访问，需要定义路由把uploads公开
        file.url = `http://localhost:3000/uploads/${file.filename}`
        res.send(file)

    })

    app.post('/admin/api/login', async (req, res) => {
        const { username, password } = req.body

        // 根据用户名找用户
        const Aduser = require('../../models/Aduser')
        const user = await Aduser.findOne({username}).select('+password')

        // 一般错误都是全局捕获
        // 给所有响应添加拦截
        // http.interceptors.response.use
        // if (!user) {
        //     return res.status(422).send({
        //         message: '用户不存在'
        //     })
        // }
        assert(user, 422, '用户不存在')
        // 校验密码
        // console.log(user)
        const RightUser = bcrypt.compareSync(password, user.password); // model里面密码select: false会报错
        // if(!RightUser){
        //     return res.status(422).send({
        //         message: '用户或者密码错误'
        //     })
        // }
        assert(RightUser, 422, '用户名或密码错误')
        // 返回token npm i jsonwebtoken
        const jwt = require('jsonwebtoken')
        const token = jwt.sign({
            id: user._id,
            _id: user._id,
            username: user.username
        }, app.get('secret'))
        res.send({token, username:user.username})
    })

    // 错误处理函数捕获,由assert抛出
    app.use(async (err, req, res, nest) => {
        console.log(err)
        res.status(err.statusCode || 500).send({
            message: err.message
        })
        // await next()
    })
}