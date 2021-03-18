import React from 'react'
import Transition from 'react-transition-group/Transition'

const Animation = (props) => {
  const { in: animateState, children, ...attributes } = props

  function animatedClass(state){
    return state === 'entered' || state==="entering" 
      ? true
      : state === 'existing' || state === 'exited' 
        ? false
        : null 
  }

  let Tag = children.type ? children.type : 'div'
  // inside Animate Component Frist Child... (property)
  const { shown, hidden, children:grandChildren, className } = children.props
  
  return (
    <div></div>
    // <Transition in={animateState} {...attributes}  >
    //   { state=>{
    //       return <Tag className={[className, animatedClass(state) ? shown : hidden ].join(' ')} >{grandChildren}</Tag>        
    //   }}
    // </Transition>
  )
}

// Animation.defaulfProps = {
//   unmountOnExit: true,
//   timeout: 300
// }

export default Animation
