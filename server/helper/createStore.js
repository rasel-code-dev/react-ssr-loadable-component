
import { createStore, applyMiddleware } from 'redux'
import reduxThunk  from "redux-thunk"
import Axios from "axios";
import reducers from '../../src/store/reducers'


export default function(req){
  const axiosInstance = Axios.create({
    baseURL :"http://localhost:4000",
    headers: { "cookie": req.get("cookie") || '' }
  })

  return createStore(reducers, {}, applyMiddleware(reduxThunk.withExtraArgument(axiosInstance)));
}