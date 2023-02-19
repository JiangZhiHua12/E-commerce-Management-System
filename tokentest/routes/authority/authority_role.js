var sqlquery=require('../../public/javascripts/mysql')
var express=require('express')
var router=express.Router()

//
//获取角色信息表
router.get('/authRole',async (req,res)=>{


    //
//查询我们所有的角色
    var sql='select * from userdb.role '
    var result=await sqlquery(sql)
       // console.log(result)

//
    //查询每个角色下面所有的一级权限
   var sql2='select userdb.first_authority.id,userdb.first_authority.authname,userdb.first_authority.path,userdb.role.id as role_id from userdb.first_authority,userdb.role,userdb.role_auth1 where userdb.role.id=userdb.role_auth1.role_id and userdb.first_authority.id=userdb.role_auth1.auth_id'
    var result2=await sqlquery(sql2)

    //
    //获取我们角色所拥有的二级权限
    var sql3='select userdb.second_authority.id,userdb.second_authority.authname,userdb.second_authority.path,userdb.role.id as role_id,userdb.second_authority.first_id from userdb.second_authority,userdb.role,userdb.role_auth2 where userdb.role.id=userdb.role_auth2.role_id and userdb.second_authority.id=userdb.role_auth2.auth_id'
    var result3=await sqlquery(sql3)
    //console.log(result3)

//
    //获取我们角色拥有的所有三级权限
    var sql4='select userdb.three_authority.id,userdb.three_authority.authname,userdb.three_authority.path,userdb.role.id as role_id,userdb.three_authority.second_id from userdb.three_authority,userdb.role,userdb.role_auth3 where userdb.role.id=userdb.role_auth3.role_id and userdb.three_authority.id=userdb.role_auth3.auth_id'
    var result4=await sqlquery(sql4)
    //console.log(result4)

//
    //进行三重循环将我们的各级权限循环到我们的result里面
    result.forEach((item,index)=>{
//
        //通过角色id过滤出不属于该角色的权限，并将属于该角色的权限添加到对应角色下的children下
        var data= result2.filter(function(item){
            return item.role_id ==index+1;
        })
           //
        //这里是将角色对应的一级权限添加到children下
        result[index].children=data
        //
        //第二重循环
        for (var i=0;i<result[index].children.length;i++){
              //
            //过滤出属于该角色下的所有二级权限以及属于一级权限的所有二级权限
            var data1= result3.filter(function(item){
                return item.role_id ==index+1 && item.first_id== result[index].children[i].id
            })
              //
            //将过滤出的二级权限添加到一级权限对应的children属性下
            result[index].children[i].children=data1
        //
                //第三重循环
            for (var j=0;j<result[index].children[i].children.length;j++) {
               //
                //过滤出属于该角色下的所有三级权限以及属于二级级权限的所有三级权限
                var find = result4.filter(function (item) {
                    return item.second_id == result[index].children[i].children[j].id && item.role_id == index + 1
                })
                    //
                //将过滤出来的三级权限添加到对应一级权限下的children属性下
                result[index].children[i].children[j].children = find

            }
        }
    })

//
    //将角色下的所有对应的权限发送给后端
    res.json({
        msg:'ok',
        data:result
    })

}
)






module.exports =router