<template>
        <div ref="ProductDetail" class="ProductDetail" style="width: 900px;margin-top: 20px">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item  label="属性类型:" prop="productType">
                    <el-select @change="change(ruleForm.productType)" v-model="ruleForm.productType" placeholder="请选择">
                        <el-option
                                v-for="item in ruleForm.options1"
                                :key="item.type_name"
                                :value="item.type_name">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="商品规格:" prop="product_name">
                    <div class="specification_one" v-if="isshow==false" ></div>
                    <div class="specification_tow" @tabledata="tabledata_" v-if="isshow==true" >
                         <ul>
                           <li v-for="(item,index) in specification" :key="item.id">
                               <div>
                                   <span style="color: #666666">{{item.ProductName}}:</span>
                                   <span style="display: flex;flex-direction: row">
                                       <!-- 是否单选 -->
                                        <el-radio-group v-if="item.ArrCheck=='单选'" v-model="radio[item.index].value">
                                         <el-radio v-for="(item2,index2) in item.CheckValue.sku" :key="index2" :label="item2">{{item2}}<span @click="delete_(index,index2)" v-if="index2>item.CheckValue.length-1&&item.Manual=='是'" style="margin-left: 5px;font-size: 12px">删除</span></el-radio>
                                          </el-radio-group>
                                       <!-- 是否多选选 -->
                                          <el-checkbox-group @change="checkList_(index)" v-if="item.ArrCheck=='复选'" v-model="checkList[item.index].value">
                                               <el-checkbox :checked="istrue" style="color: #666666" v-for="(item2,index2) in  item.CheckValue.sku" :key="index2" :label="item2">{{item2}}<span @click="delete_(index,index2)" v-if="index2>item.CheckValue.length-1&&item.Manual=='是'" style="margin-left: 5px;font-size: 12px">删除</span></el-checkbox>

                                         </el-checkbox-group>
                                       <!-- 是否唯一 -->
                                       <div v-if="item.ArrCheck=='唯一'">

                                       </div>
                                    </span>
                                   <!-- 是否手动新增 -->
                                   <span class="manual" v-if="item.Manual=='是'">
                                       <el-input @change="input_(index)" v-model="inputList[item.index2].value" value="" class="input" ></el-input>
                                       <el-button @click="addSku(index)" class="btn" type="primary">增加</el-button>
                                   </span>
                               </div>
                           </li>
                        </ul>
                    </div>
                      <specification :key="time_" :checkList="checkList" :specification="specification" class="specification_three"></specification>
                </el-form-item>
                <el-form-item label="属性图片:" prop="IMG">
                    <UploadImg ref="UploadImg" :key="time_" :checkList="checkList" class="upload" v-if="ischeckImg==true"></UploadImg>
                    <div v-if="ischeckImg==false"  class="specification_four"></div>
                </el-form-item>

                <el-form-item label="商品参数:" prop="parameter">
                     <ul style="background-color: #F8F9FD;height: auto;width:1000px ">
                         <li style="margin-left: -50px" class="parameter" v-for="(item,index) in specification_tow" :key="index">
                            <span class="parameter_" >
                               <span style="width: 100px;display: flex;justify-content: flex-end">{{item.ProductName}}:</span>
                                     <!-- 是否单选 -->
                                        <el-radio-group v-if="item.ArrCheck=='单选'" @change="radio_tow_(index)" v-model="radio_tow[item.index].value">
                                         <el-radio v-for="(item2,index2) in item.CheckValue.sku" :key="index2" :label="item2">{{item2}}<span @click="delete_(index,index2)" v-if="index2>item.CheckValue.length-1&&item.Manual=='是'" style="margin-left: 5px;font-size: 12px">删除</span></el-radio>
                                          </el-radio-group>
                                    <!-- 是否多选 -->
                                          <el-checkbox-group @change="checkList_tow_(index)" v-if="item.ArrCheck=='复选'" v-model="checkList_tow[item.index].value">
                                               <el-checkbox :checked="istrue" style="color: #666666" v-for="(item2,index2) in  item.CheckValue.sku" :key="index2" :label="item2">{{item2}}<span @click="delete_(index,index2)" v-if="index2>item.CheckValue.length-1&&item.Manual=='是'" style="margin-left: 5px;font-size: 12px">删除</span></el-checkbox>

                                           </el-checkbox-group>
                                    <!-- 是否唯一 -->
                                        <div v-if="item.ArrCheck=='唯一'">
                                       <span class="parameter_" v-if="item.ArrCheck=='唯一'">
                                  <el-input  style="margin-left: 10px;width: 250px;"  v-model="sole_tow[index].value"  placeholder="请输入内容"></el-input>
                             </span>
                                       </div>
                                    <!-- 是否手动新增 -->
                                <span class="manual" v-if="item.Manual=='是'">
                                       <el-input @change="input_(index)" v-model="inputList_tow[item.index2].value" value="" class="input" ></el-input>
                                       <el-button @click="addSku(index)" class="btn" type="primary">增加</el-button>
                                   </span>
                            </span>
                         </li>
                     </ul>


                </el-form-item>
                <el-form-item label="商品相册:" prop="introduce">
                    <div style="background-color:#F8F9FD ;width: 1000px;height: 500px">
                        <el-upload
                                list-type="picture-card"
                                :on-preview="handlePictureCardPreview"
                                 :on-remove="handleRemove"
                                :file-list="fileList"
                                :on-change="imgChange"
                                action=""
                                :auto-upload="true"
                          >

                            <i class="el-icon-plus"></i>
                        </el-upload>
                        <el-dialog v-model="dialogVisible">
                            <el-image :src="dialogImageUrl"></el-image>
                          </el-dialog>
                    </div>

                </el-form-item>
                <el-form-item label="规格参数:" prop="product_num">
                    <QuillEdithh  theme="snow" class="quill" ref="myQuillEditor"></QuillEdithh>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="goback">返回上一步</el-button>
                    <el-button type="primary" @click="submitForm">提交</el-button>
                </el-form-item>
            </el-form>
      <div @click="test_one" >测试按钮</div>
        </div>
