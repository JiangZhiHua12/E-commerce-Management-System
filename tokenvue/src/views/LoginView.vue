<template>
    <div class="login">
        <div class="login_box">
            <!-- 标题 -->
            <div class="title"><h2>后台管理系统</h2></div>
            <!-- 表单登入 -->
            <el-form ref="loginFormRef"  status-icon :model="loginForm" :rules="rules"    class="demo-ruleForm">
                <!-- 用户名 -->
                <el-form-item class="item" label="" prop="username"  >
                    <el-input :prefix-icon="Avatar" @keydown="login" v-model="loginForm.username" icon="fa fa-user-o"  type="text"  autocomplete="off" size="large"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item  label="" prop="password" class="demo-input-suffix" >
                    <el-input :prefix-icon="Lock" @keydown="login" v-model="loginForm.password" type="password"  autocomplete="off" size="large" ></el-input>
                </el-form-item>
                <!-- 按钮 -->
               <div class="btns">
                    <el-button type="primary"  size="large" @click='login' >登入</el-button>
                    <el-button type="info" size="large" @click="resetForm(loginFormRef)">重置</el-button>
                 </div>
            </el-form>

        </div>
    </div>
</template>

<script>
import axios from '../axios'
import { ElMessage } from 'element-plus'
import {Avatar,Lock} from '@element-plus/icons-vue'
    export default {
        name: "LoginView",
        setup(){
            return {
                Avatar,
                Lock
            }
        },
        data(){
            return{
                //这是表单的数据绑定对象
                loginForm:{
                    username:'',
                    password:''
                },
                //这是表单的数据验证对象
                rules:{
                    //用户名的验证
                    username:[
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 5, message: '用户名长度必须在2~5之间', trigger: 'blur' },
                    ],
                    //密码的验证
                    password:[
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 18, message: '密码长度必须在6~18之间', trigger: 'blur' },
                    ]
                }
            }
        },
        methods:{
            //此方法是对我们表单的验证信息进行重置
            resetForm:function () {
                 this.$refs.loginFormRef.resetFields()
            },
            //此方法是对我们的表单进行预验证，验证通过则才能向我们的后端发送请求
             login:  function () {
                  this.$refs.loginFormRef.validate((valid)=>{
                    if (valid==true){
                        axios.post('/login',this.loginForm).then(res=>{
                            console.log(res.data)
                            if (res.data.status==200){
                                ElMessage({
                                    showClose: true,
                                    message: '登入成功',
                                    type: 'success',
                                })
                                window.localStorage.setItem('token',res.data.token)
                                this.$router.push('/home')
                            }else {
                                ElMessage({
                                    showClose: true,
                                    message: '账号或密码不正确',
                                    type: 'error',
                                })
                            }


                        })
                    }


                  })


            }
        },
    }
</script>

<style scoped>

  .item{
      margin-bottom: 30px;
  }
    .demo-ruleForm{
        width: 100%;
        position: absolute;
   padding: 0 20px;
        box-sizing: border-box;
        bottom: 40px;
        flex: 1;
    }


    .title{
        display: flex;
        justify-content: center;
        position: relative;top: 20px;
     color:  #213d5b;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
  .login{
      background-color:  #18222c;
      display: flex;
      justify-content: center;
      align-items: center;
      align-content: center;
      width: 100%;
      height: 100vh;
      margin: 0
  }
    .login_box{
        background-color: #FFFFFF;
        width: 550px;
        height: 350px;
        border-radius: 10px;
        display: flex;
        flex-direction: column;
        position: relative;
    }
</style>