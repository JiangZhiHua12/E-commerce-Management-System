<template>
    <div class="product">

        <!-- 面包屑 -->
        <el-breadcrumb >
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
            <el-breadcrumb-item>添加商品</el-breadcrumb-item>
        </el-breadcrumb>
            <div class="container" >
                     <el-steps  class="step" :active="active" finish-status="success">
                         <el-step space="200px" title="填写商品信息"></el-step>
                         <el-step title="填写商品属性"></el-step>
                     </el-steps>
                <div ref="ProductDetail" class="ProductDetail" style="width: 600px;margin-top: 20px">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <el-form-item label="商品分类" prop="ProductCategory">
                            <el-select v-model="ruleForm.ProductCategory" placeholder="请选择">
                                <el-option
                                        v-for="item in ruleForm.options1"
                                        :key="item.type_name"
                                        :value="item.type_name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品名称" prop="productName">
                            <el-input type="text" v-model="ruleForm.productName" autocomplete="off"></el-input>
                        </el-form-item>
                        <el-form-item label="副标题" prop="subheading">
                            <el-input v-model.number="ruleForm.subheading"></el-input>
                        </el-form-item>
                        <el-form-item label="商品品牌" prop="brand">
                            <el-select v-model="ruleForm.brand" placeholder="请选择品牌">
                                <el-option
                                        v-for="item in ruleForm.options2"
                                        :key="item.value"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="商品介绍" prop="introduce">
                            <el-input
                                    type="textarea"
                                    :rows="2"
                                    placeholder="请输入内容"
                                    v-model="ruleForm.productIntroduce">
                            </el-input>
                        </el-form-item>
                        <el-form-item label="商品货号" prop="product_num">
                            <el-input v-model.number="ruleForm.productNumber"></el-input>
                        </el-form-item>
                        <el-form-item label="商品售价" prop="price">
                            <el-input v-model.number="ruleForm.Price"></el-input>
                        </el-form-item>
                        <el-form-item label="市场价" prop="market">
                            <el-input v-model.number="ruleForm.market"></el-input>
                        </el-form-item>
                        <el-form-item label="商品库存" prop="inventory">
                            <el-input v-model.number="ruleForm.ProductInventory"></el-input>
                        </el-form-item>
                        <el-form-item label="计量单位" prop="measurement">
                            <el-input v-model.number="ruleForm.measurement"></el-input>
                        </el-form-item>
                        <el-form-item  label="商品重量" prop="weight">
                            <div class="weight">
                                <el-input v-model.number="ruleForm.weight"></el-input>
                                <span>克</span>
                            </div>

                        </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm">下一步</el-button>
                    </el-form-item>
                    </el-form>
                </div>
                <div ref="Attributes" class="ProductAttributes">
                    <ProductAttributes :hiddenCom="hiddenCom"  :ruleFromOne="ruleForm"></ProductAttributes>
                </div>


            </div>
    </div>
</template>

<script>
    import ProductAttributes from "@/components/ProductAttributes";
    import axios from "@/axios";
    export default {
        name: "addProduct",
        components:{ProductAttributes},
        data(){
            return{
                active:0,
                ruleForm:{
                    ProductCategory:"",
                    productName:"",
                    subheading:"",
                    brand:"",
                    productIntroduce:'',
                    productNumber:'',
                    Price:'0',
                    market:'0',
                    ProductInventory:0,
                    measurement:'',
                    weight:'',
                    options1:[],
                    options2:[{value:'手机'}]
                },
                rules:{
                    ProductCategory:[{ required: true, message: '请选择商品分类', trigger: 'blur'}],
                    productName:[{required: true, message: '请输入商品名称', trigger: 'blur'}],
                    subheading:[{required: true, message: '请输入商品副标题', trigger: 'blur'}],
                    brand:[{required: true, message: '请选择商品品牌', trigger: 'blur'}]

                }
            }
        },
       async created() {
           var result=await axios.get('/getProductType')
           // console.log(result.data.data)

           if (this.$route.query.data==undefined){
               this.ruleForm.options1=result.data.data
           }else {
               this.ruleForm=JSON.parse(this.$route.query.data)
               this.ruleForm.options1=result.data.data
           }


        },
        mounted() {

        },
        methods:{
            hiddenCom(){
                this.$refs.Attributes.style.display='none'
                this.$refs.ProductDetail.style.display='block'
            },
            submitForm() {
                 this.$refs.ruleForm.validate((valid)=>{
                     if (valid){
                         if (this.active++ > 2) this.active = 0;
                         this.$refs.Attributes.style.display='block'
                         this.$refs.ProductDetail.style.display='none'
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
    .ProductAttributes_{
        display:block;
    }
.ProductAttributes{
    display: none;
}
    .weight{
        display: flex;
        flex-direction: row;
    }
    .step{
       margin-top: 20px;
        width: 600px;
        display: flex;
    }
.container{
    border: 1px solid #EBE9EA;
    width: 1200px;
    height: auto;
    margin-top: 50px;
    margin-left: 50px;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 20px;
}
</style>