</template>

<script>
    import axios from "@/axios";
    import {ElMessage} from "element-plus";
    import specification from "@/components/specification";
    import UploadImg from "@/components/UploadImg";
    import QuillEdithh from "@/components/quill-edit"

    export default {
        name: "ProductAttributes",
        components:{specification,UploadImg,QuillEdithh},
        props:{
           ruleFromOne:Object,
            hiddenCom:{
                type:Function,
                default:null
            }

        },
        data(){
            return{
                check_color:[],
                Product_sku:[],
                file_:{},
                index:null,
                dialogImageUrl: '',
                dialogVisible: false,
                imageUrl:'',
                ischeckImg:false,
                fileList: [],
                time_:'',
                inputList:[],
                inputList_tow:[],
                sku:false,
                sole_tow:[],
                sole:[],
                radio:[],
                radio_tow:[],
                checkList_tow:[],
                checkList:[],
                selectList:[],
                specification:[],
                specification_tow:[],
                isshow:false,
                active:0,
                ruleForm:{
                    productType:"",
                    product_name:"",
                    subheading:"",
                    brand:"",
                    introduce:'',
                    product_num:'',
                    price:'0',
                    market:'0',
                    inventory:'0',
                    measurement:'',
                    weight:'',
                    options1:[],
                    options2:[{value:'手机'}]
                },
            }
        },
       async created() {
           var result=await axios.get('/getProductType')
           console.log(result.data.data)


           if (this.$route.query.data==undefined){
               this.ruleForm.options1=result.data.data
           }else {
               this.ruleForm.productType=JSON.parse(this.$route.query.data).ProductCategory
               this.ruleForm.options1=result.data.data
               this.change(this.ruleForm.productType)
           }



        },
        methods: {
            goback(){
          this.hiddenCom()
            },
            test_one(){
                this.$refs.myQuillEditor.guige()
            },
          test_(){
             var data=[]
              this.sole_tow.forEach((item)=>{
                  data.push(item)
              })
              this.radio_tow.forEach((item)=>{
                   data.push(item)
              })
              this.checkList_tow.forEach((item)=>{
                   data.push(item)
              })
              return JSON.stringify(data)
          },
           async parameter_upload(id){
                    var data=this.test_()
                          console.log(data)

                         var result=await axios.post('/addSpu',{spu:data,Product_Id:id})
                         console.log(result.data)




            },
            async shangc(id){
                console.log(this.fileList)
                for (var i=0;i<this.fileList.length;i++){
                    var formData=new FormData()
                    formData.append('imgFile',this.fileList[i].raw)
                    var result=await axios.post('/addProduct_one',formData)
                    console.log(result.data.imgUrl)
                    var result2=await axios.post('/addImg',{img:result.data.imgUrl,product_ID:id})
                    console.log(result2.data)

                }
            },
            click:function(){
                this.Product_sku=JSON.parse(window.localStorage.getItem('tabledata'))
                console.log(this.Product_sku)
            },
            async specifications_img(id){
                var specifications_imgUrl=JSON.parse(window.localStorage.getItem("specifications"))
                console.log(specifications_imgUrl)
                for (var j=0;j<specifications_imgUrl.length;j++){

                    var result=await axios.post('/addSpecifications_imgUrl',{img:specifications_imgUrl[j],product_ID:id})
                    console.log(result.data)
                }
            },
            submitForm:async function(file){
                console.log(file)
                console.log(this.fileList[0].raw)
                var formDataObj=new FormData()
                //console.log(formDataObj)

                 formDataObj.append('imgFile',this.fileList[0].raw)
                console.log(formDataObj.get('imgFile'))


               var result=await axios.post('/addProduct_one',formDataObj)
                console.log(result.data.imgUrl)
                console.log(this.ruleFromOne)
                var result2=await axios.post('/addProduct_tow',{
                    imgUrl:result.data.imgUrl,//商品图片
                     productName:this.ruleFromOne.productName,//商品名称
                    subheading:this.ruleFromOne.subheading,//副标题
                    Price:this.ruleFromOne.Price,//价格
                    productNumber:this.ruleFromOne.productNumber,//货号
                    Shelves:0,//是否上架，默认否，需要手动上架
                    Sales:0,//销量，默认0
                    Audistatus:0,
                    ProductCategory:this.ruleFromOne.ProductCategory,
                    brand:this.ruleFromOne.brand,
                    productIntroduce:this.ruleFromOne.productIntroduce,
                    ProductInventory:this.ruleFromOne.ProductInventory,//库存
                    measurement:this.ruleFromOne.measurement,//计量单位
                    weight:this.ruleFromOne.weight//重量

                })
                console.log(result2.data.id)
                this.Product_sku=window.localStorage.getItem('tabledata')
                console.log(this.Product_sku)
                var result3=await axios.post('/addProductSku',{sku:JSON.stringify(this.Product_sku),id:result2.data.id})
                console.log(result3.data)
                this.$refs.UploadImg.father(result2.data.id)
                this.shangc(result2.data.id)
                this.specifications_img(result2.data.id)
                this. parameter_upload(result2.data.id)
                this.$message({
                    showClose: true,
                    message: '添加商品成功',
                    type: 'success'
                });
                this.$router.push({name:'commodity'})
            },



            handleRemove() {
                console.log("移除")
                console.log(this.fileList)
            },
            handlePictureCardPreview(file) {
                console.log(file.url)
                this.dialogImageUrl = file.url;
                console.log(this.dialogImageUrl)
                this.dialogVisible = true;
            },
            imgChange(file) {
                var a = this.index
                console.log(a)
                //  console.log(this.checkList_[a])
                // console.log(this.checkList_[a].img.raw.uid)
                console.log(file.raw.uid)
                if (JSON.stringify(this.fileList[a]) == '[]') {
                    this.fileList.push(file)

                } else if (this.fileList[a].raw.uid == file.raw.uid) {
                    console.log('已经上传了')
                } else {

                    this.fileList.push(file)

                }

            },
            delete_:function(id1,id2){
               // console.log(id2)
               // console.log(item)



                var that=this
                setTimeout(function () {
                    //console.log(that.checkList[id1].value[0])
                    var tichu=that.checkList[id1].value.filter((item)=>{
                        return item!=that.specification[id1].CheckValue.sku[id2]
                    })
                    that.checkList[id1].value=tichu
                    //console.log(that.checkList[id1].value)
                    that.specification[id1].CheckValue.sku.splice(id2,1)
                },10)




            },
            addSku:function(id){
               // console.log(id)
                if (this.inputList[id].value==''){
                    ElMessage({
                        showClose: true,
                        message:"请输入要添加的属性规格",
                        type: 'warning',
                    })
                }else {
                    var a=this.specification[id].CheckValue.sku.filter(item=>{
                        return item==this.inputList[id].value
                    })
                    if (JSON.stringify(a)=='[]'){
                        this.specification[id].CheckValue.sku.push(this.inputList[id].value)


                    }
                    else {
                        ElMessage({
                            showClose: true,
                            message:"已有该规格",
                            type: 'warning',
                        })
                    }

                }
            },
            parameter_(a,b,c,d,e){
                var sole=a.filter((item)=>{
                    return item.ArrCheck=='唯一'
                })
                var radio=a.filter((item)=>{
                    return item.ArrCheck=='单选'
                })
                var  check=a.filter((item)=>{
                    return item.ArrCheck=='复选'
                })
                var input=a.filter((item)=>{
                    return item.Manual=='是'
                })
                //console.log(sole,radion,check)
                sole.forEach((item,index)=>{
                    var value={value:'',type:item.ProductName}
                    b.push(value)
                    item.index=index

                })
                radio.forEach((item,index)=>{
                     var radio_tow={value:'',type:item.ProductName}
                    item.CheckValue={
                        sku:item.CheckValue.split("/"),
                        id:item.id,
                        length:item.CheckValue.split("/").length
                    }
                    c.push(radio_tow)
                    item.index=index
                })
                console.log(check)
                check.forEach((item,index)=>{
                    //console.log(item)
                   // console.log(item.ProductName)
                    item.CheckValue={
                        sku:item.CheckValue.split("/"),
                        id:item.id,
                        length:item.CheckValue.split("/").length
                    }
                    item.index=index
                    var list_={value:[],type:item.ProductName}
                    d.push(list_)
                })
                input.forEach((item,index)=>{
                    item.index2=index
                    var input={value:''}
                    e.push(input)
                })
                console.log(this.checkList_tow)
            },
            change:async function (value) {
                console.log(value)
                this.ischeckImg=true
                this.time_=new Date()
                this.checkList=[]
                console.log("切换")
                //console.log(value)
               var result=await axios.post('/productType',{type_name:value})
                console.log(result.data.id)
                //查询商品规格
                var result2=await axios.get('/getProductArr',{params:{id:result.data.id,Parameter:0}})
                console.log(result2.data.data)
                //查询商品参数
                var result3=await axios.get('/getProductArr',{params:{id:result.data.id,Parameter:1}})
                console.log(result3.data.data)
               var a=JSON.stringify(result2.data.data)
               // console.log(a)
                if (a=='[]'){
                    this.isshow=false
                }else {
                    this.isshow=true
                    this.specification=result2.data.data
                    this.specification_tow=result3.data.data
                    this.parameter_(this.specification,this.sole,this.radio,this.checkList,this.inputList)
                    this.parameter_(this.specification_tow,this.sole_tow,this.radio_tow,this.checkList_tow,this.inputList_tow)

                    console.log(this.specification)
                    console.log(this.specification_tow)
                    console.log(this.inputList_tow)
                    console.log(this.selectList)

                }
                console.log(this.checkList)

              //  this.isshow_()
            },
            async isshow_(){
                this.checkList.forEach((item,index)=>{

                    item.value
                    if (JSON.stringify(item.value)=='[]'){
                        this.checkList[index].isshow=false
                    }
                    else {
                        this.checkList[index].isshow=true
                    }
                })
            },
            checkList_:function (id) {
               console.log(this.checkList[id].value)
                console.log(this.checkList)
                this.checkList[id].isshow=true
                this.time_=new Date()

               // console.log(this.time_)
            },
            checkList_tow_: function (id) {
                console.log(id)
                console.log(this.checkList_tow)
            },
            radio_tow_:function (id) {
                console.log(id)
                console.log(this.radio_tow)
            }
        }}

