<template>
    <div class="product">

        <!-- 面包屑 -->
        <el-breadcrumb >
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品类型</el-breadcrumb-item>
            <el-breadcrumb-item>商品属性</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品属性</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container" >
        <div ref="ProductDetail" class="ProductDetail" style="width: 600px;margin-top: 20px">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">

                <el-form-item label="属性名称" prop="ProductName">
                    <el-input type="text" v-model="ruleForm.ProductName" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="商品类型" prop="ProductType">
                    <el-select v-model="ruleForm.ProductType" placeholder="请选择">
                        <el-option
                                v-for="item in ruleForm.options1"
                                :key="item.type_name"
                                :value="item.type_name">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="分类筛选样式" prop="ClassStyle">
                    <el-radio-group v-model="ruleForm.ClassStyle">
                        <el-radio label="普通">普通</el-radio>
                        <el-radio label="颜色">颜色</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="能否进行检索" prop="isIndex">
                    <el-radio-group v-model="ruleForm.isIndex">
                        <el-radio label="不需要检索">不需要检索</el-radio>
                        <el-radio label="关键字检索"></el-radio>
                        <el-radio label="范围检索"></el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="商品属性关联" prop="ArrAss">
                    <el-radio-group v-model="ruleForm.ArrAss">
                        <el-radio label="是">是</el-radio>
                        <el-radio label="否">否</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="属性是否可选" prop="ArrCheck">
                    <el-radio-group v-model="ruleForm.ArrCheck">
                        <el-radio label="唯一">唯一</el-radio>
                        <el-radio label="单选">单选</el-radio>
                        <el-radio label="复选">复选</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="属性值的录入方式" prop="WriteWay">
                    <el-radio-group v-model="ruleForm.WriteWay">
                        <el-radio label="手工录入">手工录入</el-radio>
                        <el-radio label="从下面列表选择">从下面列表选择</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="属性值可选值列表" prop="CheckValue">
                    <el-input type="textarea" v-model="ruleForm.CheckValue"></el-input>
                </el-form-item>
                <el-form-item label="是否支持手动新增"  prop="Manual">
                    <el-radio-group  v-model="ruleForm.Manual">
                        <el-radio  label="是">是</el-radio>
                        <el-radio label="否">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="排序属性" prop="Sort">
                    <el-input v-model.number="ruleForm.Sort"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button class="btn" type="primary" @click="submitForm">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>
    import axios from "@/axios"
    import {ElMessage} from "element-plus";
    export default {
        name: "addProductAttr",
        data(){
            return{

               ruleForm:{
                   options1:[],
                   ProductType:'',
                   Sort:0,
                   CheckValue:'',
                   ProductName:'',
                   ClassStyle:'普通',
                   isIndex:'不需要检索',
                   ArrAss:'否',
                   ArrCheck:'唯一',
                   WriteWay:'手工录入',
                   Manual:'否',
                   productType_id:null,
                   attributeORparameter:null
               },
                rules:{
                    ProductName:[{ required: true, message: '请填写属性名称', trigger: 'blur' },],
                    ProductType:[ { required: true, message: '请选择商品类型', trigger: 'blur' },],
                }
            }
        },
       async created() {
            this.ruleForm.productType_id=this.$route.query.id
            this.ruleForm.ProductType=this.$route.query.type_name
           this.ruleForm.attributeORparameter=this.$route.query.attributeORparameter
            var result=await axios.get('/getProductType')
           console.log('haha')
           console.log(result.data.data)
           this.ruleForm.options1=result.data.data

        },
        mounted() {

        },
        methods:{
            submitForm() {
                this.$refs.ruleForm.validate(async (valid)=>{
                    if (valid){
                        var result=await axios.post('/addProductArr',this.ruleForm)
                        console.log(result)
                        if (result.data.status==1){
                            ElMessage({
                                showClose: true,
                                message: result.data.message,
                                type: 'success',
                            })
                            if (this.ruleForm.attributeORparameter==0){
                                this.$router.push({name:'Attribute',query:{id:this.ruleForm.productType_id,type_name:this.ruleForm.type_name,attributeORparameter:this.ruleForm.attributeORparameter}})
                            }
                            else if (this.ruleForm.attributeORparameter==1){
                                this.$router.push({name:'ParameterView',query:{id:this.ruleForm.productType_id,type_name:this.ruleForm.type_name,attributeORparameter:this.ruleForm.attributeORparameter}})
                            }
                        }else if (result.data.status==2){
                            ElMessage({
                                showClose: true,
                                message: result.data.message,
                                type: 'error',
                            })
                        }
                    }
                    else {
                        return false;
                    }
                })



            }
        }
    }
</script>

<style scoped>
    .btn{width: 100px}
    .ProductAttributes_{
        display:block;
    }
    .ProductAttributes{
        display: none;
    }

    .step{
        margin-top: 20px;
        width: 600px;
        display: flex;
    }
    .container{
        border: 1px solid #EBE9EA;
        width: 1200px;
        height: 800px;
        margin-top: 50px;
        margin-left: 50px;
        display: flex;
        align-items: center;
        flex-direction: column;
        margin-bottom: 20px;
    }
</style>