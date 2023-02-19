<template>
    <div class="user">
        <!-- 面包屑 -->
        <el-breadcrumb >
            <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <!-- 主体区域内容card -->
    <el-card class="box-card">

        <div class="row">
            <!-- 搜索用户 -->
            <el-col :span="8">
                <el-input type="text" @input="getUserList" @clear="getUserList" clearable @keydown.enter="searchUser" :suffix-icon="Search" placeholder="请搜索用户"  v-model="queryInfo.Search" class="input-with-select"></el-input>
            </el-col>
            <!-- 添加用户 -->
           <el-col class="col">
            <el-button type="primary"  @click="isShowAddUser = true">添加用户</el-button>
              </el-col>
        </div>
        <!-- 用户列表区域 -->
        <el-table class="table" :data="tableData" border >
            <el-table-column  label="ID" type="index"></el-table-column>
            <el-table-column prop="username" label="姓名"></el-table-column>
            <el-table-column prop='email' label="邮箱"></el-table-column>
            <el-table-column prop='number' label="电话"></el-table-column>
            <el-table-column  prop='rolename' label="角色"></el-table-column>
            <el-table-column prop="status"  label="状态">
               <template v-slot="scope">
                   <el-switch @change="status(scope.row)" v-model="scope.row.status"></el-switch>
               </template>
            </el-table-column>
            <el-table-column prop='action' label="操作" width="200px">

                <template v-slot="scope">
                    <el-button type="primary" size="small" @click="updateUser(scope.row.id)">修改</el-button>
                    <el-button type="danger" size="small" @click="open(scope.row.name)">删除</el-button>
                    <el-button type="warning" size="small">分配</el-button>
                </template>

            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
                class="page"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[2, 10, 15, 20]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
        </el-pagination>
     <!-- 添加用户的对话框 -->
        <el-dialog
                title="添加用户"
                v-model="isShowAddUser"
                width="40%"
                center
                @open="addUseropen"
                >
          <!-- 镶嵌表单 -->
            <el-form :model="addUserForm" status-icon :rules="addUserRules" ref="addUserForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text" v-model="addUserForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="addUserForm.password" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPass">
                    <el-input type="password" v-model="addUserForm.checkPass"  autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="text" v-model="addUserForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input type="text" v-model.number="addUserForm.phone"></el-input>
                </el-form-item>
                <div class="btn">
                    <el-button size="large" type="primary" @click="AddsubmitForm">提交</el-button>
                    <el-button size="large" @click="AddresetForm">重置</el-button>
                </div>


            </el-form>
        </el-dialog>
        <!-- 修改用户的对话框 -->
        <el-dialog
                title="修改用户信息"
                v-model="isShowUpDate"
                width="40%"
                center
                >
            <el-form :model="upDataForm" status-icon :rules="editUserRules" ref="upDataForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="username">
                    <el-input type="text"   :disabled="true" v-model="upDataForm.username" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input type="text"  v-model="upDataForm.email" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input type="text"  v-model.number="upDataForm.phone"></el-input>
                </el-form-item>
                <div class="editBtn">
                    <el-button type="primary" size="large"  @click="upDatasubmitForm">提交</el-button>
                    <el-button size="large" @click="upDataresetForm">重置</el-button>
                </div>
                <!-- 删除用户的弹出框 -->


            </el-form>
        </el-dialog>
    </el-card>

</template>

