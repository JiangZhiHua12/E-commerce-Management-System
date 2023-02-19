var sqlquery=require('../../public/javascripts/mysql')
var express=require('express')
var router=express.Router()

router.post('/addUser',async (req,res)=>{
     var name=req.body.username
     var password=req.body.password
     var email=req.body.email
     var phone=req.body.phone.toString()
     var role='普通用户'
     var status=0
     var arr=[name,password,email,phone,role,status]

    try {
        var sql1='insert into user(name,password,email,number,role,status) values(?,?,?,?,?,?)'
        var result1=await sqlquery(sql1,arr)
        console.log(result1)
        res.json({
            msg:'添加用户成功',
            status:'ok'
        })

    }catch (e) {
        res.json({
            msg:'该用户名已经存在',

        })
    }


})




module.exports =router