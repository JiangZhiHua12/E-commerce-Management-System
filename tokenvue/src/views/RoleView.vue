<template>
   <div class="role">
       <!-- 面包屑 -->
       <el-breadcrumb >
           <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>权限管理</el-breadcrumb-item>
           <el-breadcrumb-item>角色列表</el-breadcrumb-item>
       </el-breadcrumb>
   </div>
    <el-card class="box-card" >

        <!-- 添加角色的按钮 -->
        <div class="btn"><el-button class="btn" type="primary" @click="dialogVisible=true">添加角色</el-button></div>
        <!-- table表格区域 -->
        <el-table class="table" :data="roledata" border row-key="id">
            <el-table-column   type="expand">
                <template v-slot="scope">
                    <el-row :class="['bottom',index==0? 'top':'','center']" style="margin: 0 50px;" v-for="(item1,index) in scope.row.children" :key="index">
                        <!-- 第一列是存放我们一级权限的 -->
                        <el-col style="margin: 10px 0;" :span="5">
                            <el-tag @close="removeRoleAss(scope.row,scope.row.id,item1.id)" style="height: 35px" closable type="">
                                {{item1.authname}}
                            </el-tag>
                        <i style="margin: 0 10px;" class="fa  fa-caret-right"></i>
                        </el-col>
                        <!-- 第二列是存放我们二级和三级级权限的 -->
                        <el-col :span="19">
                             <el-row :class="[index2==0? '':'top','center']" v-for="(item2,index2) in item1.children " :key="index2">
                                 <el-col :span="6" style="margin: 10px 0;">
                                     <el-tag @close="removeRoleAss(scope.row,scope.row.id,item2.id)" type="success" style="height: 35px" closable >
                                         {{item2.authname}}
                                     </el-tag>
                                     <i style="margin: 0 10px;" class="fa  fa-caret-right" ></i>
                                 </el-col>

                                 <el-col style="margin: 10px 0;" :span="8">
                                     <el-tag @close="removeRoleAss(scope.row,scope.row.id,item3.id)" style="height: 35px;margin: 10px 10px" type="warning" closable v-for="(item3,index3) in item2.children" :key="index3">
                                            {{item3.authname}}
                                     </el-tag>
                                 </el-col>
                             </el-row>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
            <el-table-column  label="#" type="index"></el-table-column>
            <el-table-column prop="role" label="角色名称"></el-table-column>
            <el-table-column prop= "beif" label="角色描述"></el-table-column>
            <el-table-column  label="操作">
                <template v-slot="scope">
                    <el-button v-model="scope.row" type="primary" @click="getRole(scope.row.role)">编辑</el-button>
                    <el-button type="danger" @click="opens(scope.row.role)">删除</el-button>
                    <el-button type="warning" @click="getTreeAuth(scope.row)">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加角色的对话框 -->
        <el-dialog
                class="addRole"
                title="添加角色"
                v-model="dialogVisible"
                width="40%"
                center
                @open="open"
                >
            <!-- 添加角色的表单 -->
            <el-form :model="addRole" status-icon :rules="addRoleRules" ref="addRole" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色名称" prop="roleName">
                    <el-input type="text" v-model="addRole.roleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="roleInfo">
                    <el-input type="text" v-model="addRole.roleInfo" autocomplete="off"></el-input>
                </el-form-item>

               <div class="btns">
                   <el-button size="large" type="primary" @click="submitForm">提交</el-button>
                   <el-button size="large" @click="resetForm">重置</el-button>
               </div>
            </el-form>

        </el-dialog>
        <!-- 编辑角色的对话框 -->
        <el-dialog
                class="addRole"
                title="编辑角色"
                v-model="editdialogVisible"
                width="40%"
                center
        >
            <!-- 编辑角色的表单 -->
            <el-form :model='editRole' status-icon :rules="editRoleRules" ref="editRole" label-width="100px" class="demo-ruleForm">
                <el-form-item label="角色名称" prop="editRoleName">
                    <el-input type="text" v-model="editRole.editRoleName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="角色描述" prop="editRoleInfo">
                    <el-input type="text" v-model="editRole.editRoleInfo" autocomplete="off"></el-input>
                </el-form-item>

                <div class="btns">
                    <el-button size="large" type="primary" @click="editsubmitForm">提交</el-button>
                    <el-button size="large" @click="editresetForm">重置</el-button>
                </div>
            </el-form>

        </el-dialog>

        <!-- 分配角色权限的对话框 -->
        <el-dialog
                class="assAuth"
                title="分配权限"
                v-model="assdialogVisible"
                width="40%"
                center
                @close="closeCheckId"
        >
            <!-- 分配角色权限的表单 -->
            <el-form :model="addRole" status-icon :rules="addRoleRules" ref="addRole" label-width="100px" class="demo-ruleForm">
                <!-- 树形控件展示我们的权限 -->
                <el-tree :data="treeList" :props="tree" show-checkbox
                         node-key="id"
                         default-expand-all
                         :default-checked-keys="checkid"
                         ref="treeList"
                >

                </el-tree>

                <div class="btns">
                    <el-button size="large" type="primary" @click="submitAuth">提交</el-button>
                    <el-button size="large" @click="resetForm">重置</el-button>
                </div>
            </el-form>

        </el-dialog>
    </el-card>
