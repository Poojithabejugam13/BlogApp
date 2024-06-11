import React from 'react'
import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

// import './articles/ArticleByauthor.css'
function AuthorProfile() {
  let {currentUser}=useSelector(state=>state.userAuthorLoginSlice)

  return (
    <div className='Atricles' >
      <ul className="nav justify-content-between " >
          <li className="nav-item">
          <NavLink className="nav-link mx-3" to={`articles/${currentUser.username}`}>Articles
          
          </NavLink>
          </li>
          <li className="nav-item">
          <NavLink className="nav-link mx-3" to="addNew">AddNew

          </NavLink>
          </li>
      </ul>
      <Outlet></Outlet>
    </div>
  )
}

export default AuthorProfile