</script>

<style scoped>
    .quill{
        width: 1000px;
        height: 500px;
    }

    .parameter{
        width: 500px;
        display: flex;
       margin-top: 20px;
        margin-right: 200px;
    }
     .parameter_{
         display: flex;
         flex-direction: row;
         font: 14px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;
         color: #666666;
         align-items: center;
         justify-content: center;
     }
    .specification_four{
        background-color: #F8F9FD;
        width: 1000px;
        height: 40px;



    }
.upload{
    background-color: #F8F9FD;
    width: 600px;
    height: auto;
    display: flex;
    flex-direction: column;
}
     .btn{
         width: 50px;
         margin-left: 10px;
     }
    .input{
        width: 200px;
    }
    .manual{
        display: flex;
        flex-direction: row;
        margin-top: 10px;
        margin-bottom: 10px;

    }
    li{
        list-style: none;
    }
    .specification_three{
        width: 1000px;
        font: 14px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;
        margin-top: 20px;
    }
.specification_one{
    background-color: #F8F9FD;
    width: 1000px;
    height: 40px;


}
.specification_tow{
    background-color: #F8F9FD;
    width: 1000px;
    height: auto;
    font: 14px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;
    margin-top: 20px;

}
    .ProductDetail{
    margin-left: 100px;
    }
</style>