const exp=require('express')
const app=exp()
require('dotenv').config()

app.use(exp.json())
const userApp=require('./Apis/userApi')
const authorApp=require('./Apis/authorApi')
const adminApp=require('./Apis/adminApi')

const path=require('path')
app.use(exp.static(path.join(__dirname,'../frontend/build')))

//connection
const mongoClient=require('mongodb').MongoClient

mongoClient.connect(process.env.DB_PORT)
.then((client)=>{
    const dbObj=client.db("blogdb")
    const userCollection=dbObj.collection("userCollection")
    const articleCollenction=dbObj.collection("articleCollenction")
    const authorCollection=dbObj.collection('authorCollection')
    //set
    app.set('userCollection',userCollection)
    app.set('articleCollenction',articleCollenction)
    app.set('authorCollection',authorCollection)
    console.log("connected db");
})
.catch(err=>{
    console.log("connection fail");
})


app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)

app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'))
})

app.use((err,req,res,next)=>{
    res.send({message:"err",payload:err.message})
})

const port=process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`port ${port}`);
})