var express=require('express')
var router=express.Router()
var multer=require('multer')
var upload=multer({dest:'./public/upload'})
var fs=require('fs')
var sqlquery=require('../../public/javascripts/mysql')


    router.post('/addProduct_one',upload.single('imgFile'),async (req,res)=> {
        console.log(req.body)
        console.log(req.file)
        var oldname=req.file.destination+'/'+req.file.filename
        var newname=req.file.destination+'/'+req.file.filename+req.file.originalname
    console.log(newname)
    fs.rename(oldname,newname,()=>{
        console.log('改名成功')
    })
        res.json({
            message:'上传成功',
            imgUrl:'http://localhost:3000/upload/'+req.file.filename+req.file.originalname
        })


})

router.post('/addProduct_tow',async (req,res)=>{
    var img=req.body.imgUrl
    var productName=req.body.productName
    var Price=req.body.Price
    var productNumber=req.body.productNumber
    var Shelves=req.body.Shelves
    var Sales=req.body.Sales
    var Audistatus=req.body.Audistatus
    var ProductCategory=req.body.ProductCategory
    var subheading=req.body.subheading
    var brand=req.body.brand
    var productIntroduce=req.body.productIntroduce
    var ProductInventory=req.body.ProductInventory
    var measurement=req.body.measurement
    var weight=req.body.weight
    var arr=[img,productName,Price,productNumber,Shelves,Sales,Audistatus,ProductCategory,subheading,brand,productIntroduce,ProductInventory,measurement,weight]
    var sql='INSERT INTO `userdb`.`productlist` (`Img`, `productName`, `Price`, `productNumber`, `Shelves`, `Sales`, `AudiStatus`, `ProductCategory`, `subheading`, `brand`, `productIntroduce`, `ProductInventory`, `measurement`, `weight`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?);'
    var sql2='SELECT * FROM userdb.productlist where img=?'
    var result=await sqlquery(sql,arr)
    console.log(result)
    console.log('12212')
    var result2=await sqlquery(sql2,[img])
    console.log(result2)

    res.json({
        status:1,
        message:'提交商品信息成功',
        id:result2[0].id
    })

})

router.post('/addProductSku',async (req,res)=>{
        var sku=req.body.sku
        var product_id=req.body.id
    console.log(sku,product_id)
        var arr=[sku,product_id]
        var sql='INSERT INTO `userdb`.`product_sku` (`sku`, `product_id`) VALUES (?,?)'
    var result=await sqlquery(sql,arr)
        try {

            console.log(result)
            res.json({
                status:0,
                message:'添加sku成功'
            })
        }catch (e) {
            res.json({
                status:0,
                message:'添加sku失败'
            })
        }


})

router.post('/addProductColorImg',upload.single('ColorImg'),(req,res)=>{

    var oldname=req.file.destination+'/'+req.file.filename
    var newname=req.file.destination+'/'+req.file.filename+req.file.originalname
    console.log(newname)
    fs.rename(oldname,newname,()=>{
        console.log('改名成功')
    })
    res.json({
        message:'上传成功',
        imgUrl:'http://localhost:3000/upload/'+req.file.filename+req.file.originalname
    })

})
router.post('/addProductColor',async(req,res)=>{
     var color=req.body.color
     var img=req.body.img
     var productID=req.body.productID
     var arr=[color,img,productID]
     var sql='INSERT INTO `userdb`.`product_colorimg` (`color`, `img`, `product_id`) VALUES (?,?,?);'
    var result=await sqlquery(sql,arr)
    try {

        console.log(result)
        res.json({
            status:0,
            message:'添加图片成功'
        })
    }catch (e) {
        res.json({
            status:0,
            message:'添加图片失败'
        })
    }

})

router.post('/addImg',async (req,res)=>{
     var img=req.body.img
    var product_ID=req.body.product_ID

    var sql='INSERT INTO `userdb`.`product_img` (`img`, `product_ID`) VALUES (?,?)'
    try {
        var result=await sqlquery(sql,[img,product_ID])
        console.log(result)
        res.json({
            status:200,
            message:'图片上传成功'
        })
    }catch (e) {

    }
})

router.post('/addSpu',async (req,res)=>{
       var spu=req.body.spu
       var Product_Id=req.body.Product_Id
       var arr=[spu,Product_Id]
       var sql='INSERT INTO `userdb`.`product_spu` (`spu`, `Product_Id`) VALUES (?,?);'


           var result=await sqlquery(sql,arr)
           console.log(result)
           res.json({
               status:0,
               message:'添加商品参数成功'
           })

           //res.json({
             //  status:1,
              // message:'添加商品参数失败'
          // })


})
router.post('/addSpecifications_imgUrl',async (req,res)=>{
    var imgUrl=req.body.img
    var id=req.body.product_ID
    console.log(req.body)
        var sql="INSERT INTO `userdb`.`product_specifications` (`img`, `product_Idx_`) VALUES (?,?);"
        var result=await sqlquery(sql,[imgUrl,id])
        console.log(result)
        res.json({
            status:0,
            message:'规格参数上传成功'
        })



})
module.exports=router