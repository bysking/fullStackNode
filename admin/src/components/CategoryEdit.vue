<template>
    <div class="hello">
        <h1>{{id?'编辑':'创建'}}分类</h1>
        <el-form @submit.native.prevent="save">
                            <!--  @submit.native.prevent="save" 阻止form表单默认提交刷新页面 -->
            <el-form-item label="父级分类" name='parentname'>
                <el-select v-model="model.parent" placeholder="请选择">
                    <el-option
                        v-for="item in options"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id">
                    </el-option>
                </el-select>
            </el-form-item>
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
  props:{
    id:{}
  },
  data () {
    return {
        model: {},
        isCollapse: true,
        msg: 'Welcome to Your Vue.js App',
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
            const res = await this.$http.get('/rest/categories')
            // console.log(res.data)
            this.options = res.data
        },
        async fetch(){
           const res = await this.$http.get(`/rest/categories/${this.id}`)
           this.model = res.data
        },
        async save(){
            // console.log("save")
            let res;
            if(this.id){
                this.$http.put(`/rest/categories/${this.id}`,this.model)
            }else{
                this.$http.post('/rest/categories',this.model)
            }
            
            // this.$http.post('/categories',this.model).then(function(res){
            //     console.log(res)
            // })
            
            // console.log("跳转到分类列表")
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