import axios from 'axios'
import { LOGIN, LOGOUT, SIGN_UP, } from './types'


// Register Api Call........
export const register = (userData, history)=> async (dispatch, getState, api)=> {
  const { data } = await api.post('/auth/register', {...userData})
  history.push("/login")
  dispatch({
    type: SIGN_UP
  })
}


//~ auto login when componopentDidMount ==> client site
export const fetchCurrentUser = () => async (dispatch, getState, api) => {
  try {
    const { data} = await api.get("/api/auth/current-user")  

    if(!data) return 
    const payload = {
      isAuthenticated: true,
      username: data.username,
      userId: data._id ,
      email: data.email
    }
    dispatch({
      type: LOGIN,
      payload: payload
    })

  } catch (error) {
    console.log("error occur...........");
  }
}


//~ login action.......
export const login = (userData)=> async (dispatch, getState, api)=> {
  const { data }= await api.post('/auth/login', {...userData})
  if(!data) return 

  const payload = {
    isAuthenticated: true,
    username: data.username,
    userId: data._id ,
    email: data.email
  }

  dispatch({
    type: LOGIN,
    payload: payload
  })
}

export const logout = () => async (dispatch, getState, api)=> {
  const { data }= await api.get('/auth/logout')

  dispatch({
    type :  LOGOUT,
    payload: {
      isAuthenticated: false,
      username: "",
      email: "",
      userId: ''
    } 
  })
}