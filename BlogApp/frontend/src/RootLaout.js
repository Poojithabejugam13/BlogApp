import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Components/header/Header'
import Footer from './Components/footer/Footer'
function RootLaout() {
  return (
    <div>
        <Header></Header>
        <div className='' style={{minHeight:'88vh'}}>
            <Outlet></Outlet>
        </div>
        <Footer></Footer>
    </div>
  )
}

export default RootLaout