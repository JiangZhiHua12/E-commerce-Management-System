var sqlquery=require('../../public/javascripts/mysql')
var express=require('express')
var router=express.Router()

//
//树形结构的数据分布
router.get('/authTree',async (req,res)=>{
    //查询一级权限
  var sql='select * from first_authority'
    var result=await  sqlquery(sql)
    //查询二级权限
    var sql2='select userdb.second_authority.id,userdb.second_authority.path,userdb.second_authority.authname,userdb.second_authority.first_id from userdb.first_authority,userdb.second_authority where userdb.second_authority.first_id=userdb.first_authority.id group by userdb.second_authority.authname  '
    var result2=await sqlquery(sql2)
    //查询三级权限
    var sql3='select userdb.three_authority.id,userdb.three_authority.path,userdb.three_authority.authname,userdb.three_authority.second_id from userdb.second_authority,userdb.three_authority where userdb.three_authority.second_id=userdb.second_authority.id group by userdb.three_authority.authname '
    var result3=await sqlquery(sql3)

//
//两重循环

  result.forEach((item,index)=>{
//
      //过滤出只属于一级权限下的二级权限
      var data=result2.filter(item=>{
          return item.first_id==result[index].id
      })
      //
      //将二级权限放在一级权限对应的children属性里面
       result[index].children=data

      //
      //第二重循环
      for (var i=0;i<result[index].children.length;i++){
          //
          //过滤出只属于二级权限下的三级权限
           data1=result3.filter(item=>{

              return  item.second_id==result[index].children[i].id
          })
          //
          //将三级权限添加到二级权限下对应的children属性下
          result[index].children[i].children=data1
      }
  })

    res.json({
        msg:'ok',
        data:result
    })

})

//
//线形结构的数据分布
router.get('/authList',async (req,res)=>{
   //
    //查询所有的一级权限
    var sql='select * from first_authority'
    var result=await sqlquery(sql)
   //
    //查询所有的二级权限
    var sql2='select * from second_authority'
    var result2=await sqlquery(sql2)
    console.log(result2)
   //
    //查询所有的三级权限
    var sql3='select * from three_authority'
    var result3=await sqlquery(sql3)

    //
    //将二级权限追加到一级权限的数组里面
    result2.forEach(item=>{
        result.push(item)
    })
    //
    //将三级权限追加到一级权限的数组里面
    result3.forEach(item=>{
        result.push(item)
    })


    res.json({
        msg:'ok',
        data:result
    })

})


module.exports =router