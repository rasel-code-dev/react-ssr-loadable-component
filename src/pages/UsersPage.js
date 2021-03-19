import React from 'react'
import { Helmet } from 'react-helmet'

import {fetchUsers} from "../store";
import {connect} from "react-redux";
import axios from "axios";


const UsersPage = (props) => {

  const [state, setState] = React.useState({ isLoading:false })
  
  
  const { users, users2 } = props

  return (
    <div>
      <Helmet>
        <title>UserList Page</title>
      </Helmet>
      <h1>User List Page..........</h1>
      
      <br/>
      <span>Redux Data</span>
      <ul>{users2 && users2.map((user, i)=> <li key={i} >{user.username}</li>)} </ul>
      
      <span>Props Data</span>
      <ul>{users && users.map((user, i)=> <li key={i} >{user.username}</li>)} </ul>

    </div>
  )
}


UsersPage.getInitialProps = ()=> {
  
  /** Send Plain Object as props after promise resolve */
  // let { data } = await axios.get("http://localhost:4000/api/users")
  // return  {
  //   props: { users: data, cart: [12, 86, 9] },
  // }
  //
  
  /** Send promise as props */
  // return axios.get("http://localhost:4000/api/users").then(r => {
  //   return {
  //     props: {
  //       users: r.data,
  //       cart: [12, 86, 9]
  //     }
  //   }
  // })
  //
  
  /** Send Plain Object as props */
  return {
    props: {
      users: [
        { username: "rasel"},
        { username: "raju"},
      ]
    }
  }
}

UsersPage.getInitialData = (store)=> {
  return store.dispatch(fetchUsers())
}


function mapStateToProps(state){
  return { users2: state.users }
}

export default connect(mapStateToProps, {fetchUsers })(UsersPage)
