<template>
    <div class="hello">
        <h1>{{id?'编辑':'创建'}}物品</h1>
        <el-form @submit.native.prevent="save">
            <el-form-item label="名称" name='name'>
                <el-input v-model="model.name">                   
                </el-input>
            </el-form-item>
                <el-form-item label="图片上传" name='avater'>
                <el-input v-model="model.avater">                   
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
  name: 'itemedit',
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
            const res = await this.$http.get('/rest/items')
            // console.log(res.data)
            this.options = res.data
        },
        async fetch(){
           const res = await this.$http.get(`/rest/items/${this.id}`)
           this.model = res.data
        },
        async save(){
            // console.log("save")
            let res;
            if(this.id){
                this.$http.put(`/rest/items/${this.id}`,this.model)
            }else{
                this.$http.post('/rest/items',this.model)
            }
            
            // this.$http.post('/items',this.model).then(function(res){
            //     console.log(res)
            // })
            
            // console.log("跳转到分类列表")
            // 跳转到分类列表
            this.$router.push('/items/list')
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