import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import CategoryEdit from '@/components/CategoryEdit'
import CategoryList from '@/components/CategoryList'
import ItemEdit from '@/components/ItemEdit'
import ItemList from '@/components/ItemList'
import ADuserEdit from '@/components/ADuserEdit'
import ADuserList from '@/components/ADuserList'
import Log from '@/components/Log'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
        path: '/login',
        name:'Login',
        component: Login,
        meta: { isPublic: true }
    },
    {
        path: '/',
        name: 'Main',
        component: Main,
        // main作为大组件，菜单，他的children作为子页面
        children:[
            {
                // 组件可以复用，通过路由传递参数，在组件的create()里面根据参数判断初始化不同的数据就行了
                path: '/categories/create',component: CategoryEdit
            },
            {
                path: '/categories/list',component: CategoryList
            },
            {
                // 配置路由带参数
                path: '/categories/edit/:id',component: CategoryEdit,props: true
            },

            //物品路由
            {
                // 组件可以复用，通过路由传递参数，在组件的create()里面根据参数判断初始化不同的数据就行了
                path: '/items/create',component: ItemEdit
            },
            {
                path: '/items/list',component: ItemList
            },
            {
                // 配置路由带参数
                path: '/items/edit/:id',component: ItemEdit,props: true
            },

             //管理员路由
             {
                // 组件可以复用，通过路由传递参数，在组件的create()里面根据参数判断初始化不同的数据就行了
                path: '/adusers/create',component: ADuserEdit
            },
            {
                path: '/adusers/list',component: ADuserList
            },
            {
                // 配置路由带参数
                path: '/adusers/edit/:id',component: ADuserEdit,props: true
            },

            {
                // 配置路由带参数
                path: '/categories/log',component: Log
            }
        ]
    }
  ]
})

router.beforeEach((to, form ,next) => {
    // 解决某些界面原地刷新，不请求api，从而服务端不给错误状态码，客户端无法跳转到登录界面的问题
    if (!to.meta.isPublic && !localStorage.token) {
        console.log('ned')
        next('/login')
    }
    next()
})
export default router