import express from "express"


// client Side Root App ( Virtual Dom )
import routes from '../src/routes'
import {  matchPath } from 'react-router-dom'

const app = express()
app.use(express.static("build"));
app.use("/public", express.static("public"));
app.use(express.json())

// only for development server............

app.get("/api/users", (req, res)=>{
  res.send([{username: 'A'}, {username: 'B'}])
})

app.get("/api/products", (req, res)=>{
  setTimeout(()=>{
    return res.send([
      {name: "T-Shart", price: 232, qty: 12, image: "static/productsPhoto/gsmarena_010 (2).jpg"},
      {name: "Monitor", price: 232, qty: 12, image: "static/productsPhoto/gsmarena_016.jpg"},
      {name: "Mobile", price: 1232, qty: 12, image: "static/productsPhoto/samsung-galaxy-a51-sm-a515-1.jpg"}
    ])
  }, 2000)
})

//! Helper for Server side rendering

import renderer from './helper/renderer'
import {applyMiddleware, createStore} from "redux";
import {productReducer} from "../src/store";
import thunk from "redux-thunk";
import axios from "axios";

 function createStore2(req){
  const api = axios.create({
    baseURL :"http://localhost:4000",
    headers: { "cookie": req.get("cookie") || '' }
  })
  
  return createStore(productReducer, {},
    applyMiddleware(thunk.withExtraArgument(api))
  );
}

app.get("*", (req, res) => {

  const store = createStore2(req)
  
  //. better way for preload all data from any component or pages
  
  function loadData(callback){
    routes.map(route=>{
      const match = matchPath(req.url, route)
      if(match){
        route.component.load().then(data=>{
          
          let propsData = {}
          let propsPromises = []
          
          // if(data.default.getInitialData){
          //
          //   // call getInitialData function which pass from compoent
          //   const getInitialDataObject = data.default.getInitialData(store)
          //
          //   // validate if getInitialData return a object
          //   if(typeof getInitialDataObject === "object"){
          //     let promises = []
          //     let props = null
          //
          //     // loop all item in (getInitialData return a object)
          //     for (const key in getInitialDataObject) {
          //
          //       if(getInitialDataObject[key]){
          //         if(key === "props"){
          //           props = getInitialDataObject[key]
          //         }
          //         // // function are redux action
          //         // if(typeof getInitialDataObject[key] === "function"){
          //         //   let actionPromise = getInitialDataObject[key]()
          //         //   console.log(getInitialDataObject[key]())
          //         //
          //         //   promises.push(actionPromise)
          //         //
          //         //   // props for each component local state
          //         // } else if (typeof getInitialDataObject[key] === "object") {
          //         //   if(key === "props"){
          //         //     props = getInitialDataObject[key]
          //         //   }
          //         // }
          //       }
          //     }
          //     callback(promises, props)
          //
          //   } else{
          //     console.log("data load fail 1");
          //     callback(null, null)
          //   }
          //
          // } else{
          //
          //   // callback(null, null)
          // }
          
          if(data.default.getInitialData) {
            const getInitialDataObject = data.default.getInitialData(store)
            propsPromises.push(getInitialDataObject)
          }
  
   
          if(data.default.getInitialProps){
            let initialPropsFn = data.default.getInitialProps()
            
            // return props promise...........
            if(typeof initialPropsFn.then === "function"){
              propsPromises.push(initialPropsFn)
              // console.log(initialPropsFn)
            } else {
              // console.log(initialPropsFn)
              propsData = initialPropsFn?.props
            }
          
          }
          
          callback(propsPromises, propsData)
          
        })
        .catch(ex=>{
          // is somehow fail server side data load then return response without data
          console.log("data load fail 1", ex);
          callback(null, null)
        })
      }
    })
  }
  
  
  loadData((promises, propsData) => {
    
    /**
      if not return any async request from server side via component
              getInitialProps and getInitialData
    */
    if (promises === null || promises.length === 0) {
      return res.send(renderer(req, store, propsData));
      
    } else {
      Promise.all(promises)
        .then(props => {
         let allProps = {}
          props.forEach(prop=>{
            if(prop) {
              allProps = prop[Object.keys(prop).find(o => o === "props")]
            }
          })
          
          res.send(renderer(req, store, {...allProps, ...propsData}));
          // console.log(allProps, propsData)
        })
        .catch(err => {
          console.log("preload Data fetching Fail", err);
          res.send(renderer(req, store, propsData));
        })
        
    }
  });

});

app.listen(4000, () =>
  console.log(`server a is running http://localhost:4000`)
);

