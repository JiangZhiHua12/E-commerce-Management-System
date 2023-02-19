const express=require('express')
const router=express.Router()
const sqlquery=require('../../public/javascripts/mysql')

router.get('/getProductList',async (req,res)=>{
    //当前的页数
    var  pagenum=parseInt(req.query.pagenum)
    //显示多少条数据
    var  pagesize=parseInt(req.query.pagesize)
    console.log(pagenum,pagesize)
    var sql2="SELECT * FROM userdb.productlist"
    var result2=await sqlquery(sql2)
    console.log(result2.length)

    var sql='SELECT * FROM userdb.productlist limit ?,?;'
    var arr=[(pagenum-1) * pagesize,pagesize]
    var result=await sqlquery(sql,arr)

    result.forEach((item)=>{
        if (item.Shelves==1){
            item.Shelves=true
        }else {
            item.Shelves=false
        }
    })
    console.log(result)
    res.json({
        status:0,
        message:'查询商品列表成功',
        data:result,
        total:result2.length,
        pagenum:pagenum,
    })
})

router.post('/delete',async (req,res)=>{
    var id=req.body.id

    var sql2="delete from userdb.product_colorimg where product_id=?"
    var sql3="delete from userdb.product_img where product_ID=?"
    var sql4="delete from userdb.product_sku where product_id=?"
    var sql5="delete from userdb.product_specifications where product_Idx_=?"
    var sql6="delete from userdb.product_spu where Product_Id=?"
    var sql="delete from userdb.productlist where id=?"

    await sqlquery(sql2,id)
    await sqlquery(sql3,id)
    await sqlquery(sql4,id)
    await sqlquery(sql5,id)
    await sqlquery(sql6,id)
    await sqlquery(sql,id)
    res.json({
        status:0,
        message:'商品删除成功'
    })
})

router.post('/edit',async (req,res)=>{
    var id=req.body.id
    var sql="select *from userdb.productlist where id=? "
    var result=await sqlquery(sql,[id])
    console.log(result)
    res.json({
        status:0,
        data:result
    })
})

router.post('/editStatus',async (req,res)=>{
       var Shelves=req.body.Shelves
       var id=req.body.id
    console.log(Shelves)
    var sql='update productlist set Shelves=? where id=?'


      if(Shelves==true){
          var result=await sqlquery(sql,[1,id])
          console.log(result)
          res.json({
              status:0,
              message:'上架成功！'
          })
      }else if (Shelves==false){
          var result=await sqlquery(sql,[0,id])
          console.log(result)
          res.json({
              status:1,
              message:'下架成功！'
          })
      }

})
module.exports=router