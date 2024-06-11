const jsonwebatoken=require('jsonwebtoken')
require('dotenv').config()
const verifytoken=((req,res,next)=>{
    let bearerToken=req.headers.authorization
    console.log(req.headers);
    if(!bearerToken){
        return res.send({message:"Please Login"})
    }
    const token=bearerToken.split(' ')[1]
    try {
        let decode=jsonwebatoken.verify(token,process.env.SECRET_KEY)
        next()
    } catch (error) {
        next(error)
    }
    // next()
})
module.exports=verifytoken