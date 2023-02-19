var sqlquery=require('../../public/javascripts/mysql')
var express=require('express')
var router=express.Router()

router.post('/getRoleInfo',async (req,res)=>{
    var roleName=req.body.role
    var sql='select * from role where role=?'

    try {
        var result=await sqlquery(sql,roleName)
        console.log(result)
        res.json({
            msg:'获取角色信息成功',
            data:result[0]
        })
    }catch (e) {
        res.json({
            msg:'获取角色信息失败',
            data:null
        })
    }
})

router.post('/editRole',async (req,res)=>{
    var roleName=req.body.editRoleName
    var roleInfo=req.body.editRoleInfo
    var arr=[roleName,roleInfo]

    try {
        var sql='update role set role=? and beif=?'
        var result=await sqlquery(sql,arr)
        console.log(result)
        res.json({
            msg:'修改角色信息成功',
            status:'ok'
        })

    }catch (e) {
        res.json({
            msg:'修改角色信息失败',
            status:'ok'
        })
    }


})
module.exports =router