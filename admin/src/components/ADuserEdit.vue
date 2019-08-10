<template>
    <div class="hello">
        <h1>{{id?'编辑':'创建'}}管理员</h1>
        <el-form @submit.native.prevent="save">
            <!--  @submit.native.prevent="save" 阻止form表单默认提交刷新页面 -->
            <el-form-item label="用户名" name='username'>
                <el-input v-model="model.username">                   
                </el-input>
            </el-form-item>
            <el-form-item label="密码" name='password'>
                <el-input v-model="model.password">                   
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
  name: 'aduseredit',
  props:{
    id:{}
  },
  data () {
    return {
        model: {},
        options: []
    }
  },
  created(){
      // 有id才执行后面的函数
    this.id && this.fetch()
    this.fetchAll()
  },
    methods: {
        async fetchAll () {
            const res = await this.$http.get('/rest/adusers')
            // console.log(res.data)
            this.options = res.data
        },
        async fetch(){
           const res = await this.$http.get(`/rest/adusers/${this.id}`)
           this.model = res.data
        },
        async save(){
            // console.log("save")
            let res;
            if(this.id){
                this.$http.put(`/rest/adusers/${this.id}`,this.model)
            }else{
                this.$http.post('/rest/adusers',this.model)
            }
            
            // this.$http.post('/categories',this.model).then(function(res){
            //     console.log(res)
            // })
            
            // console.log("跳转到分类列表")
            // 跳转到分类列表
            this.$router.push('/adusers/list')
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