<template>

    <div >
        <el-upload
                class="upload-demo"
                 v-for="(item,index) in checkList_"
                :key="index"
                :on-change="change"
                :file-list="fileList"
                :on-success="success"
                list-type="picture">

            <div style="display: flex;flex-direction: column">
                <el-button @click="upload(index)" style="width: 100px" type="primary">点击上传</el-button>
                <div style="display: flex;flex-direction: row">
                    <span class="span">{{item.color}}:</span>
                    <div  class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                </div>
                <el-image preview-src-list v-if="JSON.stringify(item.img)!='{}'" :src="item.img.url" class="avatar" alt="点击上传新图"></el-image>
            </div>


        </el-upload>
    </div>

</template>

<script>
    import axios from "@/axios";
    export default {
        name: "UploadImg",
        props:{
            checkList:Array
        },
        data(){
            return{
                checkList_:[],
                imgList:[],
                fileList: [],
                index:null,

            }
        },
        created() {
            console.log(this.checkList)
            this.checkList_=this.checkList
            var data=this.checkList_.filter((item)=>{
               return item.type=='颜色'
           })
            console.log(data)

            if(JSON.stringify(data)=='[]'){
                console.log('选择的颜色为空')
                this.checkList_=data
            }else {
                this.checkList_=[]
                data[0].value.forEach((item)=>{
                    this.checkList_.push({
                        color:item,
                        img:{}
                    })

                })
                console.log(this.checkList_)



            }

        },
        methods:{
           async father(id){
                console.log(this.checkList_)
                console.log(id)


               for (var i=0;i<this.checkList_.length;i++){
                   var formData=new FormData()
                   formData.append('ColorImg',this.checkList_[i].img.raw)
                   console.log(this.checkList_[i].color)
                   console.log(this.checkList_[i].img.raw)
                   var result=await axios.post('/addProductColorImg',formData)
                   console.log(result.data.imgUrl)
                   var result2=await axios.post('/addProductColor',{color:this.checkList_[i].color,img:result.data.imgUrl,productID:id})
                   console.log(result2.data)
               }
            },
            success(file){
                console.log(file)
            },
            change(file){
                var a=this.index
                console.log(a)
              //  console.log(this.checkList_[a])
              // console.log(this.checkList_[a].img.raw.uid)
                console.log(file.raw.uid)
                if (JSON.stringify(this.checkList_[a].img)=='{}'){

                    this.checkList_[a].img=file
                    console.log(this.checkList_)
                    window.localStorage.setItem('checked_',JSON.stringify(this.checkList_))
                    window.localStorage.setItem('checked_s',JSON.stringify(file.raw))
                }else if (this.checkList_[a].img.raw.uid==file.raw.uid){
                    console.log('已经上传了')
                }else {

                    this.checkList_[a].img=file
                    console.log(this.checkList_)

                }

            },
            upload:function(index){
                console.log(index)
                 this.index=index

                if (JSON.stringify(this.specification)=='[]'){
                    this.$message({
                        message: '请选择商品属性',
                        type: 'warning'
                    });

                }else {
                    //this.url='https://jsonplaceholder.typicode.com/posts/'
                    console.log('hh')
                }

            },

        }
    }
</script>

<style scoped>
    .el-upload__tip{
        margin-left: 10px;
    }
    .span{
        font: 14px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;
        color: #666666;
        margin-top: 10px;
    }
   .upload-demo{
       display: flex;
       width: 300px;
       flex-direction: column;
       margin-top: 20px;
}
</style>