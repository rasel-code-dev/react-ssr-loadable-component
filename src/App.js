import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import { fetchCurrentUser } from './store/actions/authAction'

import Navigation3 from './components/Navigation/Navigation3'
import "./style.scss";

import '@fortawesome/fontawesome-free/css/all.css'


import routes from './routes.js'


const App = ()=>{
  
    return(
      <div className="App">
        <i class="fa fa-address-book" aria-hidden="true"></i>

      <Navigation3/>

      {/* <DummyNav/> */}
  
      <Switch>
        {routes.map((route, i)=> <Route key={i} {...route} /> )}
      </Switch>
      
      </div>
    )
}


const DummyNav = ()=>{
  return <ul>
    <NavLink to="/">Home</NavLink>
    <NavLink to="/users">Users</NavLink>
    <NavLink to="/products">Products</NavLink>
    <NavLink to="/about">About</NavLink>
  </ul>
}


export default App
