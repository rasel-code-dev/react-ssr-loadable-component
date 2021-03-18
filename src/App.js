import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'

import Navigation3 from './components/Navigation/Navigation3'
import "./style.scss";

import routes from './routes.js'

const App = (props)=>{ 
  
  const [state, setState] = React.useState({})
  const [route, setRoute] = React.useState({})

  React.useEffect(()=>{
    if(typeof window != "undefined"){  
      
      if(!route.path){
        console.log("server send data", props.componentProps);
      } else{
        if(props.componentProps.page !== route.path){
          if(route.component){
            route.component.load().then((c)=>{
              if(c.default.getInitialData){
                const data = c.default.getInitialData()
                if(data.props){ 
                  console.log("client side data load", data.props);
                  setState(data.props) 
                }
              }
            })
          }
        }
      }
    }
  }, [route])

  function renderRoute(oldProps, route){  
    
    if( typeof window === "undefined" ){
      return route.component.render({...oldProps, ...props.componentProps.props})
    } else{
      setRoute(route)
      // data fetch handle from client side
      if(props.componentProps.props && route.path == props.componentProps.page){  
        return route.component.render({...oldProps, ...props.componentProps.props}) 
      
      } else{
        // manually fetch props from client side js 
        // setRoute(route)
        return route.component.render({...oldProps, ...state}) 
      }
    }
  }

    return(
      <div className="App">

      <Navigation3/>
      <Switch>
        {routes.map((route, i)=> 
          <Route
            key={route.path} 
            path={route.path} 
            exact={!!route}
            render={(preProps)=> renderRoute(preProps, route)    }
          /> 
        )}
      </Switch>
 
      </div>
    )
}





export default App
