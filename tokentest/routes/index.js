var express = require('express');
var router = express.Router();
const {jwtAuth}=require('../routes/token/token')




var loginRouter=require('./user/login')
var homeRouter=require('./home/home')
var userListRouter=require('./user/userlist')
var addUserRouter=require('./user/adduser')
var editUserRouter=require('./user/edituser')
var deleteUserRouter=require('./user/deleteuser')
var authorityListRouter=require('./authority/authority_list')
var authorityRoleRouter=require('./authority/authority_role')
var addRoleRouter=require('./authority/addRole')
var editRoleRouter=require('./authority/editRole')
var deleteRoleRouter=require('./authority/deleteRole')
var removeRoleAssRouter=require('./authority/removeRoleAss')
var addAuthRouter=require('./authority/addAuth')
var productCatRouter=require('./Product/product_cat')
var productTypeRouter=require('./Product/product_type')
var addProductArr=require('./Product/ProductArr')
var addProduct=require('./Product/addProduct')
var selectProduct=require('./Product/SelectProduct')
router.use(jwtAuth)

router.use(function (err,req,res,next) {
    console.log(err.status)
   if (err.status==401){
       res.json({
           status:401,
           message:"token无效或过期"
       })
       return
   }
   next()
})



router.use('/api',loginRouter)
router.use('/api',homeRouter)
router.use('/api',userListRouter)
router.use('/api',addUserRouter)
router.use('/api',editUserRouter)
router.use('/api',deleteUserRouter)
router.use('/api',authorityListRouter)
router.use('/api',authorityRoleRouter)
router.use('/api',addRoleRouter)
router.use('/api',editRoleRouter)
router.use('/api',deleteRoleRouter)
router.use('/api',removeRoleAssRouter)
router.use('/api',addAuthRouter)
router.use('/api',productCatRouter)
router.use('/api',productTypeRouter)
router.use('/api',addProductArr)
router.use('/api',addProduct)
router.use('/api',selectProduct)

module.exports = router;
