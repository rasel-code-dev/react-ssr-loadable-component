import React from 'react'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'

import { Container, Row, Col, withWidth } from '../Layout'
import Avatar from '../Avatar/Avatar'
import Dropdown from '../Dropdown/Dropdown'

import f from '../../asserts/images/avatar-1.jpg'

// import { logOut } from '../../store/actions/authAction'

import Backdrop from '../Backdrop/Backdrop'

import './Navigation2.scss'

const Navigation2 = (props) => {
  let { win_screen_size, win_screen_width, isDown, isUp } = props

  let auth = {_id: 23}

  const [ isExpand, setExpand ] = React.useState(false)
  const [ isShow_authMenuPanelId, set_authMenuPanelId ] = React.useState(null)
  const [ showBackDrop, setShowBackdrop ] = React.useState(false)


  function toggleAuthMenuPanel(e){    
    set_authMenuPanelId(e.target.dataset.set ? e.target.dataset.set : null)
    setShowBackdrop(true)
  }
  function closeBackdrop(e){
    set_authMenuPanelId(null)
    setShowBackdrop(false)
  }

  function handleExpand(){
    setExpand(!isExpand)
  }

  function renderNav(classNam, expand){
    const navClass = ["nav", classNam, expand ? 'nav_expand' : '' ].join(' ')
    return <ul className={navClass}>
        <li className="nav_item"><NavLink exact to="/">Home</NavLink></li>
        <li className="nav_item"><NavLink to="/products">Products</NavLink></li>
        <li className="nav_item"><NavLink to="/add-product">Add Product</NavLink></li>
        <li className="nav_item"><NavLink to="/users">Users</NavLink></li>
      </ul>
  }
  
  return (
    <header>
      <Backdrop bg="#69696966" onCloseBackdrop={closeBackdrop} isOpenBackdrop={showBackDrop} />

      <div className="main_nav">

        {/* left nav logo + main menu nav */}
        <div className="left_nav">
          <div className="logo">News</div>
          {/* show it when desktop mode */}
          { isUp('sm') && renderNav('desktop_mode')}
        </div>
  
        {/* right nav auth menu  */}
        <ul className="right_nav">
            <li className="bell_icon"> 
              <i onClick={toggleAuthMenuPanel} data-set={0} className="fa-icon far fa-bell" aria-hidden="true"></i>
              
                  <Dropdown isShow={isShow_authMenuPanelId == 0} >
                      <ul style={{right: 0, top: 25, boxShadow: '#797979 1px 1px 4px 0px, darkgrey 1px 1px 3px 0px'}} className="dropdown_panel">
                        <p>Some happend</p>
                        <p>Some happend</p>
                        <p>Some happend</p>
                        <p>Some happend dfgdfg</p>
                      </ul>
                  </Dropdown>
            </li>

            { auth && auth._id ? (
             <li className="avatar_icon">
                <Avatar onClick={toggleAuthMenuPanel} data-set={1} size={{w: 25}} circle src={f} />
                
                  <Dropdown isShow={isShow_authMenuPanelId == 1} >
                      <ul style={{right: 0, top: 25, boxShadow: '#797979 1px 1px 4px 0px, darkgrey 1px 1px 3px 0px'}} className="dropdown_panel">
                        <li><Link to={`/auth/profile/${auth._id}`}>Profile</Link></li>
                        <li><Link to="/auth/dashboard">Dashboard</Link></li>
                        <li>Logout</li>
                      </ul>
                  </Dropdown>
                
                
              </li>
            ) : (
              <React.Fragment>
                <li className="avatar_icon">
                  <i onClick={toggleAuthMenuPanel} data-set={2} className="far fa-sign-in" aria-hidden="true"></i>
                  <Dropdown isShow={isShow_authMenuPanelId == 2} > 
                    <ul style={{right: 0, top: 25, boxShadow: '#797979 1px 1px 4px 0px, darkgrey 1px 1px 3px 0px'}} className="dropdown_panel">
                      <li><Link to="/auth/register">Register</Link></li>
                      <li><Link to="/auth/login">Login</Link></li>                    
                    </ul>
                    </Dropdown>
                  
                </li>
              </React.Fragment>
            ) }

          
            <li onClick={handleExpand} className="menu"> 
              <span/>
              <span/>
              <span/>
              <span/>
            </li>
            
        </ul>
      </div>

      {/* only show when mobile view */}
      { isDown('sm') && renderNav('mobile_mode', isExpand)} 
    </header>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})



export default connect(mapStateToProps, { })(withWidth(Navigation2))


