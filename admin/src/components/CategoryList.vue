<template>
    <div class="hello">
        <h1>分类列表</h1>
    </div>
</template>

<script>
export default {
  name: 'categorylist',
  data () {
    return {
        isCollapse: true,
        msg: 'Welcome to Your Vue.js App'
    }
  },
    methods: {
        handleOpen(key, keyPath) {
            // console.log('打开')
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log('关闭')
            // console.log(key, keyPath);
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