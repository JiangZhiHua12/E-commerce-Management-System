var sqlquery=require('../../public/javascripts/mysql')
var express=require('express')
var router=express.Router()

//查询个人用户信息
router.post('/queryUser',async (req,res)=>{
    var id=req.body.id
    var sql='select * from user where id=?'
    var result=await sqlquery(sql,id)
    res.json({
        msg:'查询成功',
        data:result[0]
    })

})

//修改用户个人信息
router.post('/editUser', async (req,res)=>{
    var email=req.body.email
    var phone=req.body.phone
    var name=req.body.username
    var arr=[email,phone,name]
    var sql='update user set email=?,number=? where name=?'


    try {
        var result=await sqlquery(sql,arr)
        console.log(result)
        var sql2='select * from user where name=?'
        var result2=await sqlquery(sql2,name)
        res.json({
            msg:'修改用户信息成功',
            data:result2[0],
            status:'ok'
        })
    }catch (e) {
        res.json({
            msg:'修改用户信息失败',
        })
    }


})




module.exports =router