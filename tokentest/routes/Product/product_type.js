var express=require('express')
var router=express.Router()
var sqlquery=require('../../public/javascripts/mysql')
const axios=require('axios')


router.get('/getProductType',async (req,res)=>{
     var sql='select * from product_type'
     var result=await sqlquery(sql)
    console.log(result)
    res.json({
        status:200,
        msg:'获取商品类型成功',
        data:result

    })

})

router.post('/addProductType',async (req,res)=>{
    var type_name=req.body.type_name
    var attribute_num=req.body.attribute_num
    var parameter_num=req.body.parameter_num
    var arr=[type_name,attribute_num,parameter_num]
    var sql='insert into product_type (type_name,attribute_num,parameter_num) values(?,?,?) '
    var result=await sqlquery(sql,arr)
    console.log(result)
    res.json({
        status:200,
        msg:'添加商品类型成功',
    })
})

router.post('/deleteProductType',async (req,res)=>{
     var id=req.body.id

    console.log(id)
    console.log('----123')

    var sql2='delete from productarr where productType_id=?'
    var result2=await sqlquery(sql2,[id])
    console.log(result2)
    var sql='delete from product_type where id=?'
    var result=await sqlquery(sql,[id])
    console.log(result)
    res.json({
        status:200,
        msg:'删除成功！'
    })


})
router.get('/getType',async (req,res)=>{
    var id=req.query.id
    var sql='select * from  product_type where id=?'
    var result=await  sqlquery(sql,[id])
    console.log(result)
    res.json({
        status:200,
        msg:'查询成功',
        data:result
    })
})
router.post('/editProductType',async (req,res)=>{
    var type_name=req.body.type_name
    var id=req.body.id
    var sql='update product_type set type_name=? where id=?'
    var result=await sqlquery(sql,[type_name,id])
    console.log(result)
    res.json({
        status:200,
        msg:'修改成功'
    })
})

router.post('/editProductTypeNum',async (req,res)=>{
    var attribute_num=req.body.attribute_num
    var parameter_num=req.body.parameter_num
    console.log(attribute_num)

    console.log(parameter_num)

    var id=req.body.id
    console.log(id)
    var sql='update product_type set attribute_num=?,parameter_num=? where id=?'
    var result=await sqlquery(sql,[attribute_num,parameter_num,id])
    console.log('nimade')
    console.log(result)
    res.json({
        status:200,
        msg:'修改成功'
    })
})

router.post('/productType',async (req,res)=>{

        var type_name=req.body.type_name
        var sql='select* from product_type where type_name=?'
        var result=await sqlquery(sql,type_name)
        console.log(result)
        res.json({
            status:200,
            message:'查询商品类型id成功',
            id:result[0].id
        })
})
module.exports=router