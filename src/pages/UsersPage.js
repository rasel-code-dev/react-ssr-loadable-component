import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { fetchUsers } from '../store/actions/usersAction'

import Progress from '../utils/Progress'


const UsersPage = (props) => {

  const [state, setState] = React.useState({ isLoading:false })

  const { users, users2 } = props

  function fetchUsers(){
    setState({ isLoading: true })
  }

  return (
    <div>
      <Helmet>
        <title>UserList Page</title>
      </Helmet>
      <h1>User List Page..........</h1>

      {state.isLoading && <Progress/>}

      <button onClick={fetchUsers}>getUser</button>

      <br/>
      <span>Redux Data</span>
      <ul>{users2 && users2.map((user, i)=> <li key={i} >{user.username}</li>)} </ul>
      
      <span>Props Data</span>
      <ul>{users && users.map((user, i)=> <li key={i} >{user.username}</li>)} </ul>

    </div>
  )
}


UsersPage.getInitialData = (store)=>{  
  // return store.dispatch(fetchUsers())  
  return {
    function(){
      return store.dispatch(fetchUsers())
    },
    props: { 
      users: [
        { username: "rasel"},
        { username: "raju"},
      ] 
    }
  }
}

function mapStateToProps(state){  
  return { users2: state.users }
}

export default connect(mapStateToProps, { fetchUsers })(UsersPage)
