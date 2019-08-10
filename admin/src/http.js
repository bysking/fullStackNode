import axios from 'axios'
import Vue from 'vue'

const http = axios.create({
    baseURL: 'http://localhost:3000/admin/api'
})

// 给所有响应添加拦截
http.interceptors.response.use( res => {
    return res
}, err => {
    // 任何不是状态码200的错误
    // console.log(err.response)
    // 全局处理状态码不是200的错误，弹窗提醒
    if(err.response.data.message){
        Vue.prototype.$message.error({
            type: err,
            message: err.response.data.message
        })
    }
    return Promise.reject(err)
})

export default http