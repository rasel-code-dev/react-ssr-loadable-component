

import {applyMiddleware, createStore, compose} from "redux"
import thunk from "redux-thunk";
import axios from "axios";





const initialProductState = {
  products: [],
  users: []
}

export function productReducer(state=initialProductState, action){
  switch (action.type){
    
    case "FETCH_PRODUCTS":
      return {...state, products: action.payload}
      
    case "FETCH_USERS":
      return {...state, users: action.payload}
      
    default:
      return state
  }
}


// actions
export const fetchProducts=()=>(dispatch, getState, api)=>{
  api.get("/api/products").then(r=>{
    dispatch({
      type: "FETCH_PRODUCTS",
      payload: r.data
    })
  })
}

export const fetchUsers=()=>(dispatch, getState, api)=>{
  return api.get("/api/users").then(r=>{
    return dispatch({
      type: "FETCH_USERS",
      payload: r.data
    })
  })
}

