<template>
<div class="product">

    <!-- 面包屑 -->
    <el-breadcrumb >
        <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

</div>
    <!-- 主体区域内容card -->
    <el-card class="box-card">

        <!-- 添加商品 -->
        <el-col class="col">
            <el-button type="primary"  @click="isShowAddUser = true">添加商品</el-button>
        </el-col>
        <!-- 树形table控件 -->
        <el-table
                class="table"
                :data="ProductCat"
                border
                row-key="id"
                :default-expand-all="false"
                :tree-props="{children: 'children'}"
                :load="load"
                :lazy="true"
        >
            <el-table-column  label="#" type="index" width="60px"></el-table-column>
            <el-table-column
                    prop="product_name"
                    label="商品分类">
            </el-table-column>
            <el-table-column
                    prop="status"
                    label="是否有效">
                <template >
                    <i class='el-icon-success' ></i>
                </template>
            </el-table-column>

        </el-table>

    </el-card>
</template>

<script>
   import axios from '@/axios'
   //import ZkTable from 'vue-table-with-tree-grid'
    export default {
        name: "ProductCategoryView",

        data(){
            return{
               ProductCat:[],
                columns:[
                    {
                        label:'分类名称',
                        prop:'product_name'
                    }
                ]
            }
        },
        methods:{
            load(tree, treeNode, resolve) {
                setTimeout(() => {
                    resolve(this.ProductCat)
                }, 1000)
            },
        },
       async created() {
            var res=await axios.get('/ProductCat')
           console.log(res.data.data)
           this.ProductCat=res.data.data
        }
    }
</script>

<style scoped>
    .table{
        display: flex;
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