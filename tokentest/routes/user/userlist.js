var sqlquery=require('../../public/javascripts/mysql')
var express=require('express')
var router=express.Router()

router.get('/userlistpage',async (req,res)=>{

    var sql='select * from page'
    var result=await sqlquery(sql)
    console.log(result)
    res.json({
        data:result[0]
    })
})

router.get('/userlist',async (req,res)=>{
     var query=req.query.Search
    console.log(query)
    //当前的页数
     var  pagenum=parseInt(req.query.pagenum)
    //显示多少条数据
     var  pagesize=parseInt(req.query.pagesize)

    console.log(pagenum)

        //查询总的数据
        var sql='select * from user'
        var result=await sqlquery(sql)
        //分页查询+多表查询
        var sql1='SELECT userdb.user.id,userdb.user.name AS username,userdb.user.email,userdb.user.number,group_concat(userdb.role.role) rolename,userdb.user.status FROM userdb.user,userdb.user_role,userdb.role where  userdb.user.id=userdb.user_role.user_id and userdb.role.id=userdb.user_role.role_id group by userdb.user.name limit ?,? ;'
        var arr=[(pagenum-1) * pagesize,pagesize]
        var result1=await sqlquery(sql1,arr)
       // console.log(result1)
    //模糊查询+多表查询
    var sql2='SELECT userdb.user.id,userdb.user.name AS username,userdb.user.email,userdb.user.number,group_concat(userdb.role.role) rolename,userdb.user.status FROM userdb.user,userdb.user_role,userdb.role where  userdb.user.id=userdb.user_role.user_id and userdb.role.id=userdb.user_role.role_id and name like ? group by userdb.user.name'
    var result2=await sqlquery(sql2,["%"+query+"%"])
    console.log(result2)

    result1.forEach((item)=>{
        var boo=Boolean(item.status)
        item.status=boo
    })
    if (query==''){
        res.json({
            status:200,
            data:result1,
            total:result.length,
            pagenum:pagenum,
        })
    } else {
        res.json({
            status:200,
            data:result2,
            total:result2.length,
            pagenum:pagenum
        })
    }




})


router.get('/userStatus',async (req,res)=>{
    var name=req.query.username
    var status=req.query.status
    if (status=='false'){

        var sql='update user set status=? where name=?'
        var result= await sqlquery(sql,[0,name])
        console.log(result.protocol41)
        if (result.protocol41==true){
            res.json({
                data:'',
                msg: '修改用户状态成功',
                status:200
            })
            return;
        }
        res.json({
            data:'',
            msg: '修改用户状态失败',
            status:401
        })
        return;
    }else {
        var sql2='update user set status=? where name=?'
        var result2= await sqlquery(sql2,[1,name])
        console.log(result2)
        if (result2.protocol41==true){
            res.json({
                data:'',
                msg: '修改用户状态成功',
                status:200
            })
            return;
        }
        res.json({
            data:'',
            msg: '修改用户状态失败',
            status:401
        })
        return;
    }

})


module.exports =router