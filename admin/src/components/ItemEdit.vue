<template>
    <div class="hello">
        <h1>{{id?'编辑':'创建'}}物品</h1>
        <el-form @submit.native.prevent="save">
            <el-form-item label="名称" name='name'>
                <el-input v-model="model.name">                   
                </el-input>
            </el-form-item>
                <el-form-item label="物品图片" name='avater'>
                    <el-upload
                        class="avatar-uploader"
                        :action="$http.defaults.baseURL + '/upload'"
                        :headers="getAuthorization()"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess">
                        <!-- 图片上传成功后会返回一个服务器图片地址 -->
                        <img v-if="model.avater" :src="model.avater" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
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
        // 图片上传成功后，调用，接收一个服务端返回地址
        handleAvatarSuccess(res) {
            console.log(res)
            this.model.avater = res.url // 服务器拼接的上传文件的地址，返回url ，但是这样赋值，不是响应式的
            this.$set(this.model, 'avatar', res.url )// 这样赋值，是响应式的,vue的显式赋值

        },
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
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>