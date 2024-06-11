const exp=require('express')
const authorApp=exp.Router()
const bcryptjs=require('bcryptjs')
const expressAsyncHandler= require('express-async-handler')
const jsonWebToken=require('jsonwebtoken')
require('dotenv').config()
const verifyToken=require('../Middlewares/verify')

let authorCollObj;
let articleObj;

authorApp.use((req,res,next)=>{
    authorCollObj=req.app.get('authorCollection')
    articleObj=req.app.get('articleCollenction')
    next()
})

authorApp.get('/test-author',expressAsyncHandler(async (req,res)=>{
    let authors=await authorCollObj.find().toArray()
    res.send({message:"authors",users:authors})
    
}))

authorApp.post('/author',expressAsyncHandler(async (req,res)=>{
    let author=req.body
    const dbauthor=await authorCollObj.findOne({username:author.username})
    if (dbauthor!==null){
        res.send({message:"user exist"})
    }
    else{
        let pass=author.password
        let hashpass=await bcryptjs.hash(pass,5)
        author.password=hashpass
        await authorCollObj.insertOne(author)
        res.send({message:"new author register"})

    }
}))

authorApp.post('/login',expressAsyncHandler(async(req,res)=>{
    const author=req.body
    let dbauthor=await authorCollObj.findOne({username:author.username})
    if(dbauthor==null){
        res.send({message:"Invaild username"})
    }else{
        let pass=await bcryptjs.compare(author.password,dbauthor.password)
        if(pass){
            const token=jsonWebToken.sign({username:author.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            res.send({message:"Login success",token:token,user:dbauthor})
        }else{
            res.send({message:"Invaild password"})
        }
    }
}))

authorApp.post('/article',verifyToken,expressAsyncHandler(async (req,res)=>{

    let article=req.body
    await articleObj.insertOne(article)
    res.send({message:"articles added"})

}))
authorApp.put('/article',verifyToken,expressAsyncHandler(async (req,res)=>{
    let article=req.body
    let result = await articleObj.updateOne({articleId:article.articleId},{$set:{...article}})
    let articleModified = await articleObj.findOne({articleId:article.articleId})
    res.send({message:"articles updated",article:articleModified})

}))
authorApp.put('/articles/:articleId',verifyToken,expressAsyncHandler(async (req,res)=>{
    let articleId=(+req.params.articleId)
    let article=req.body
    if(article.status===true){
        console.log("delete");
        let mod = await articleObj.findOneAndUpdate({articleId:articleId},{$set:{...article,status:false}},{returnDocument:'after'})
        res.send({message:"articles removed",payload:mod.status})
    }
    if(article.status===false){
        console.log("restore");
        let mod = await articleObj.findOneAndUpdate({articleId:articleId},{$set:{...article,status:true}},{returnDocument:'after'})
        res.send({message:"articles Restored",payload:mod.status})
    }
    // let result = await articleObj.updateOne({articleId:articleId},{$set:{...article,status:false}})
    // res.send({message:"articles removed"})

}))
authorApp.get('/articles/:username',verifyToken,expressAsyncHandler(async (req,res)=>{
    let name=req.params.username
    let article = await articleObj.find({username:name}).toArray()
    res.send({message:"articles",article:article})

}))
module.exports=authorApp