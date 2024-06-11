const exp=require('express')
const userApp=exp.Router()
const bcryptjs=require('bcryptjs')
const expressAsyncHandler= require('express-async-handler')
const jsonWebToken=require('jsonwebtoken')
const verifyToken=require('../Middlewares/verify')
require('dotenv').config()
// userApp.use(exp.json())
let userCollObj;

userApp.use((req,res,next)=>{
    userCollObj=req.app.get('userCollection')
    next()
})

userApp.get('/test-user',expressAsyncHandler(async (req,res)=>{
    let users=await userCollObj.find().toArray()
    res.send({message:"user",users:users})
    
}))

userApp.post('/user',expressAsyncHandler(async (req,res)=>{
    let user=req.body
    const dbuser=await userCollObj.findOne({username:user.username})
    if (dbuser!==null){
        res.send({message:"User Exist"})
    }
    else{
        let pass=user.password
        let hashpass=await bcryptjs.hash(pass,5)
        user.password=hashpass
        await userCollObj.insertOne(user)
        res.send({message:"new user register"})

    }
}))

userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    const user=req.body
    let dbuser=await userCollObj.findOne({username:user.username})
    if(dbuser==null){
        res.send({message:"Invaild username"})
    }else{
        let pass=await bcryptjs.compare(user.password,dbuser.password)
        if(pass){
            const token=jsonWebToken.sign({username:user.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            res.send({message:"Login success",token:token,user:dbuser})
        }else{
            res.send({message:"Invaild password"})
        }
    }
}))
userApp.get('/articles',verifyToken,expressAsyncHandler(async (req,res)=>{
    const articleObj=req.app.get('articleCollenction')
    let article = await articleObj.find({status:true}).toArray()
    // console.log(article);
    res.send({message:"articles",article:article})

}))

userApp.post("/comment/:articleId",verifyToken,
    expressAsyncHandler(async (req, res) => {
      //get user comment obj
    const articleObj=req.app.get('articleCollenction')
      const userComment = req.body;
      const articleIdFromUrl=(+req.params.articleId);
      //insert userComment object to comments array of article by id
      let result = await articleObj.updateOne(
        { articleId: articleIdFromUrl},
        { $addToSet: { comments: userComment } }
      );
      console.log(result);
      res.send({ message: "Comment posted" });
    })
  );

module.exports=userApp