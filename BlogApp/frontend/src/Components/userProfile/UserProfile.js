import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
function UserProfile() {
  return (
    <div>
      <ul className="nav justify-content-between ">
        <li className="nav-item">
        <NavLink className="nav-link mx-3" to="articles">Articles </NavLink>
        </li>      
    </ul>
    <Outlet></Outlet>
    </div>
  )
}

export default UserProfile