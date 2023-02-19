var express=require('express')

var app=express()

app.use(express.static('public'))
app.get('/',(req,res)=>{
    res.send('你好呀')
})

app.listen('3000',function () {
    console.log('服务器启动成功')
})