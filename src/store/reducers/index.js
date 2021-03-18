import { combineReducers } from 'redux'

import { FETCH_USERS, FETCH_USER, LOGIN, LOGOUT } from '../actions/types'




const initialAuthState = {
  isAuthenticated: false,
}

const authReducer = (state=initialAuthState, action)=>{
  switch(action.type){
    case LOGIN :
      return {...state, ...action.payload}
    
    case LOGOUT :
      return {...state, ...action.payload}

    default:
      return state  
  }
}

const usersReducer =(state=[], action)=>{
  switch(action.type){
    
    case FETCH_USERS :      
      return action.payload

    case FETCH_USER:
      return action.payload

    default:
      return state  
  }
}

export default combineReducers({
  auth: authReducer,
  users: usersReducer
})