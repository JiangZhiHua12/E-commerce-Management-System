var sqlquery=require('../../public/javascripts/mysql')
var express=require('express')
var router=express.Router()



router.post('/deleteUser',async (req,res)=>{
    var username=req.body.username
    var sql='delete from user where name=?'

    try {
        var result=await sqlquery(sql,username)
        console.log(result)
        res.json({
            msg:'删除用户成功',
            status:'ok'
        })
    }catch (e) {
        res.json({
            msg:'删除用户失败',
        })
    }




})




module.exports =router