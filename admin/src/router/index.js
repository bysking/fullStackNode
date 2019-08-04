import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import CategoryEdit from '@/components/CategoryEdit'
import CategoryList from '@/components/CategoryList'
import Log from '@/components/Log'

Vue.use(Router)

export default new Router({
  routes: [
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
            {
                // 配置路由带参数
                path: '/categories/log',component: Log
            }
        ]
    }
  ]
})
