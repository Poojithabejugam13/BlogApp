import React from 'react'
import {Outlet} from 'react-router-dom'
import './Home.css'
function Home() {
  return (
    <div className='Home d-flex flex-column justify-content-center align-items-center ' style={{height:"88vh"}}>
        <h1>
            BLOG
        </h1>
        
        <p className="lead mt-3" >A blog, short for weblog, is a frequently updated web page used for personal commentary or business content. Blogs are often interactive and include sections at the bottom of individual blog posts where readers can leave comments.</p>
        
    <Outlet></Outlet>
    </div>
  )
}

export default Home