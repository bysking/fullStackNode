<template>
    <div class="hello">
        <h1>分类列表</h1>
        <div class="table">
            <el-table
            :data="tableData"
            border
            style="width: 100%">
                <el-table-column
                type="index"
                width="50">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="_id"
                    label="id"
                    width="250">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="name"
                    label="分类名称"
                    width="120">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="parentname"
                    label="父级分类"
                    width="120">
                </el-table-column>
                <el-table-column
                    align="center"
                    label="操作"
                    width="150">
                    <template slot-scope="scope">
                        <el-button @click="seeIt(scope.row)" type="text" size="small">查看</el-button>
                        <el-button @click="editIt(scope.row)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteIt(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-col :span ="24">
            <el-item>
                <div class="page">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="myPage.current"
                    :page-sizes="myPage.sizes"
                    :page-size="myPage.pageSize"
                    :layout="myPage.layout"
                    :total="myPage.total">
                </el-pagination> 
                </div>
            </el-item>
        </el-col>
            
    </div>
</template>

<script>
export default {
  name: 'categorylist',
  data () {
    return {
        tableData: [],
        allData:[],
        myPage:{
            current: 1,
            sizes: [5,10,15,20],
            total: 0,
            pageSize: 5,
            layout:'total, sizes, prev, pager, next, jumper'
        }
    }
  },
    methods: {
        seeIt(row) {
            console.log(row);
        },
        editIt(row) {
            this.$router.push(`/categories/edit/${row._id}`)
            // console.log(row);
        },
        deleteIt(row) {
            // console.log(row);
            this.$confirm('确认删除?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(async () => {
                    // 删除操作
                const res = await this.$http.delete(`/rest/categories/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.fetch()
                }).catch((err) => {
                    console.log(err)
                    // 取消删除操作
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });

        },
        async fetch () {
            const res = await this.$http.get('/rest/categories')
            console.log(res.data)
            this.tableData = []
            this.allData = res.data
            this.myPage.total = this.allData.length
             for(let i = 0; i < this.myPage.pageSize; i++){
                this.tableData.push(this.allData[i])
            }

        }
        , handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.myPage.pageSize = val;
            this.myPage.current = 1;
            this.tableData = [];
            for(let i = 0; i < this.myPage.pageSize; i++){
                if(this.allData[i]){
                    this.tableData.push(this.allData[i])
                }
                
            }
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.tableData = [];
            this.myPage.current = val;
            for(let i = this.myPage.pageSize*(val-1); i < this.myPage.pageSize*val; i++){
                if(this.allData[i]){
                    this.tableData.push(this.allData[i])
                }
            }
        }
    },
    created () {
        this.fetch()
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .table{
      width: 100%;
      height: 500px;
      overflow: scroll;
    }
    .page{
        text-align: right;
        margin-top: 10px;
    }
</style>