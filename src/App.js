import React from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies

import { Route, Switch, NavLink } from 'react-router-dom'

import routes from './routes'

const Navigation = ()=>{
  return (
    <header>
    <li> <NavLink to="/">Home</NavLink> </li>
    <li> <NavLink to="/about-page">About Page</NavLink> </li>
    </header>
  )
}

const App = () => (
  <div>
    <Navigation/>
    <br/>
    <i className="fa fa-address-book" aria-hidden="true"></i>

    <Switch>
      { routes.map((route, i)=> <Route key={i} {...route} /> ) }
    </Switch>
  </div>
)

export default App
