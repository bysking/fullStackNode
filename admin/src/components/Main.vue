<template>
    <el-container class="hello">
        <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            router
            >

            <el-submenu index="1">

                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>内容管理</span>
                </template>

                <el-menu-item-group>
                    <template slot="title">分类</template>
                    <el-menu-item index="/categories/create">新建分类</el-menu-item>
                    <el-menu-item index="/categories/list">分类列表</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">

                <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航二</span>
                </template>

                <el-menu-item-group>
                    <template slot="title">分组二</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
export default {
  name: 'Main',
  data () {
    return {
        isCollapse: true,
        msg: 'Welcome to Your Vue.js App'
    }
  },
    methods: {
        handleOpen(key, keyPath) {
            console.log('打开')
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log('关闭')
            console.log(key, keyPath);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>