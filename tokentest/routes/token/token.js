const jwt=require('jsonwebtoken')
const {secretKey}=require('../token/salt')
const expressjwt=require("express-jwt")

//创建token
const createToken=(payload=>{
    var token=jwt.sign(payload,secretKey,{expiresIn:60*60*24})

    return token

})

//校验token

const jwtAuth=expressjwt({
    secret:secretKey,
    algorithms:["HS256"],
    credentialsRequire:true
}).unless({
    path:["/api/login","/api/addProduct_one"]
})

module.exports={createToken,jwtAuth}
