import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'

import { connect } from 'react-redux'
import { fetchCurrentUser } from './store/actions/authAction'

import Navigation3 from './components/Navigation/Navigation3'
import "./style.scss";

import IconButton from './components/Button/IconButton'

import { Container } from './components/Layout'

import routes from './routes.js'


const App = ()=>{
  
    return(
      <div className="App">

      <Navigation3/>


      {/* <DummyNav/> */}
  
      <Switch>
        {routes.map((route, i)=> <Route key={i} {...route} /> )}
      </Switch>
      
      <Container fluid>

        <IconButton size={16} color="red" type="far fa-heart" />
        <IconButton size={16} color="#602cbd" type="far fa-bell" />

      </Container>


      </div>
    )
}





export default App
