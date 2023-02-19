var sqlquery=require('../../public/javascripts/mysql')
var express=require('express')
var router=express.Router()

router.post('/addRole',async (req,res)=>{
    var roleName=req.body.roleName
    var roleInfo=req.body.roleInfo

    //先获取角色表的length
    var sql='select * from role'
    var result=await sqlquery(sql)
    var id=result.length+1
    var arr=[id,roleName,roleInfo]
    var sql2='insert into role (id,role,beif) values(?,?,?)'

    try {
        var result2=await sqlquery(sql2,arr)
        console.log(result2)
        res.json({
            msg:'添加角色成功',
            status:'ok'
        })
    }catch (e) {
        res.json({
            msg:'添加角色失败',
        })
    }







})


module.exports =router