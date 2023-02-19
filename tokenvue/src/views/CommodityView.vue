<template>
    <div class="product">

        <!-- 面包屑 -->
        <el-breadcrumb >
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>

    </div>
    <el-card class="box-card">
        <!-- 搜索商品  -->
       <div class="search">
           <div class="search_title">
               <h3 style="color: #666666;margin-left: 20px">筛选搜索</h3>
               <div class="search_title_one">
                   <el-button @click="search" type="primary">查询</el-button>
                   <el-button  @click="Reset" plain>重置</el-button>
               </div>
           </div>
           <div class="search_input">
               <div class="product_name">
                   <label>输入搜索:</label>
                   <el-input
                           class="input_one"
                           placeholder="请输入商品名称"
                           clearable
                           v-model="product_name"
                   >
                   </el-input>
               </div>
               <div class="product_name">
                   <label>商品货号:</label>
                   <el-input
                           class="input_one"
                           placeholder="商品货号"
                           clearable
                           v-model="product_order"
                   >
                   </el-input>
               </div>
               <div class="product_name">
                   <label>商品分类:</label>
                   <el-select class="input_one" v-model="product_cat" placeholder="请选择">
                       <el-option
                               class="input_one"
                               v-for="item in options4"
                               :key="item.value"
                               :value="item.value">
                       </el-option>
                   </el-select>
               </div>
               <div class="product_name">
                   <label>商品品牌:</label>
                   <el-select class="input_one" v-model="brand" placeholder="请选择商品品牌">
                       <el-option
                               class="input_one"
                               v-for="item in options3"
                               :key="item.value"
                               :value="item.value">
                       </el-option>
                   </el-select>
               </div>
               <div class="product_name">
                   <label>上架状态:</label>
                   <el-select class="input_one" v-model="Listing_status" placeholder="全部">
                       <el-option
                               class="input_one"
                               v-for="item in options1"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                       </el-option>
                   </el-select>
               </div>
               <div class="product_name">
                   <label>审核状态:</label>
                   <el-select class="input_one" v-model="Audit_status" placeholder="全部">
                       <el-option
                               v-for="item in options2"
                               :key="item.value"
                               :label="item.label"
                               :value="item.value">
                       </el-option>
                   </el-select>

               </div>

           </div>
       </div>

        <!-- 商品列表  -->
        <div class="product_list">
            <div class="add_product">
                <h3 style="color: #666666;margin-left: 20px">商品列表</h3>
                <el-button @click="addProduct" style="margin-left: 20px" type="primary">添加商品</el-button>
            </div>
            <el-table
                    :data="productList"
                    class="el-table"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="id"
                        label="编号"
                        width="120">
                </el-table-column>
                <el-table-column
                        label="商品图片"
                        width="120">
                    <template v-slot="scope">
                        <el-image :src="scope.row.Img"></el-image>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="productName"
                        label="商品名称"
                width="200px">
                </el-table-column>
                <el-table-column
                        label='价格/货号'
                        width="120px"
                >
                    <template v-slot="scope">

                        <div style="display: flex;flex-direction: column">
                            <span style="margin-left: 10px">价格:{{scope.row.Price}}</span>
                            <span style="margin-left: 10px">货号:{{scope.row.productNumber}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="tag"
                        label='标签'
                width="150px">
                    <template v-slot="scope">
                        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
                            <div style="display: flex;flex-direction: row;align-items: center;">
                                <span>上架:</span>
                                <el-switch
                                        @click="statu(scope.row.Shelves,scope.row.id,scope.row.AudiStatus)"
                                        style="margin-left: 10px"
                                        v-model="scope.row.Shelves"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="inventory"
                        label='库存'
                width="120px">
                </el-table-column>
                <el-table-column
                        prop="Sales"
                        label='销量'
                width="120px">
                </el-table-column>
                <el-table-column
                        prop="Audit_status"
                        label='审核状态'
                width="120px">
                    <template v-slot="scope">
                        <div style="display: flex;flex-direction: column;justify-content: center;align-items: center">
                            <el-tag v-if="scope.row.AudiStatus==0" >正在审核</el-tag>
                            <el-tag v-if="scope.row.AudiStatus==1" type="success">审核通过</el-tag>
                            <el-tag v-if="scope.row.AudiStatus==2" type="danger">审核未通过</el-tag>
                            <span style="color: #409EFF;cursor: pointer;font-size: 13px">审核详情</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop='operate'
                        label='操作'
                        >
                    <template v-slot="scope">
                        <div class="point" style="display: flex;justify-content: center;align-items: center">
                            <el-button type="primary" @click="edit_(scope.row.id)">编辑</el-button>
                            <el-button type="danger"  @click='delete_(scope.row.id)'>删除</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>

        </div>
        <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>

    </el-card>
</template>

<script>
    import axios from "@/axios"
    export default {
        name: "CommodityView",
        data(){
            return{
                hh:true,
                queryInfo:{
                    Search:'',
                    //当前的页数
                    pagenum:1,
                    //当前每页显示多少条数据
                    pagesize:10
                },
                total:null,
                productList:[],
                product_name:'',
                brand:'',
                product_cat:'',
                product_order:'',
                Audit_status:'',
                Listing_status:'',
                options1:[{value:'已上架', lable:'已上架'}, {value:'未上架', lable:'未上架'}],
                options2:[{value:'已审核', lable:'已审核'}, {value:'未审核', lable:'未审核'}],
                options3:[{value:'华为',}],
                options4:[{value:'手机',}]
            }
        },
       async created() {
         this.getProductList()
        },
        mounted() {

        },
        methods:{
           async statu(Shelves,id,AudiStatus){
               console.log(Shelves)
               console.log(AudiStatus)
                if (Shelves==true && AudiStatus==1 ){

                    console.log('上架成功')
                    var result=await axios.post('/editStatus',{Shelves:Shelves,id:id})
                    console.log(result)
                    this.getProductList()
                    this.$message({
                        message: '上架成功',
                        type: 'success'
                    });

                }else if (Shelves==false){
                    console.log('下架成功')
                    var result2=await axios.post('/editStatus',{Shelves:Shelves,id:id})
                    console.log(result2)
                    this.getProductList()
                    this.$message({
                        message: '下架成功',
                        type: 'success'
                    });
                }else {
                    this.getProductList()
                    this.$message({
                        message: '审核未通过不能上架',
                        type: 'warning'
                    });
                }
            },
            async edit_(id){
                console.log(id)
                var result=await axios.post('/edit',{id:id})
                console.log(result.data.data[0])
                this.$router.push({name:'addProduct',query:{data:JSON.stringify(result.data.data[0])}})
            },
            delete_(id){
                console.log(id)
                this.$confirm('确定要删除该商品', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                    var result=await axios.post('/delete',{id:id})
                    console.log(result)
                    this.getProductList()
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
            async getProductList(){
                var res=await axios.get('/getProductList',{params:this.queryInfo})
                console.log(res.data)
                this.productList=res.data.data
                this.total=res.data.total

            },
            handleSizeChange(newsize){
                this.queryInfo.pagesize=newsize
                this.getProductList()
            },
            handleCurrentChange(newnum){
                this.queryInfo.pagenum=newnum
                this.getProductList()
            },
            addProduct:function(){
              this.$router.push({name:'addProduct'})
            },
            search:function(){

            },
            Reset:function () {
               this.product_name=''
               this.brand=''
               this.product_order=''
                this.product_cat=''
                this.Audit_status=''
                this. Listing_status=''
            }
        }
    }
</script>

<style scoped>

    .el-table{
        margin-top: 20px;
    }
    .product_list{
        margin-top: 20px;
    }
    .input_one{
        width: 250px;
        margin-left: 20px;

    }
    .product_name label{
        font-size: 13px;
        color: #333333;
    }
    .product_name{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-left: 50px;
        margin-bottom: 20px;
    }
    .search_input{
        display: flex;
        flex-wrap: wrap;
        margin-top: 10px;
    }
    .search_title_one{
        margin-right: 10px;
    }
    .search_title{
        display: flex;
        justify-content: space-between;
        height: 40px;
       align-items: center;
        margin-top: 10px;
    }
    .search{
        border: 1px solid #EBE9EA;
        display: flex;
        flex-direction: column;
        width:1250px ;
        height: 200px;
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