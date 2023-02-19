var sqlquery=require('../../public/javascripts/mysql')
var express=require('express')
var router=express.Router()


router.post('/addAuth',async (req,res)=>{

    var role_id=req.body.roleId
    var auth_id=req.body.authId


//
    //筛选出所有的一级权限

    var auth_id1=auth_id.filter(item=>{
        return item>100 && item<200
    })
    //
    //将一级权限添加到指定角色下
    for (var b=0;b<auth_id1.length;b++){
        var sql6='select * from role_auth1 where role_id=? and auth_id=?'
        var result6=await  sqlquery(sql6,[role_id,auth_id1[b]])

        //查询数据库，是否已有该权限，诺有则添加权限，没有就不添加该权限
        if (!result6.length>0){
            console.log(result6)
                var sql='insert into role_auth1 (role_id,auth_id) values(?,?)'
                var result=await sqlquery(sql,[role_id,auth_id1[b]])
                console.log(result)

        }else if (result6.length>0){

        }

    }

//
//筛选出所有的二级权限
    var auth_id2=auth_id.filter(item=>{
        return item>200 && item<300
    })
    //
    //将二级权限添加到指定角色下
    for (var a=0;a<auth_id2.length;a++){
        var sql5='select * from role_auth2 where role_id=? and auth_id=?'
        var result5=await sqlquery(sql5,[role_id,auth_id2[a]])
        //查询数据库，是否已有该权限，诺有则添加权限，没有就不添加该权限
        if (!result5.length>0){
                var sql2='insert into role_auth2 (role_id,auth_id) values(?,?)'
                var result2=await sqlquery(sql2,[role_id,auth_id2[a]])
            console.log(result2)
        }else if (result5.length>0) {

        }
    }
//
    //筛选出所有的三级权限
    var auth_id3=auth_id.filter(item=>{
        return item>300
    })
    //
    //将三级权限添加到指定角色下
    for (var l=0;l<auth_id3.length;l++){
        var sql4='select * from role_auth3 where role_id=? and auth_id=?'
        var result4=await sqlquery(sql4,[role_id,auth_id3[l]])
        //查询数据库，是否已有该权限，诺有则添加权限，没有就不添加该权限
        if (!result4.length>0){
                var sql3='insert into role_auth3 (role_id,auth_id) values(?,?)'
                var result3=await sqlquery(sql3,[role_id,auth_id3[l]])
            console.log(result3)
        } else if (result4.length>0){

        }

            }
    res.json({
        msg:'分配权限成功',
        status:'ok'
    })
})

module.exports =router