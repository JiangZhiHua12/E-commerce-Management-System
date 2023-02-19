const express=require("express")
const router=express.Router()
var sqlquery=require('../../public/javascripts/mysql')


router.post('/addProductArr' ,async (req,res)=>{

    var ProductName=req.body.ProductName
    var ProductType=req.body.ProductType
    var ClassStyle=req.body.ClassStyle
    var isIndex=req.body.isIndex
    var ArrAss=req.body.ArrAss
    var ArrCheck=req.body.ArrCheck
    var WriteWay=req.body.WriteWay
    var CheckValue=req.body.CheckValue
    var Manual=req.body.Manual
    var Sort=req.body.Sort
    var productType_id=req.body.productType_id
    var attributeORparameter=req.body.attributeORparameter
    var arr=[ProductName,ProductType,ClassStyle,isIndex,ArrAss,ArrCheck,WriteWay,CheckValue,Manual,Sort,productType_id,attributeORparameter]

    try {
        var sql='insert into productarr (ProductName,ProductType,ClassStyle,isIndex,ArrAss,ArrCheck,WriteWay,CheckValue,Manual,Sort,productType_id,attributeORparameter) values(?,?,?,?,?,?,?,?,?,?,?,?)'
        var result=await sqlquery(sql,arr)
        console.log(result)
        res.json({
            status:1,
            message:'添加商品属性成功'
        })
    }
    catch (e) {
        res.json({
            status:2,
            message:'添加商品属性失败'
        })
    }


})

router.get('/getProductArr',async (req,res)=>{
  var productType_id=req.query.id
  var attributeORparameter=req.query.Parameter
    console.log(attributeORparameter)
    try {
        var sql='select * from productarr where productType_id=? and attributeORparameter=?  '
        var result=await sqlquery(sql,[productType_id,attributeORparameter])
        console.log(result)
        res.json({
            status:0,
            message:'查询成功',
            data:result
        })
    }catch (e) {
        res.json({
            status:1,
            message:'查询失败',
        })
    }


})

router.get('/getProductArrNum',async (req,res)=>{
    var type_id=req.query.id
    var sql='select * from productarr where productType_id=?'
    var result=await sqlquery(sql,[type_id])
    console.log('haha')
    console.log(result)
    var  attribute_num=result.filter((item)=>{
        return item.attributeORparameter==0
    })
    console.log('jjbb')
    console.log(attribute_num.length)
    var parameter_num=result.filter((item)=>{
        return item.attributeORparameter==1
    })

    res.json({
        status:0,
        message:'查询参数数量成功',
        attribute_num:attribute_num.length,
        parameter_num:parameter_num.length,
        id:result[0].productType_id
    })
})

router.post('/deleteArr',async (req,res)=>{
    var id=req.body.id
    console.log(id)
    try {
        var sql='delete from productarr where id=?'
        var result=await sqlquery(sql,[id])
        console.log(result)
        res.json({
            status:0,
            message:"删除成功"
        })

    }
    catch (e) {
        res.json({
            status:1,
            message:"删除失败"
        })
    }

})
module.exports=router
