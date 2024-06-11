import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function AddNew() {
    let {register,handleSubmit}=useForm()
    let {currentUser}=useSelector(state=>state.userAuthorLoginSlice)
    let [err,setErr]=useState('')
    let token=localStorage.getItem('token')
    const axiosWithToken=axios.create({
      headers:{Authorization:`bearer ${token}`}
    })
    let navigate=useNavigate()
    async function onPost (article){
        article.dateOfCreation=new Date()
        article.dateOfModification=new Date()
        article.username=currentUser.username
        article.articleId=Date.now()
        article.comments=[]
        article.status=true
        console.log(article);
        let res=await axiosWithToken.post('http://localhost:4000/author-api/article',article)
        console.log(res);
        if(res.data.message==='articles added'){
          navigate(`/authorprofile/articles/${currentUser.username}`)
        }
        else{
          setErr(res.data.message)
        }
    }
  return (
    <div className="card  mx-auto m-5" style={{width: "24rem"} }>
       <form onSubmit={handleSubmit(onPost)} className='m-1'>
             <div className='card-body'>
             <div className='form mb-3'>
              <label htmlFor="title" className='form-check-label'>Title</label>
              <input className='form-control' type="text" placeholder='Title' {...register('title')}/>
             </div>
             <div className='form mb-3'>
              <label htmlFor="category" className='form-check-label'>category </label>
                <select className='form-select' id="" defaultValue="" {...register('category')}>
                  <option value="" disabled>chooseOption</option>
                  <option value="dsa">Programing</option>
                  <option value="Java">DSA</option>
                  <option value="Java">JS</option>
                  <option value="Java">REACT</option>
                </select>
                
          </div >
             <div className='form mb-3'>
              <label htmlFor="content" className='form-check-label'>content</label>
              <textarea  id="content" className='form-control' placeholder='Type' cols="30" rows="10" {...register('content')}></textarea>
             </div>
             </div>
             <div className="text-end card-footer ">
             <button type="submit" className='border-success border-4 rounded' >Post </button>
             </div>
            </form>
  </div>
  )
}

export default AddNew