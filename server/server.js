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
import devServer from './devServer'
devServer(app)

app.get("/api/users", (req, res)=>{
  res.send([{username: 'A'}, {username: 'B'}, { username: 'C', username: 'D', username: 'E' }])
})

//! Helper for Server side rendering
import createStore from './helper/createStore'
import renderer from './helper/renderer'

app.get("*", (req, res) => {  

  const store = createStore(req)
  
 
  // function loadData(){
  //   return new Promise((r, s)=>{
  //     routes.map(route=>{
  //       const match = matchPath(req.url, route)
  //       if(match){          
  //         route.component.load().then(data=>{
                 
  //           if(typeof data.default == "object" ){        
  //             let isPromise = Object.getOwnPropertyNames(data.default.getInitialData(store)).length <= 0        
  //             // console.log(typeof data.default.getInitialData(store)) ///
  //             if(isPromise){
  //               r(data.default.getInitialData(store))
  //             } else{
  //               for (const each in data.default.getInitialData(store)) {
  //                 // promises.push(data.default.getInitialData(store)[each]());
  //                 r(data.default.getInitialData(store)[each]())
  //               }
  //             }

  //           } else{
  //             r()
  //           }
  //         })
  //       }
  //     })
  //   })
  // }
   
  //. better way for preload all data from any component or pages
  
  function loadData(callback){
    routes.map(route=>{
      const match = matchPath(req.url, route)
      if(match){          
        route.component.load().then(data=>{
          if(typeof data.default === "object" ){        
            let promises = []
            let isPromise = Object.getOwnPropertyNames(data.default.getInitialData(store)).length <= 0        
            // console.log(typeof data.default.getInitialData(store)) ///
            if(isPromise){
              promises.push(data.default.getInitialData(store))
            } else{
              for (const each in data.default.getInitialData(store)) {
                // promises.push(data.default.getInitialData(store)[each]());
                promises.push(data.default.getInitialData(store)[each]())
              }
            }
            callback(promises)
          } else{
            callback(null)
          }
        })
      }
    })
  }
   
  
  loadData(promises => {

    if (promises === null) {
      res.send(renderer(req, store));

    } else {
      Promise.all(promises)
        .then(data => {
          res.send(renderer(req, store));
        })

        .catch(err => {
          res.send(renderer(req, store));
          console.log("preload Data fetching Fail");
        });
    }
  });

});



app.listen(4000, () =>
  console.log(`server a is running http://localhost:4000`)
);

      