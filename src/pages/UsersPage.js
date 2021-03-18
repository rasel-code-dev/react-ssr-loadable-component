import React from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { fetchUsers } from '../store/actions/usersAction'

import Progress from '../utils/Progress'


const UsersPage = (props) => {

  const [state, setState] = React.useState({ isLoading:false })

  const { users } = props

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
      
      <ul>{users && users.map((user, i)=> <li key={i} >{user.username}</li>)} </ul>

    </div>
  )
}


UsersPage.getInitialData = (store)=>{  

  // return store.dispatch(fetchUsers())  // you can one or multiple action here...... 

  return {
      A: ()=> store.dispatch(fetchUsers()),
    // B: ()=> store.dispatch(fetchUserPosts())
  }
}

function mapStateToProps(state){
  console.log(state);
  
  return { users: state.users }
}

export default connect(mapStateToProps, { fetchUsers })(UsersPage)
