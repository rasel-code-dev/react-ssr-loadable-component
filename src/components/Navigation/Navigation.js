import React from 'react'
import './Navigation.scss'
import { NavLink } from 'react-router-dom'

const Navigation = (props) => {

  return (
    <div>
      <header>
        <div className="main_nav">
          <li className="nav_item"><NavLink exact to="/">Home</NavLink></li>
          <li className="nav_item"><NavLink to="/users">Users</NavLink></li>
        </div>
      </header>
    </div>
  )
}



export default Navigation
