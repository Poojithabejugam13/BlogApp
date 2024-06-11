import React, { useEffect, useRef, useState } from 'react'
import './Header.css'
import { Link,NavLink } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux';
import { resetSate } from '../../Redux/slices/userAuthorslice';
import { TbWritingSign } from "react-icons/tb";
import { BiSolidBookReader } from "react-icons/bi";
import img from '../header/image.png'
function Header() {
  let {isLogin,errOccurred,errMes,currentUser}=useSelector(state=>state.userAuthorLoginSlice)
  let dispatch=useDispatch()
  let [height,setHeight]=useState(40)
  function signOut(){
    localStorage.removeItem('token')
    dispatch(resetSate())

  }
  let refE=useRef()
  useEffect(()=>{
    setHeight(refE.current.clientHeight)
  })
  return (
    <div className='Header' ref={refE}>
       
    <ul className="nav justify-content-end ">
        <li className="nav-item">
        <img style={{height:`${height}px`}} src={img} alt="" /></li>
        {
          isLogin===false?<>
          <li className="nav-item">
          <NavLink className="nav-link" to="Home">Home</NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link" to="signin">SignIn</NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link" to="signup">Signup</NavLink>
          </li></> :
        <li className="nav-item">
          <h5>Welcome {currentUser.username}  {
            currentUser.userType==="author"?<TbWritingSign />:<BiSolidBookReader />
          }</h5>
          
        <NavLink className="nav-link a" to="" onClick={signOut}>SignOut</NavLink>
        </li>
        }
        
      
        
    </ul>
</div>
  )
}

export default Header