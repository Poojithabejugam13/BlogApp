const exp=require('express')
const adminApp=exp.Router()

adminApp.get('/test-admin',(req,res)=>{
    res.send({message:"admin"})
})

module.exports=adminApp
