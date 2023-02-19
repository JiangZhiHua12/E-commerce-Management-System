var sqlquery=require('../../public/javascripts/mysql')
var express=require('express')
var router=express.Router()


router.post('/removeRoleAss',async (req,res)=>{
    var roleid=req.body.roleId
    var assid=req.body.assId
    var childrenId=req.body.roleChildrenId


    console.log('----')
    console.log(childrenId.children)
    console.log(assid)
    arr=[roleid,assid]
    var sql='delete from role_auth3 where role_id=? and auth_id=?'
    var sql2='delete from role_auth2 where role_id=? and auth_id=?'
    var sql3='delete from role_auth1 where role_id=? and auth_id=?'
    var sql4='select role_auth2.auth_id from role_auth2 where role_id=? '

    var result4=await sqlquery(sql4,roleid)
    if (assid>300){

        try {

            var result=await sqlquery(sql,arr)
            console.log(result)


            res.json({
                msg:'删除成功',
                status:'ok',
            })

        }catch (e) {
            res.json({
                msg:'删除失败',
            })
        }
    }else if (assid<300 && assid>200){
        try {
       var sql5='select * from second_authority where id=?'
            var result5=await sqlquery(sql5,[assid])

            console.log(result5[0].id)

           childrenId.forEach(async item=>{

               var data=childrenId.filter(item=>{
                   return item.id=result5[0].first_id
               })
               console.log('----')
               console.log(data)
               var data2=data[0].children.filter(item=>{
                   return item.id=result5[0].id
               })
               console.log(data2)
               for (var i=0;i<data2[0].children.length;i++){
                   result=await sqlquery(sql,[roleid,data2[0].children[i].id])
               }

           })

            var result2=await sqlquery(sql2,arr)


            console.log(result2)
            res.json({
                msg:'删除成功',
                status:'ok',
            })

        }catch (e) {
            res.json({
                msg:'删除失败',
            })
        }
    }else if (assid < 200) {
        if (assid > 100) {
            try {

                childrenId.forEach(async (item, index) => {
                    var data =childrenId.filter(item => {
                        return item.id == assid
                    })
                    for (var i = 0; i < data[0].children.length; i++) {
                        result2 = await sqlquery(sql2, [roleid, data[0].children[i].id])

                        for (var j=0;j<data[0].children[i].children.length;j++){
                             result=await sqlquery(sql,[roleid,data[0].children[i].children[j].id])
                        }
                    }
                })

                var result3 = await sqlquery(sql3, arr)
                console.log(result3)
                res.json({
                    msg: '删除成功',
                    status: 'ok',
                })

            } catch (e) {
                res.json({
                    msg: '删除失败',
                })
            }
        }
    }


})



router.get('/getRoles',async (req,res)=>{
    var role_id=req.query.roleId
    var sql='select * from role where id=?'
    var result=await  sqlquery(sql,role_id)

    var sql2='select userdb.first_authority.id,userdb.first_authority.authname,userdb.first_authority.path,userdb.role.id as role_id from userdb.first_authority,userdb.role,userdb.role_auth1 where userdb.role.id=userdb.role_auth1.role_id and userdb.first_authority.id=userdb.role_auth1.auth_id and userdb.role.id=?'
    var result2=await sqlquery(sql2,role_id)

    //
    //获取我们角色所拥有的二级权限
    var sql3='select userdb.second_authority.id,userdb.second_authority.authname,userdb.second_authority.path,userdb.role.id as role_id,userdb.second_authority.first_id from userdb.second_authority,userdb.role,userdb.role_auth2 where userdb.role.id=userdb.role_auth2.role_id and userdb.second_authority.id=userdb.role_auth2.auth_id and userdb.role.id=?'
    var result3=await sqlquery(sql3,role_id)
    //console.log(result3)

//
    //获取我们角色拥有的所有三级权限
    var sql4='select userdb.three_authority.id,userdb.three_authority.authname,userdb.three_authority.path,userdb.role.id as role_id,userdb.three_authority.second_id from userdb.three_authority,userdb.role,userdb.role_auth3 where userdb.role.id=userdb.role_auth3.role_id and userdb.three_authority.id=userdb.role_auth3.auth_id and userdb.role.id=?'
    var result4=await sqlquery(sql4,role_id)


    result.forEach((item,index)=>{
//
        //通过角色id过滤出不属于该角色的权限，并将属于该角色的权限添加到对应角色下的children下
        var data= result2.filter(function(item){
            return item.role_id ==role_id;
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
                return item.role_id ==role_id && item.first_id== result[index].children[i].id
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
                    return item.second_id == result[index].children[i].children[j].id && item.role_id ==role_id
                })
                //
                //将过滤出来的三级权限添加到对应一级权限下的children属性下
                result[index].children[i].children[j].children = find

            }

        }
    })

    res.json({
        data:result[0].children,
        status:'ok'
    })

})
module.exports =router