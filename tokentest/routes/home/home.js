var express=require('express')
var router=express.Router()
var sqlquery=require('../../public/javascripts/mysql')

router.post('/home',async (req,res)=>{
     var sql='select * from sidebar '
      var result=await sqlquery(sql)
    var sql2='select * from side'


    result[0].children=([{id:101,authname:'用户列表',path:'/user',isband:false}])
    result[1].children=([{id:201,authname:'角色列表',path:'/role',isband:false},{id:202,authname:'权限列表',path: '/Permissions',isband:false}])
    result[2].children=([{id:301,authname:'商品列表',path:'/commodity',isband:false},{id:302,authname:'商品类型',path: '/classify',isband:false},{id:303,authname:'商品分类',path: '/ProductCategory',isband:false}])
    result[3].children=([{id:401,authname:'订单列表',path:'/order',isband:false}])
    result[4].children=([{id:501,authname:'数据报表',path:'/DataReports',isband:false}])

    res.json({
        status:200,
        data:result
    })
})




module.exports=router