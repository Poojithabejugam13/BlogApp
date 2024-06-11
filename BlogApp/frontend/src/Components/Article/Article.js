import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { LiaCommentMedicalSolid } from "react-icons/lia";
import { axiosWithToken } from '../../axiosWithTocken';
import { RiFileEditFill } from "react-icons/ri";
import { MdAutoDelete } from "react-icons/md";
import { MdOutlineRestoreFromTrash } from "react-icons/md";
import { LuFileClock } from "react-icons/lu";
import { LuFileInput } from "react-icons/lu";
function Article() {
    let {currentUser}=useSelector(state=>state.userAuthorLoginSlice)
    let {register,handleSubmit}=useForm()
    let {state}=useLocation()
    let [comm,setCommet]=useState('')
    let [Edit,setEdit]=useState(false)
    let [currentArticle,setAreticle]=useState(state)
    let navigate=useNavigate()
    async function writeComment(commentObj){
      commentObj.username=currentUser.username
      let res =await axiosWithToken.post(`http://localhost:4000/user-api/comment/${state.articleId}`,commentObj)
      if(res.data.message="Comment posted"){
        setCommet('Comment posted')
        
      }
    }
    function editEnable(){
      setEdit(true)
    }
      let saveEdit= async (obj)=>{
      let modifiedObj={...state,...obj}
      modifiedObj.dateOfModification=new Date()
      delete modifiedObj._id
      let res =await axiosWithToken.put('http://localhost:4000/author-api/article',modifiedObj)
      if(res.data.message=="articles updated"){
        navigate(`/authorprofile/articleById/${modifiedObj.articleId}`,{state:res.data.article})
        setEdit(false)
      }
    }
    let deleteArt=async()=>{
      let art={...currentArticle}
      delete art._id
      let res=await axiosWithToken.put(`http://localhost:4000/author-api//articles/${currentArticle.articleId}`,art)
      if(res.data.message==="articles removed"){
        console.log(res.data.payload);
        setAreticle({...currentArticle,status:res.data.payload})
      }
    }
    let RestoreArt=async()=>{
      let art={...currentArticle}
      delete art._id
      let res=await axiosWithToken.put(`http://localhost:4000/author-api//articles/${currentArticle.articleId}`,art)
      if(res.data.message==="articles Restored"){
        console.log(res.data.payload);
        setAreticle({...currentArticle,status:res.data.payload})
      }
    }
  return (
    <div>
      {Edit===false?
      <div className='p-3'>
        <div className='d-flex justify-content-between'>
            <div >
                <div>
                    <h3 className='me-4'>{state.title}</h3>
                </div>
                <span>
                <small className='me-4'>
                <LuFileClock /> :{state.dateOfCreation.substring(0,10)} {state.dateOfCreation.substring(11,19)} 
                </small>
               
                <small>
                <LuFileInput />:{state.dateOfModification.substring(0,10)} {state.dateOfModification.substring(11,19)}
                </small>
                
                </span>
            </div>
            <div>
                {
                currentUser.userType==='author' &&<>
                    
                    <button className="lead me-3" onClick={editEnable}><RiFileEditFill /></button>
                    {
                      currentArticle.status===true?<button className="lead" onClick={deleteArt}><MdAutoDelete /></button>:<button className="lead" onClick={RestoreArt}><MdOutlineRestoreFromTrash /></button>
                    }
                
                </>
                }
            </div>
        </div>
        <p className='lead mt-3 ' style={{whiteSpace:'pre-line'}}>
                {state.content}
        </p>
        <div>
        <div>
            {/* read existing comments */}
            <div className="comments my-4">
              {state.comments.length === 0 ? (
                <p className="display-3">No comments yet...</p>
              ) : (
                state.comments.map((commentObj, ind) => {
                  console.log(commentObj);
                  <div>hue</div>
                  return (
                    <div key={ind} className="bg-light  p-3">
                      <p
                        className="fs-4"
                        
                      >
                        {commentObj.username}
                      </p>

                      <p
                        className="ps-4"
                      >
                        {commentObj.comment}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
        </div>
            <h1>{comm}</h1>
            {/* write comment by user */}
            {currentUser.userType === "user" && (
              <>
                <h1>Comment</h1>
                <form onSubmit={handleSubmit(writeComment)}>
                <input
                  type="text"
                  {...register("comment")}
                  className="form-control mb-4 "
                  placeholder="Write comment here...."
                />
                <button type="submit" className="btn btn-success">
                  Add a Comment
                  <LiaCommentMedicalSolid />
                </button>
              </form>
              </>
              )
              
              }

            </div>
    </div>:
    <form onSubmit={handleSubmit(saveEdit)} className='m-1'>
    <div className='card-body'>
    <div>
     <label htmlFor="username" className='form-check-label'>Title</label>
     <input className='form-control' type="text"  {...register('title')} defaultValue={state.title}/>
    </div>
    <div>
       <label htmlFor="category" className='form-check-label'>category</label>
       <select className='form-select' id="" defaultValue={state.category} {...register('category') } >
         <option value="" disabled>chooseOption</option>
         <option value="dsa">DSA</option>
         <option value="Java">Java</option>
       </select>
 </div>
    <div>
     <label htmlFor="content" className='form-check-label'>content</label>
     <textarea  id="content" className='form-control' cols="30" rows="10" {...register('content')} defaultValue={state.content}></textarea>
    </div>
    </div>
    <div className="text-end card-footer ">
    <button type="submit" className='border-success border-4 rounded' >Post</button>
    </div>
   </form>
    
    }
    
    </div>
  )
}

export default Article