<template>
    <div class="product">

        <!-- 面包屑 -->
        <el-breadcrumb >
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品类型</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container">
        <el-card class="box-card">
           <div class="title">
               <h3 style="margin-left: 10px">数据类型</h3>
               <el-button @click="addType" type="primary" style="margin-right: 10px">添加</el-button>
           </div>

            <div class="el-table">
                <el-table

                        :data="tableData"
                        border
                        style="width: 100%">
                    <el-table-column
                            prop="id"
                            label="编号"
                            width="100px">
                    </el-table-column>
                    <el-table-column
                            prop="type_name"
                            label="类型名称"
                            width="300px">
                    </el-table-column>
                    <el-table-column
                            prop="attribute_num"
                            label="属性数量"
                    width="200px">
                    </el-table-column>
                    <el-table-column
                            prop="parameter_num"
                            label="参数数量"
                    width="200px">
                    </el-table-column>
                    <el-table-column
                            label="设置"
                    width="200px">
                        <template v-slot="scope">
                            <div class="set">
                                <el-button plain @click="attribute(scope.row.id,scope.row.type_name)">属性列表</el-button>
                                <el-button plain @click="parameter(scope.row.id,scope.row.type_name)">参数列表</el-button>
                            </div>
                        </template>


                    </el-table-column>
                    <el-table-column
                            label="操作"
                    >
                        <template v-slot="scope">
                            <div class="point">
                                <el-button type="primary" @click="edit_(scope.row.id)">修改</el-button>
                                <el-button type="danger"  @click='delete_(scope.row.id)'>删除</el-button>
                            </div>
                        </template>


                    </el-table-column>
                </el-table>
            </div>

            <el-dialog title="添加商品类型"
                       v-model="isShow"
                       width="40%"
                       center>
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="类型名称" prop="type_name">
                        <el-input type="text" v-model="ruleForm.type_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">添加</el-button>
                        <el-button @click="resetForm">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>

            <el-dialog title="修改商品类型"
                       v-model="isShow2"
                       width="40%"
                       center>
                <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="类型名称" prop="type_name">
                        <el-input type="text" v-model="ruleForm2.type_name" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm2">添加</el-button>
                        <el-button @click="resetForm2">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    import axios from '@/axios'
    import {ElMessage} from "element-plus";
    //import {ElMessage} from "element-plus";
    export default {
        name: "ClassifyView",
        data(){
            return{
                edit:[],
                tableData:[],
                isShow:false,
                isShow2:false,
                ruleForm:{
                    type_name:'',
                    attribute_num:0,
                    parameter_num:0
                },
                ruleForm2:{
                    type_name:'',
                    attribute_num:0,
                    parameter_num:0
                },
                rules:{
                    type_name: [{ required: true, message: '请输入商品类型', trigger: 'blur'}]
                },
                rules2:{
                    type_name: [{ required: true, message: '请输入商品类型', trigger: 'blur'}]
                }
            }
        },
       async created() {
            this.getProductType()

        },
        mounted() {

        },
        methods:{
            attribute:function(id,type_name){
                this.$router.push({name:'Attribute',query:{id:id,type_name:type_name,attributeORparameter:0}})
            },
            parameter:function(id,type_name){
                this.$router.push({name:'ParameterView',query:{id:id,type_name:type_name,attributeORparameter:1}})
            },
            edit_:async function(id){
                var result=await axios.get('/getType',{params:{id:id}})
                console.log(result.data.data)
                this.ruleForm2.type_name=result.data.data[0].type_name
                this.edit=result.data.data
               this.isShow2=true
            },
            delete_:async function(id){
                //console.log(id)
                this.$confirm('是否继续此操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    var result=await axios.post('/deleteProductType',{id:id})
                    console.log(result)
                    this.getProductType()
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });

            },
            async getProductType(){
                var result=await axios.get('/getProductType')
                console.log(result.data.data)
                this.tableData=result.data.data
                this.tableData.forEach(async (item)=>{
                    console.log('----123')
                    console.log(item.id)
                    var result2=await axios.get('/getProductArrNum',{params:{id:item.id,}})
                    console.log(result2.data)

                   var result3=await axios.post('/editProductTypeNum',{attribute_num:result2.data.attribute_num,parameter_num:result2.data.parameter_num,id:result2.data.id})
                    console.log(result3)
                    var result4=await axios.get('/getProductType')
                    this.tableData=result4.data.data
                })


            },
            resetForm:function(){
                this.$refs.ruleForm.resetFields();
            },
            resetForm2:function(){
                this.$refs.ruleForm2.resetFields();
            },
            submitForm:function(){
                this.$refs.ruleForm.validate( async (valid)=>{
                    if (valid){
                    this.isShow=false
                        var result=await axios.post('/addProductType',{type_name:this.ruleForm.type_name,attribute_num:this.ruleForm.attribute_num,parameter_num:this.ruleForm.parameter_num})
                        console.log(result)
                        this.getProductType()
                        ElMessage({
                            showClose: true,
                            message:result.data.msg,
                            type: 'success',
                        })
                    }else {
                        return false
                    }
                })
            },
            submitForm2:function(){
                this.$refs.ruleForm2.validate( async (valid)=>{
                    if (valid){
                        this.isShow2=false
                        var result=await axios.post('/editProductType',{type_name:this.ruleForm2.type_name,id:this.edit[0].id})
                        console.log(result)
                        this.getProductType()
                        ElMessage({
                            showClose: true,
                            message:result.data.msg,
                            type: 'success',
                        })
                    }else {
                        return false
                    }
                })
            },
            addType:function () {
               this.isShow=true
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
    .set{
        display:flex;

        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .el-table{
        margin-top: 20px;
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
</style>