</template>

<script>
    import axios from '@/axios'
    import {ElMessage} from "element-plus";
    export default {
        name: "RoleView",
        data(){
            return{
                roledata:[],
                dialogVisible:false,
                addRole:{
                    roleName:'',
                    roleInfo:''
                },
                editdialogVisible:false,
                editRole:{
                    editRoleName:'',
                    editRoleInfo:''
                },
                assdialogVisible:false,
                treeList:[],
                tree:{
                  label:'authname',
                  children:'children'
                },
                checkid:[],
                roleId:null,
                addRoleRules:{
                    roleName:[
                        {required:true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '角色名称长度必须在6~10字之间', trigger: 'blur' }
                    ],
                    roleInfo:[
                        {required:true, message: '请输入角色信息', trigger: 'blur'},
                        { min: 5, max: 18, message: '角色信息描述不能低于五个字的描述', trigger: 'blur' }
                    ]
                },
                editRoleRules:{
                    editRoleName:[
                        {required:true, message: '请输入角色名称', trigger: 'blur' },
                        { min: 2, max: 10, message: '角色名称长度必须在6~10字之间', trigger: 'blur' }
                    ],
                    editRoleInfo:[
                        {required:true, message: '请输入角色信息', trigger: 'blur'},
                        { min: 5, max: 18, message: '角色信息描述不能低于五个字的描述', trigger: 'blur' }
                    ]
                }
            }
        },
        methods:{
          async getroleinfo(){
               var res=await axios.get('/authRole')
              console.log(res.data.data)
              this.roledata=res.data.data
          },
            open:function(){
              setTimeout(()=>{
                  this.$refs.addRole.clearValidate()
              },1)

                console.log('hahaha')
            },
            //重置表单的错误提示和内容
            resetForm:function () {
                this.$refs.addRole.resetFields()
            },
            //对整个表单进行预验证
            submitForm:function () {
              this.$refs.addRole.validate(valid=>{
                  if (valid==true){
                      axios.post('/addRole',this.addRole).then(res=>{
                          if (res.data.status=='ok'){
                              this.dialogVisible=false
                              this.getroleinfo()
                              ElMessage({
                                  showClose: true,
                                  message:res.data.msg,
                                  type: 'success',
                              })
                          }else {
                              this.dialogVisible=false
                              ElMessage({
                                  showClose: true,
                                  message:res.data.msg,
                                  type: 'error',
                              })
                          }
                      })

                  }
              })

            },
            //角色编辑的表单方法
            editresetForm:function () {
            this.$refs.editRole.resetFields(['editRoleName','editRoleInfo',[]])
            },
            editsubmitForm:function () {
                this.$refs.editRole.validate(valid=>{
                    if (valid==true){
                        axios.post('/editRole',this.editRole).then(res=>{
                            if (res.data.status=='ok'){
                                this.editdialogVisible=false
                                this.getroleinfo()
                                ElMessage({
                                    showClose: true,
                                    message:res.data.msg,
                                    type: 'success',
                                })
                            }else {
                                this.editdialogVisible=false
                                ElMessage({
                                    showClose: true,
                                    message:res.data.msg,
                                    type: 'error',
                                })
                            }
                        })
                    }
                })
            },
            getRole:async function (name) {
                this.editdialogVisible=true
                  var res=await axios.post('/getRoleInfo',{role:name})
                console.log(res.data)
                var data=res.data .data
                this.editRole.editRoleName=data.role
                this.editRole.editRoleInfo=data.beif
                this.$refs.editRole.clearValidate()

            },
            //删除角色的方法
            opens(role) {
                this.$confirm('此角色将被删除，是否要继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    axios.post('/deleteRole',{roleName:role}).then(res=>{
                        console.log(res.data)
                        if (res.data.status=='ok'){
                            this.getroleinfo()
                            this.$message({
                                type: 'success',
                                message:'删除角色成功'
                            });
                        }else {
                            this.$message({
                                type: 'error',
                                message:'删除角色失败'
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //监听分配权限按钮的方法，以此来获取角色列表已选中的权限
            getTreeAuth:async function (role) {
              this.roleId=role.id
                 this.assdialogVisible=true
                 var res=await axios.get('/authTree')
                console.log(res.data)
                this.treeList=res.data.data
              this.getRoleId(role,this.checkid)
            },
            //通过递归把该角色下的所有三级权限id添加到checkid中
            getRoleId(node,arr){
              //判断当前节点下有没有children属性
                if(!node.children){
                    arr.push(node.id)
                }else {
                    node.children.forEach(item=>{
                        return this.getRoleId(item,arr)
                    })
                }
            },
            closeCheckId:function () {
              this.checkid=[]
            },
            async removeRoleAss(role,roleId,assId) {
                this.$confirm('该角色权限将被删除，是否要继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                     axios.post('/removeRoleAss',{roleId:roleId,assId:assId,roleChildrenId:role.children}).then(async res=>{

                         if (res.data.status=='ok'){


                             ElMessage({
                                 showClose: true,
                                 message:res.data.msg,
                                 type: 'success',
                             })
                             var result= await axios.get('/getRoles',{params:{roleId:roleId}})
                             console.log(result.data)
                             role.children=result.data.data
                         }else {
                             ElMessage({
                                 showClose: true,
                                 message:res.data.msg,
                                 type: 'error',
                             })
                         }

                     })


                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });


            },
            //监听分配权限下提交按钮的方法，将权限添加到当前角色下。
            submitAuth:async function () {
                  this.$refs.treeList.getCheckedKeys()
                this.$refs.treeList.getHalfCheckedKeys()
                var keyId=[
                    ...this.$refs.treeList.getCheckedKeys(),
                    ...this.$refs.treeList.getHalfCheckedKeys()
                ]
                 var strId=keyId.join(',')
                console.log(strId)
                var res=await axios.post('/addAuth',{authId:keyId,roleId:this.roleId})
                console.log(res.data)
                if (res.data.status=='ok'){
                    this.assdialogVisible=false
                    ElMessage({
                        showClose: true,
                        message:res.data.msg,
                        type: 'success',
                    })
                    this.getroleinfo()
                }else {
                    ElMessage({
                        showClose: true,
                        message:'分配权限失败',
                        type: 'error',
                    })
                }

            }
        }
        ,
        created() {
            this.getroleinfo()
        }
    }
</script>

<style scoped>
    .center{
        display: flex;
        align-items: center;
    }
    .top{
        border-top: 1px solid #eeeeee;
    }
    .bottom{
        border-bottom: 1px solid #eeeeee;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }

    .table{
        width: 79vw;
        position: relative;top: 20px;left: 10px;
        margin-bottom: 20px;
    }
    .btn{
        height: 40px;
margin: 0 5px;
    }
    .box-card{
        display: flex;
        position: relative;
        margin: 20px 20px;
        box-shadow: 0 1px 1px rgba(0,0,0,0.15)!important;
        padding: 2px 2px;
    }
</style>