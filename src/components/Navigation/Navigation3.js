import React from 'react'

import { NavLink } from 'react-router-dom'
import './Navigation3.scss'

import IconButton from '../Button/IconButton'


const Navigation3 = () => {

  const [isExpandNav, setExpandNav] = React.useState(null)

  let serverRendering = false;
  if(typeof window) serverRendering = true; 

  function hangleToggleNavbar(e){
    setExpandNav(!isExpandNav)
  }
  
  function closeNavbar(e){
    setExpandNav(false)
  }
  


  const render_MainNav=(ssr, status="", isMobile )=>{    
    return (
       <ul className={["main_nav", status, serverRendering && ssr ? "ssr_mode" : "", 
          isMobile ? (isExpandNav === true ? "expand_mobile_nav" : "" ) : "", 
          isMobile ? (isExpandNav === false ? "collapse_mobile_nav" : "") : "" ].join(" ")}>
        <li onClick={closeNavbar} className="nav_item"><NavLink exact to="/">Home</NavLink></li>
        <li onClick={closeNavbar}  className="nav_item"> <NavLink to="/users">Users</NavLink></li>
        <li onClick={closeNavbar}  className="nav_item"><NavLink to="/products">Products</NavLink></li>
        <li onClick={closeNavbar}  className="nav_item"><NavLink to="/about">About</NavLink></li>     
      </ul>
    )
  }

  return (
    <header className={["navigation", isExpandNav ? "mobile_navigation" : "desktop_navigation" ].join(" ")}>
      <div className="nav">       
      { render_MainNav(true,  "desktop_nav ", false) }         
       
        <div onClick={hangleToggleNavbar} className="toggle_bar">
          <span/>
          <span/>
          <span/>
          <span/>
        </div>
      </div>

      {render_MainNav(false,  "mobile_nav ", true )}

    </header>
  )
}

export default  Navigation3
