<template>
    <div class="permissions"  >

        <!-- 面包屑 -->
        <el-breadcrumb >
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
        <!-- 主体区域内容card -->
        <el-card class="box-card" style="overflow: scroll;height: 535px;overflow-x: hidden;font-weight: bold" >
            <el-table class="table" :data="authList" border stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column prop="authname" label="权限名称"  ></el-table-column>
                <el-table-column prop="path" label="路径"  ></el-table-column>
                <el-table-column prop="level" label="权限等级" >
                    <template v-slot="scope">
                        <el-tag size="medium"  v-if="scope.row.level==0">一级</el-tag>
                        <el-tag size="medium" type="success" v-if="scope.row.level==1">二级</el-tag>
                        <el-tag size="medium" type="warning" v-if="scope.row.level==2">三级</el-tag>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>

</template>

<script>
    import axios from '@/axios'

    export default {
        name: "PermissionsView",
        data(){
            return{
               authList:[]
            }
        },
        methods:{
            //获取线形结构的数据分布
             async getauthritylist(){
                 var res=await axios.get('/authList')
                 console.log(res.data.data)
                 this.authList=res.data.data
             }
        },
        created() {
          this.getauthritylist()
        }
    }
</script>

<style scoped>
    .el-tag{
        width: 60px;
        font-size: 15px;
    }
    .table{
       width: 79vw;
        position: relative;top: 20px;left: 10px;
        margin-bottom: 20px;
    }
    .box-card{
        display: flex;
        position: relative;
        margin: 20px 20px;
        box-shadow: 0 1px 1px rgba(0,0,0,0.15)!important;
        padding: 2px 2px;
    }
</style>