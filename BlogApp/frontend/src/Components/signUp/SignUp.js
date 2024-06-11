import React, { useState } from 'react'
import {set, useForm} from 'react-hook-form'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
function SignUp() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let [err,setErr]=useState('')
    let navigate=useNavigate()
    async function onSignUpFormSubmit(obj){
      if(obj.userType==='user'){
        let res=await axios.post('http://localhost:4000/user-api/user',obj)
        if (res.data.message==='new user register'){
            navigate('/signin')
        }else{
          setErr(res.data.message)
        }
      }
      if(obj.userType==='author'){
        let res=await axios.post('http://localhost:4000/author-api/author',obj)
        if (res.data.message==='new author register'){
            navigate('/signin')
        }else{
          setErr(res.data.message)
        }
      }
    }
  return (
    <div className=' Signin-body d-flex justify-content-center align-items-center ' style={{height:"88vh"}}>
    <div className="card  mx-auto m-5" style={{width: "24rem"} }>
      <div className='text-center '>
        {err.length!==0 && <h6 className='text-danger lead'>{err}</h6>}
      </div>
         <form onSubmit={handleSubmit(onSignUpFormSubmit)} className='m-1'>
               <div className='m-2 card-header'>
                <label htmlFor=""  className="form-check-label me-3">Register As</label>
                <div className="form-check form-check-inline">
                <input type="radio"  id="author" value="author" {...register('userType',{required:true})}/>
                <label htmlFor="author"  className="form-check-label me-3">author</label>
                </div>
                <div className="form-check form-check-inline">
                <input type="radio" id="user" value="user"{...register('userType',{required:true})}/>
                <label htmlFor="user"  className="form-check-label me-3">user</label>
                </div>
                {errors.userType?.type === "required" && (
                  <p className="text-danger p-1 text-center">UserType required</p>
                )}
               </div>
               <div className='card-body'>
               <div  className='form mb-3'>
               <label htmlFor="username" className='form-check-label'>Username 
                
                </label>
                <input className='form-control ' type="text" placeholder='username' {...register('username')}/>
                
               </div>
               <div className='form mb-3'>
               <label htmlFor="password" className='form-check-label'>Password
               </label>
                <input className='form-control' type="password" placeholder='password' {...register('password',{required:true,minLength:5,min:"abhi"})}/>
                
                {errors.password?.type === "required" && (
                  <p className="text-danger p-1">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                      <p className="text-danger p-1">minLength of pass word 5</p>
                )}
                {errors.password?.type === "min" && (
                      <p className="text-danger p-1">min of pass word abhi</p>
                )}
               </div>
               <div className='form'>
               <label htmlFor="email" className='form-check-label'>Email
               </label>
                <input className='form-control' type="email" placeholder='email' {...register('email',{required:true})}/>
                
                {errors.email?.type === "required" && (
                  <p className="text-danger p-1">Email is required</p>
                )}
               </div>
               </div>
               <div className="text-center card-footer ">
               <button type="submit" className='border-success border-4 rounded' >Register</button>
               </div>
              </form>
    </div>
    </div>
  )
}

export default SignUp