<template>
    <div>

        <QuillEditor  ref="myQuillEditor"  @textChange="change" v-model="content"  :options="editorOption" >

        </QuillEditor>
        <el-upload
                id="kk"
                :on-preview="handlePreview"
                :on-remove="handleRemove"

                :on-change="hhs"
                list-type="picture">
            <el-button type="primary" plain>上传图片</el-button>
        </el-upload>

    </div>
</template>

<script>

    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';
    import {reactive,ref,toRaw} from 'vue'
    import axios from "@/axios";


    const toolbarOptions = [
        // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
        ['bold', 'italic', 'underline', 'strike'],
        // 引用  代码块-----['blockquote', 'code-block']
        ['blockquote', 'code-block'],
        // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
        [{ header: 1 }, { header: 2 }],
        // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
        [{ list: 'ordered' }, { list: 'bullet' }],
        // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
        [{ script: 'sub' }, { script: 'super' }],
        // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
        [{ indent: '-1' }, { indent: '+1' }],
        // 文本方向-----[{'direction': 'rtl'}]
        [{ direction: 'rtl' }],
        // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
        [{ size: ['small', false, 'large', 'huge'] }],
        // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
        [{ color: [] }, { background: [] }],
        // 字体种类-----[{ font: [] }]
        [{ font: [] }],
        // 对齐方式-----[{ align: [] }]
        [{ align: [] }],
        // 清除文本格式-----['clean']
        ['clean'],
        // 链接、图片、视频-----['link', 'image', 'video']
        [ 'video']
    ]


    export default {
        name:'QuillEdit',
        components:{QuillEditor},
        setup(){
            var myQuillEditor=ref(null)
           const editorOption=reactive({
                   modules: {
                       toolbar: toolbarOptions,
                   },
                   theme: 'snow',
                   placeholder: '请输入正文',
           })
            var imgList=[]
            var idx=-1
            var imgUrl=[]
            async function  hhs(file) {
                console.log(file)

                //console.log(formDataObj)
                exitimg(file)


                //var quill=this.$refs.myQuillEditor.quill.selection.savedRange.index

                //let index = quill.selection.savedRange.index // 获取光标位置
                //quill.insertEmbed(index, 'text', '这里是要插入的文字')
                //quill.setSelection(index + 1) // 光标移到插入内容后面
                //console.log(quill)
               // console.log('hha')
            }
           async function exitimg(file) {

               if (JSON.stringify(imgList)=='[]' ||imgList[idx].uid!=file.uid){
                   idx++

                  imgList.push(file)

                   var formDataObj=new FormData()
                   console.log("继续")
                   formDataObj.append('imgFile',file.raw)
                   console.log(formDataObj.get('imgFile'))
                   var result=await axios.post('/addProduct_one',formDataObj)
                   console.log(result.data.imgUrl)
                   imgUrl.push(result.data.imgUrl)
                   console.log(imgUrl)
                   //var text='你好呀'
                   console.log( myQuillEditor.value)
                   let quill = toRaw(myQuillEditor.value).getQuill();
                   console.log(quill)
                   let index= quill.selection.savedRange.index;
                   console.log(index)
                   quill.insertEmbed(index,"image",result.data.imgUrl);

                   // 调整光标到最后

                   //index+=text.length
                   quill.setSelection(index+1);
                   window.localStorage.setItem('specifications',JSON.stringify(imgUrl))
                   console.log(JSON.parse(window.localStorage.getItem('specifications')))
                   console.log(idx)
                   console.log(imgList)

               }
            }
            return{
               hhs,
                myQuillEditor,
                editorOption,
                idx,
                imgList,
                imgUrl

            }
},
        data() {
            return {
                content: '',

            }


        }
        ,
        methods:{
            change(file){
                console.log(file)
            },
            guige(){
                console.log(this.content)
            },
            handlers(){
                console.log('haha')
            },
        }

    };
</script>
<style scoped >
#kk{
    display: flex;
    margin-top: -540px;
    margin-left: 450px;
}
</style>
