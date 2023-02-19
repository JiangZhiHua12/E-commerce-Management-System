<template>
    <div class="product">

        <!-- 面包屑 -->
        <el-breadcrumb >
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品类型</el-breadcrumb-item>
            <el-breadcrumb-item>商品属性</el-breadcrumb-item>
        </el-breadcrumb>
    </div>

    <div class="container">
        <el-card class="box-card">
            <div class="title">
                <h3 style="margin-left: 10px">数据类型</h3>
                <el-button @click="addType" type="primary" style="margin-right: 10px">添加</el-button>
            </div>

            <el-table
                    :data="tableData"
                    class="el-table"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="编号"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="ProductName"
                        label="属性名称"
                        width="140">
                </el-table-column>
                <el-table-column
                        prop="ProductType"
                        label="商品类型"
                        width="140px">
                </el-table-column>
                <el-table-column
                        prop="ArrCheck"
                        label='属性是否可选'
                        width="140px"
                >
                </el-table-column>
                <el-table-column
                        prop="WriteWay"
                        label='属性值的录入方式'
                        width="140px">
                </el-table-column>
                <el-table-column
                        prop="CheckValue"
                        label='可选值列表'
                        width="250px">
                </el-table-column>
                <el-table-column
                        prop="sort"
                        label='排序'
                        width="60px">
                </el-table-column>

                <el-table-column
                        prop='operate'
                        label='操作'
                >
                    <template v-slot="scope">
                        <div class="point">
                            <el-button type="primary" @click="edit_(scope.row.id)">修改</el-button>
                            <el-button type="danger"  @click='delete_(scope.row.id)'>删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>

    </div>
</template>

<script>
    import axios from '@/axios'
    export default {
        name: "AttributeView",
        data(){
            return{
                edit:[],
                tableData:[],
                productType_id:null,
                type_name:'',
                attributeORparameter:null
            }
        },
       async created() {

            console.log( this.$route.query.type_name)
           this.productType_id=this.$route.query.id
           this.type_name=this.$route.query.type_name
           this.attributeORparameter=this.$route.query.attributeORparameter
           var result=await axios.get('/getProductArr',{params:{id:this.productType_id,Parameter:this.attributeORparameter}})
           console.log(result.data.data)
          this.tableData=result.data.data

        },
        mounted() {

        },
        methods:{
            addType:function() {
                this.$router.push({name:'addProductAttr',query:{id:this.productType_id,type_name:this.type_name,attributeORparameter:this.attributeORparameter}})
            },
            delete_:function (id) {
                console.log(id)
                this.$confirm('是否要删除该属性, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {

                    var result=await axios.post('/deleteArr',{id:id})
                    console.log(result.data)
                    if (result.data.status===0){
                        var result2=await axios.get('/getProductArr',{params:{id:this.productType_id,Parameter:this.attributeORparameter}})
                        console.log(result2.data.data)
                        this.tableData=result2.data.data
                        this.$message({
                            type: 'success',
                            message: result.data.message
                        });
                    }else if(result.data.status===1){
                        this.$message({
                            type: 'error',
                            message: result.data.message
                        });
                    }

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }


        }
    }
</script>

<style scoped>
    .point{
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .title{
        border: 1px solid #EBE9EA;
        display: flex;
        justify-content: space-between;
        width: 1200px;
        align-items: center;
    }
    .box-card{
        display: flex;
        position: relative;
        margin: 20px 20px;
        box-shadow: 0 1px 1px rgba(0,0,0,0.15)!important;
        padding: 2px 2px;
        font:12px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;;
    }
   .el-table{
       margin-top: 40px;
   }
</style>