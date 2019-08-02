<template>
    <div class="hello">
        <h1>分类列表</h1>
        <el-table
            :data="tableData"
            border
            style="width: 100%">

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
</template>

<script>
export default {
  name: 'categorylist',
  data () {
    return {
        tableData: []
    }
  },
    methods: {
        seeIt(row) {
            console.log(row);
        },
        editIt(row) {
            this.$router.push(`/categories/edit/${row._id}`)
            console.log(row);
        },
        deleteIt(row) {
            console.log(row);
        },
        async fetch () {
            const res = await this.$http.get('/categories')
            this.tableData = res.data
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
</style>