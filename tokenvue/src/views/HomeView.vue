<template>
    <div class="home">
        <el-container class="container">
            <!-- 头部导航栏区域 -->
            <el-header class="header">
                <h2 style="color: white">电商后台管理系统</h2>
                <div class="out"><el-button type="danger" @click="loginOut" >退出登入</el-button></div>
            </el-header>
            <el-container>
                <!-- 侧边导航栏区域 -->
                <el-aside width="200px" class="aside">
                    <el-menu

                            background-color="#4C4D4F"
                            class="el-menu-vertical-demo"

                            text-color="#fff"
                            router="true"
                            @select="select"
                    >
                        <!-- 一级菜单的循环渲染 -->
                            <el-sub-menu :index='item.id+""'  v-for="(item) in menuList" :key=item.id>
                                <template #title>
                                    <i :class='icon[item.id]' style="margin: 10px"></i>
                                    <span style="font-size: 18px">{{item.Sidebarcol}}</span>
                                </template>
                                <!-- 二级菜单的循环渲染 -->
                                    <el-menu-item  @click="show(childitem.id)"  :class="{show:childitem.id==showid,disshow:childitem.id!==showid}"  :index="childitem.path" v-for="(childitem) in item.children" :key="childitem.id">
                                        <template #title>
                                            <i class='fa fa-square' style="margin: 10px"></i>
                                            <span style="font-size: 18px"  @click="addTab(childitem)">{{childitem.authname}}</span>
                                        </template>
                                    </el-menu-item>
                            </el-sub-menu>

                    </el-menu>
                </el-aside>
                <!-- 主要内容显示区域 -->
                <el-main class="main">
                    <!-- tab显示页 -->
                    <el-tabs v-model="editableTabsValue" @tab-click="ChangeContent(editableTabsValue)"   type="card" closable  @tab-remove="removeTab">
                        <el-tab-pane
                                v-for="(item) in editableTabs"
                                :key="item.name"
                                :label="item.title"
                                :name="item.name"
                        >
                        </el-tab-pane>
                    </el-tabs>

                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    import axios from '../axios'
    import {ElMessage} from "element-plus";
    import $ from 'jquery'


export default {
  name: 'HomeView',
  components: {

  },
    data(){
      return{
  menuList:[],
          icon:{
              1:'fa fa-users',
              2:'fa fa-lock',
              3:'fa fa-shopping-bag',
              4:'fa fa-list',
              5:'fa fa-bar-chart'
          },
          editableTabs:[
         ],
          editableTabsValue:'',
           path:{
         101:'',201:'',202:'',301:'',302:'',303:'',401:'',501:''
           },
          isband:false,
          banner:null,
          deleteid:{
              101:null,201:null,202:null,301:null,302:null,303:null,401:null,501:null
          },
          showid:null
      }
    },
    methods: {
        loginOut: function () {
            this.$router.push('/login')
            ElMessage({
                showClose: true,
                message: '退出登入成功！！',
                type: 'success',
            })
        },
        //这里是点击二级菜单将二级菜单的名字给data
        addTab: function (data) {
            var name = data.id
            //添加tab页首先要判断tab栏上的tab页是否被删除，若删除掉就将删除掉的tab页的id值传给deleteid这个对象里面，
            //通过deleteid对象里面的属性值来判断是否要添加tab页，此时让传进来的data.isband的值变为false就行
            if (this.deleteid[data.id]==data.id){
                data.isband=false
                if (data.isband == false) {
                    this.editableTabs.push({
                        title: data.authname,
                        name: data.id,
                        path:data.path
                    })
                    this.editableTabsValue = data.id

                    this.path[name] = data.path
                    data.isband=true
                    this.deleteid[data.id]=null
                }
                this.editableTabsValue = data.id

            }else {
                if (data.isband == false) {
                    this.editableTabs.push({
                        title: data.authname,
                        name: data.id,
                        path:data.path
                    })
                    this.editableTabsValue = data.id

                    this.path[name] = data.path
                    data.isband=true
                }
                this.editableTabsValue = data.id
            }



        },
        //切换tab页的时候就会改变我们的路由
        ChangeContent: function (id) {
            var path = this.path[id]
            this.$router.push(path)
            console.log(path)
            console.log('----')
            console.log(id)
            this.showid=id
            setTimeout(function () {
                $('.el-menu-item').removeClass('is-active')
            },1)

        },
        //删除我们的tab标签页,并且再一次路由我们的页面
        removeTab: function (deleteid) {
            console.log(deleteid)
       this.deleteid[deleteid]=deleteid
            let tabs = this.editableTabs;
            let activeName = this.editableTabsValue;
            if (activeName === deleteid) {
                tabs.forEach((tab, index) => {
                    if (tab.name === deleteid) {
                        let nextTab = tabs[index + 1] || tabs[index - 1];
                        this.$router.push(nextTab.path)
                        setTimeout(function () {
                            $('.el-menu-item').removeClass('is-active')
                        },1)
                        this.showid=nextTab.name
                        if (nextTab) {
                            activeName = nextTab.name;
                        }
                    }
                });

            }
            this.editableTabsValue = activeName;
            this.editableTabs = tabs.filter(tab => tab.name !== deleteid);
        },
        //这个方法是激活选中子菜单栏的样式
        show:function (data) {
            this.showid=data
            console.log(this.showid)
            setTimeout(function () {
                $('.el-menu-item').removeClass('is-active')
            },1000)

            console.log('hah')
            },

    },
    created(){
        if(this.$router.path !== '/welcome'){
            this.$router.replace('/welcome')
        }
    },
    async mounted() {
        var res=await axios.post('/home')
        if (res.status!==200){
            ElMessage({
                showClose: true,
                message: '获取左侧菜单数据失败',
                type: 'error',
            })
        }
        else {
            this.menuList=res.data.data
            console.log(res.data)
        }
    }
}
</script>
<style scoped>
    .el-main {
        --el-main-padding: 0px;
    }
    .el-menu-item.is-active{
        color: #ffd04b;
    }
    .disshow{
        color:#ffffff;
    }
    .show{
        color: #ffd04b;
    }
    .container{
      height: 100vh;
    }
    .header{
        background-color: #191919;
        display: flex;
        flex-direction: row;
      align-items: center;
    }
    .out{
        display: flex;
        flex-direction: row;
        justify-content:flex-end;
        flex: 1;
    }
    .aside{
background-color:#4C4D4F;

    }
    .main{
background-color: #ffffff;
    }
</style>
