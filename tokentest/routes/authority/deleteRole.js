var sqlquery=require('../../public/javascripts/mysql')
var express=require('express')
var router=express.Router()


router.post('/deleteRole',async (req,res)=>{
    var roleName=req.body.roleName
    var sql='delete from role where role=?'

    try {
        var result=await sqlquery(sql,roleName)
        console.log(result)
        res.json({
            msg:'删除角色成功',
            status:'ok'
        })
    }catch (e) {
        res.json({
            msg:'删除角色失败',

        })
    }


})


module.exports =router