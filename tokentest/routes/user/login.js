var sqlquery=require('../../public/javascripts/mysql')
const {createToken}=require("../token/token")
var express=require('express')
var router=express.Router()

router.post('/login',async(req,res)=>{
    var sql='select * from user where name=?'
    var username=req.body.username

    try {
        var result=await sqlquery(sql,[username])
        console.log(result)
        var token=createToken({name:result[0].name,id:result[0].id})

            res.json({
                msg:'登入成功',
                data:result[0],
                status:200,
                token:token
            })

    }catch (e) {
        res.json({
            msg:'登入失败',
            data:[],
            status:'405'
        })
    }

})


module.exports =router