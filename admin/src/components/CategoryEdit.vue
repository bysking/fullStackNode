<template>
    <div class="hello">
        <h1>创建分类</h1>
        <el-form @submit.native.prevent="save">
                            <!--  @submit.native.prevent="save" 阻止form表单默认提交刷新页面 -->
            <el-form-item label="名称" name='name'>
                <el-input v-model="model.name">
                    
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: 'categoryedit',
  data () {
    return {
        model: {},
        isCollapse: true,
        msg: 'Welcome to Your Vue.js App'
    }
  },
    methods: {
        async save(){
            console.log("save")
            this.$http.post('/categories',this.model).then(function(res){
                console.log(res)
            })
            
            console.log("跳转到分类列表")
            // 跳转到分类列表
            this.$router.push('/categories/list')
            this.$message({
                type: 'success',
                message: '保存成功'
            })
        },
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