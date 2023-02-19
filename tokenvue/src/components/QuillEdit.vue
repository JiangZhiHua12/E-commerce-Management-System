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
            <el-button>上传</el-button>
        </el-upload>

    </div>
</template>

<script>

    import { QuillEditor } from '@vueup/vue-quill'
    import '@vueup/vue-quill/dist/vue-quill.snow.css';




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
        ['image', 'video']
    ]


    export default {
        name:'QuillEdit',
        components:{QuillEditor},

        data() {
            return {
                content: '',
                editorOption: {
                    modules: {
                        toolbar: toolbarOptions,

                    },
                    theme: 'snow',
                    placeholder: '请输入正文',
                }
            }


        }
        ,
        methods:{
            hhs(){

                var quill=this.$refs.myQuillEditor.quill.selection.savedRange.index

                //let index = quill.selection.savedRange.index // 获取光标位置
                //quill.insertEmbed(index, 'text', '这里是要插入的文字')
                //quill.setSelection(index + 1) // 光标移到插入内容后面
                console.log(quill)
            },
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

</style>
