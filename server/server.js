import express from "express"
import path from "path"
import fs from "fs"


// client Side Root App ( Virtual Dom )
import routes from '../src/routes'
import {  matchPath } from 'react-router-dom'

const app = express()
app.use(express.static("build"));
app.use("/public", express.static("public"));
app.use(express.json())


// only for development server............
// import devServer from './devServer'
// devServer(app)

app.get("/api/users", (req, res)=>{
  res.send([{username: 'A'}, {username: 'B'}, { username: 'C', username: 'D', username: 'E' }])
})

//! Helper for Server side rendering
import createStore from './helper/createStore'
import renderer from './helper/renderer'

app.get("*", (req, res) => {  

  const store = createStore(req)
     
  //. better way for preload all data from any component or pages
  
  function loadData(callback){
    routes.map(route=>{
      const match = matchPath(req.url, route)
      if(match){         
        route.component.load().then(data=>{
          if(data.default.getInitialData){

            // call getInitialData function which pass from compoent
            const getInitialDataObject = data.default.getInitialData(store)  

            // validate if getInitialData return a object
            if(typeof getInitialDataObject === "object"){ 
              let promises = []
              let props = null

              // loop all item in (getInitialData return a object)
              for (const key in getInitialDataObject) {
                if(getInitialDataObject[key]){

                  // function are redux action 
                  if(typeof getInitialDataObject[key] === "function"){
                    let actionPromise = getInitialDataObject[key]()
                    promises.push(actionPromise)

                    // props for each component local state
                  } else if (typeof getInitialDataObject[key] === "object") {
                    if(key === "props"){
                      props = getInitialDataObject[key] 
                    }
                  }
                }
              }
              callback(promises, props)
  
            } else{
              console.log("data load fail 1");
              callback(null, null)
            }

          } else{
            
            callback(null, null)
          }
        })
        .catch(ex=>{
          // is somehow fail server side data load then return response without data
          console.log("data load fail 1", ex);
          callback(null, null)
        })
      }
    })
  }
   
  
  loadData((promises, props) => {
    if (promises === null) {
      res.send(renderer(req, store, props));

    } else {
      Promise.all(promises)
        .then(data => {
          res.send(renderer(req, store, props));
        })
        .catch(err => {
          console.log("preload Data fetching Fail");
          res.send(renderer(req, store, props));
        });
    }
  });

});



app.listen(4000, () =>
  console.log(`server a is running http://localhost:4000`)
);

      