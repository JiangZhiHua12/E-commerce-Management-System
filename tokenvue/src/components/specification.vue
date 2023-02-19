<template>

    <el-table
            :data="tableData"
            class="el-table"
            border
            style="width: 100%">

            <el-table-column
                    v-for="(item,index) in specification_"
                    :key="index"
                    :prop="item.ProductName"
                    :label="item.ProductName"
                    width="100">
            </el-table-column>


        <el-table-column
                prop="Price"
                 label="销售价格"
                width="100">
            <template v-slot="scope">
                <el-input type="text" @input="changes($event,scope.row.id,'Price')" v-model="scope.row.Price"></el-input>
            </template>
        </el-table-column>

        <el-table-column
                prop="Inventory"
                label="库存"
                width="100">
            <template v-slot="scope">
                <el-input type="text" @input="changes($event,scope.row.id,'Inventory')" v-model="scope.row.Inventory"></el-input>
            </template>
        </el-table-column>
        <el-table-column
                prop="InventoryWarning"
                label="库存预警值"
                width="100px">
            <template v-slot="scope">
                <el-input type="text" @input="changes($event,scope.row.id,'InventoryWarning')" v-model="scope.row.InventoryWarning"></el-input>
            </template>
        </el-table-column>
        <el-table-column
                prop="SKUID"
                label='SKU编号'
                width="400px"
        >
            <template v-slot="scope">
                <el-input type="text"  @input="changes($event,scope.row.id,'SKUID')" v-model="scope.row.SKUID"></el-input>
            </template>
        </el-table-column>
        <el-table-column
                prop="operate"
                label='操作'
                width="100px">
            <template v-slot="scope">
                <span @click="delete_(scope.row.id)" style="color: #00B7FF;cursor: pointer">删除</span>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    //import { defineEmits } from 'vue'


   // const emit = defineEmits(['tabledata'])
    export default {
        name: "SpecificationCom",
        props: {
            specification: Array,
            checkList: Array
        },





        data() {
            return {
                specification_: [],
                checkList_: [],
                tableData: [],
                tableDatas: []
            }
        },
        created() {

            this.checkList_ = this.checkList
            this.specification_ = this.specification
            console.log(this.specification)
            console.log(this.checkList_)
            var pangduan=this.checkList_.filter((item)=>{
                return JSON.stringify(item.value)!='[]'
            })
            console.log(pangduan)
            if (JSON.stringify(pangduan)=='[]'){
                console.log("不执行")
                this.specification_=[]
            }else {



                this.specification_.forEach((item, index) => {
                    if (JSON.stringify(this.checkList_[index].value) == '[]') {
                        var data = this.specification_.filter((item2) => {
                            return item2.ProductName != this.checkList_[index].type
                        })
                        this.specification_ = data
                    } else {
                        console.log('h')
                    }
                })

                var checkLength = this.checkList_.length
                console.log(checkLength)
                var arr_one = []
                this.checkList_.forEach((item => {
                    console.log(item.value)
                    arr_one.push(item.value)
                }))
                //var that = this
                console.log(arr_one)
                var data= arr_one.filter(value => {
                    return JSON.stringify(value) != '[]'
                })
                console.log(data[0].length)
               // var c=0
                var Total=this.result(data)
                console.log(Total)
               Total.forEach((item,index)=>{
                   var arr=item.split("/")
                   console.log(item.split("/"))
                   this.tableData.push(
                       {Price: 100,
                       Inventory: 500,
                       InventoryWarning: '',
                       SKUID: '2020426793277008'})
                  var dd=this.checkList_.filter((item)=>{
                      return JSON.stringify(item.value)!='[]'
                  })
                   console.log(dd)
                   dd.forEach((item2,index2)=>{
                       this.tableData[index][item2.type]=arr[index2]
                       this.tableData[index].id=index
                   })
               })
                console.log(this.result(data))

            }
            console.log(this.tableData)
           // this.$emit('tabledata',this.tableData)
            //console.log(context.emit)

           // emit('tabledata',this.tableData)

            window.localStorage.setItem('tabledata',JSON.stringify(this.tableData))


        },
        methods:{
            delete_:function(id){
                this.tableData.splice(id,1)
                console.log(id)
                var data=this.tableData.filter((item)=>{
                    return item.id!==data
                })
                this.tableData=data
                console.log(this.tableData)
            },
            changes_one:function(value,id){
                console.log('改变')
                console.log(value)
                console.log(id)
                this.tableData[id].Inventory=value
                console.log(this.tableData)
            },
            changes_tow:function(value,id){
                console.log('改变')
                console.log(value)
                console.log(id)
                this.tableData[id].Inventory=value
                console.log(this.tableData)
            },
            changes_three:function(value,id){
                console.log('改变')
                console.log(value)
                console.log(id)
                this.tableData[id].Inventory=value
                console.log(this.tableData)
            },
            changes:function(value,id,a){
                console.log('改变')
                console.log(value)
                console.log(id)

                this.tableData[id][a]=value
                console.log(this.tableData)
            },
            result(arr_one) {
                if (arr_one.length==1){
                    console.log('-----123')
                    return arr_one[0]
                }
                else {
                   // var d=c+1
                    var length_one=arr_one[0].length
                    var length_tow=arr_one[1].length
                    console.log(length_one)
                    console.log(length_tow)
                  //  var length_three=checkList.length

                    var newarr=[]
                    var index=0

                    for (var i=0;i<length_one;i++){

                        for (var j=0;j<length_tow;j++){

                            newarr[index]=arr_one[0][i]+"/"+arr_one[1][j]
                            index++
                        }
                    }
                    var arr=arr_one.splice(2)
                    arr.unshift(newarr)
                    return this.result(arr)

                }




            }
        }

    }
</script>

<style scoped>

</style>