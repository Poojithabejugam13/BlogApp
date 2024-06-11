import '../signIn/SignIn.css'
import React, { useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { useDispatch,useSelector } from 'react-redux';
import { userAuthorThunk } from '../../Redux/slices/userAuthorslice';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
function SignIn() {
    let {register,handleSubmit,formState:{errors}}=useForm()      
    let {isLogin,errOccurred,errMes,currentUser}=useSelector(state=>state.userAuthorLoginSlice)
    let navigate=useNavigate();
    let dispatch=useDispatch()
    function onSignINFormSubmit(obj){
      
      dispatch(userAuthorThunk(obj))     
    }
    useEffect(()=>{
      if(isLogin==true){
        if(currentUser.userType==="user"){
          navigate('/userprofile')
        }
        if(currentUser.userType==="author"){
          navigate('/authorprofile')
        }
      }
      
    },[isLogin])
  return (
    <div
      className=" Signin-body d-flex justify-content-center align-items-center "
      style={{ height: "88vh" }}
    >
      <div className="container m-auto">
        <div className="row justify-content-center align-items-center  ">
          <div className="col-lg-4 col-md-6 col-sm-6">
            <div className="card shadow">
              {errOccurred === true && (
                <div className="text-center text-danger">
                  <h6>{errMes}</h6>
                </div>
              )}
              <form onSubmit={handleSubmit(onSignINFormSubmit)} className="m-1">
                <div className="m-2 card-title">
                  <label htmlFor="" className="form-check-label me-3">
                    Login As
                  </label>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      id="author"
                      value="author"
                      {...register("userType",{required:true})}
                    />
                    <label htmlFor="author" className="form-check-label me-3">
                      author
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      type="radio"
                      id="user"
                      value="user"
                      {...register("userType",{required:true})}
                    />
                    <label htmlFor="user" className="form-check-label me-3">
                      user
                    </label>
                  </div>
                  {errors.userType?.type === "required" && (
                    <p className="text-danger p-1 text-center">
                      UserType required
                    </p>
                  )}
                </div>
                <div className="card-body">
                  
                  <div className='form mb-3'>
                  <label htmlFor="username" className="form-check-label">
                      Username
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="username"
                      {...register("username")}
                    />
                    
                  </div>
                  <div className='form'>
                    <label htmlFor="password" className="form-check-label">
                      Password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      placeholder="password"
                      {...register("password")}
                    />
                    
                  </div>
                </div>
                <div className="text-center card-footer ">
                  <button
                    type="submit"
                    className="border-success border-2 rounded"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Outlet></Outlet>
    </div>
  );
}

export default SignIn