<script>
    import {Search,Edit} from '@element-plus/icons-vue'
    import axios from '@/axios'
    import {ElMessage} from "element-plus";
    export default {
        name: "UserView",
        setup(){
            return {
                Search,
                Edit
            }
        },
        data(){
            //自定义验证表单数据
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.addUserForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
            var validateEmail=(rule,value,callback)=>{
                var regEmail = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value)
                if (!regEmail){
                    callback(new Error('请输入合法的邮箱!'));
                }else {
                    callback()
                }
            }
            var validatePhone=(rule,value,callback)=>{
                var regphone=/^1[34578]\d{9}$/.test(value)
                if (!regphone){
                    callback(new Error('请输入合法的手机号!'));
                }else {
                    callback()
                }
            }
            return{
                visible:true,
                isShowUpDate:false,
                upDataForm:{
                    username:'',
                    email:'',
                    phone:''
                },
                addUserForm:{
                    username:'',
                    password:'',
                    checkPass:'',
                    email:'',
                    phone:'',
                },
                isShowAddUser: false,
                input:'',
                tableData:[],

                queryInfo:{
                    Search:'',
                    //当前的页数
                    pagenum:1,
                    //当前每页显示多少条数据
                    pagesize:2
                },
                userStatus:{
                    username:'',
                    status:null
                },
                total:null,
                //对添加用户的表单数据进行验证
                addUserRules:{
                    username:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 5, message: '用户名长度必须在2~5之间', trigger: 'blur' },
                    ],
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 18, message: '密码长度必须在6~18之间', trigger: 'blur' },
                    ],
                    checkPass:[
                        {required: true,message:'请输入确认密码'},
                        {validator:validatePass2,trigger:'blur'}
                    ],
                    email:[
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        {validator:validateEmail,trigger:'blur'}
                    ],
                    phone:[
                        {required:true,message:'请输入手机号',trigger:'blur'},
                        {validator:validatePhone,trigger:'blur'}
                    ]
                },
                //对修改用户的表单进行数据的验证
                editUserRules:{
                    email:[
                        { required: true, message: '请输入邮箱', trigger: 'blur' },
                        {validator:validateEmail,trigger:'blur'}
                    ],
                    phone:[
                        {required:true,message:'请输入手机号',trigger:'blur'},
                        {validator:validatePhone,trigger:'blur'}
                    ]
                }
            }
        },
        methods:{
            //查询用户列表显示几数据和第几页

            //查询用户列表
               async getUserList(){
                    var res=await axios.get('/userlist',{params:this.queryInfo})
                   console.log(res.data)
                   this.tableData=res.data.data
                    this.total=res.data.total

               },
            status: async function (data) {
                this.userStatus.username=data.name
                this.userStatus.status=data.status
                console.log(this.userStatus.status)
                var res=await axios.get('/userStatus',{params:this.userStatus})
         if(res.data.status==200){
             ElMessage({
                 showClose: true,
                 message:res.data.msg,
                 type: 'success',
             })
         } else {
             ElMessage({
                 showClose: true,
                 message: res.data.msg,
                 type: 'error',
             })
         }
            },
            //监听页面展示多少条数据
            handleSizeChange:function (newsize) {

                this.queryInfo.pagesize=newsize
                this.getUserList()
            },
            //监听当前显示的页面
            handleCurrentChange:function (newnum) {

              this.queryInfo.pagenum=newnum
                this.getUserList()
            },
            //搜索用户
            searchUser:async function () {
               // var search=this.queryInfo.Search
                this.getUserList()
                 //var res=await axios.get('/like',{params:{Search:search}})
                //console.log(res.data)

            },
            //打开对话框之前需要把对话框里面的内容和校验信息给重置
            addUseropen:function(){
                   setTimeout(()=>{
                       this.$refs.addUserForm.resetFields()
                   })

            },
          //添加用户表单的重置表单的验证信息
            AddresetForm:function () {
                this.$refs.addUserForm.resetFields()
            },
          //添加用户表单的预验证表单信息
            AddsubmitForm:function () {
                  this.$refs.addUserForm.validate(valid=>{
                     if (valid==true){
                         axios.post('/addUser',this.addUserForm).then(res=>{
                             console.log(res.data)
                             if (res.data.status=='ok'){
                                 this.isShowAddUser=false
                                 this.getUserList()
                                 ElMessage({
                                     showClose: true,
                                     message:res.data.msg,
                                     type: 'success',
                                 })
                             }else {
                                 ElMessage({
                                     showClose: true,
                                     message: res.data.msg,
                                     type: 'error',
                                 })
                             }
                         })
                     }
                 })

            },
            //修改用户之前需要通过id查询该列的用户信息并渲染到修改用户表单上面
            updateUser:async function (id) {

                this.isShowUpDate=true
                var res= await axios.post('/queryUser',{id:id})
                console.log(res.data.data)
                this.upDataForm.username=res.data.data.name
                this.upDataForm.email=res.data.data.email
                this.upDataForm.phone=res.data.data.number
                this.$refs.upDataForm.clearValidate()
            },
            //修改用户表单的重置表单的验证信息
            upDataresetForm:function () {
                this.$refs.upDataForm.resetFields(['email','phone',[]])

            },
            //修改用户表单的预验证表单信息
            upDatasubmitForm:function () {
                this.$refs.upDataForm.validate(valid=>{
                   if (valid==true){
                        axios.post('/editUser',this.upDataForm).then(res=>{
                              if(res.data.status=='ok'){
                                  this.isShowUpDate=false
                                  this.getUserList()
                                  ElMessage({
                                      showClose: true,
                                      message:res.data.msg,
                                      type: 'success',
                                  })
                              }else {
                                  this.isShowUpDate=false
                                  ElMessage({
                                      showClose: true,
                                      message: res.data.msg,
                                      type: 'error',
                                  })
                              }
                        })
                   }
                })
            },
            //删除用户时弹出的提示框
            open(name) {
                this.$confirm('确定要删除该用户？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                      axios.post('/deleteUser',{username:name}).then(res=>{
                         this.getUserList()
                          console.log(res)
                          this.$message({
                              type: 'success',
                              message: '删除成功!'
                          });
                      })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            }

        },
        created() {
            this.getUserList()
            var num=1

            console.log(`change${num}`)

        },
        mounted() {

        }
    }
</script>

<style scoped>
    .editBtn{
        display: flex;
        justify-content: flex-end;
    }
    .btn{
        display: flex;
        justify-content: flex-end;
    }
 .el-pagination{
     margin-top:40px;
 }
    .table{
        width: 79vw;
        position: relative;top: 20px;left: 10px;
        margin-bottom: 20px;
    }
    .col{
        margin: 0 20px;
    }
    .row{
        padding: 0 10px;
    }
    .input-with-select{
width: 300px;
    }
.box-card{
    display: flex;
    position: relative;
    margin: 20px 20px;
    box-shadow: 0 1px 1px rgba(0,0,0,0.15)!important;
    padding: 2px 2px;
}
</style>