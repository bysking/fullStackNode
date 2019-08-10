// token验证中间件
module.exports = option => {
    
    const assert = require('http-assert')
    const jwt = require('jsonwebtoken')
    const Aduser = require('../models/Aduser')

    return async (req, res, next) => {
        // 前端用大写，后台用小写A,a
        // const token = req.headers.authorization 
        const token = String(req.headers.authorization || '' ).split(' ').pop() //去除'Bearer空格'
        assert(token, 401, 'token不存在')
        const tokenData = jwt.verify(token, req.app.get('secret'))
        assert(tokenData, 401, 'tokenData')
        // console.log(tokenData)
        const { id } = tokenData // 解析出id，从数据库查询用户返回，万一传过来的用户是伪造的
        assert(id, 401, '无效的token')
        req.user = await Aduser.findById( id )
        // console.log(req.user)
        assert(req.user, 401, '请先登录')
        await next()
    }
}
// 下面的方法也行
// module.exports = option =>  async (req, res, next) => {
//     // 前端用大写，后台用小写A,a
//     // const token = req.headers.authorization 
//     const token = String(req.headers.authorization || '' ).split(' ').pop() //去除'Bearer空格'
//     assert(token, 401, 'token不存在')
//     const tokenData = jwt.verify(token, app.get('secret'))
//     assert(tokenData, 401, 'tokenData')
//     // console.log(tokenData)
//     const { id } = tokenData // 解析出id，从数据库查询用户返回，万一传过来的用户是伪造的
//     assert(id, 401, '无效的token')
//     req.user = await Aduser.findById( id )
//     // console.log(req.user)
//     assert(req.user, 401, '请先登录')
//     await next()
// }