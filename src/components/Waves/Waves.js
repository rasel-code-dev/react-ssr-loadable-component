import React from 'react'
import classnames from 'classnames'
import './Waves.scss'

const Waves = (props) => {
  const { cursorPosition, parentRef, wavesColor } = props

  React.useEffect(()=>{
    if(parentRef){
      let parentElement =  parentRef.current  
      if(cursorPosition.top){
        wavesEffect(parentElement)
      }
    }
  }, [cursorPosition.time])

  function wavesEffect(root){
    root.classList.add('ripple_parent')

    let rippleDiv = document.createElement('span')

    let classes = classnames(
      'ripple_effect', 
      wavesColor && wavesColor !== (undefined || true) && `waves_${wavesColor}`
    )
      
    // console.log(cursorPosition);
    

    rippleDiv.className = classes
    let bounding = root.getBoundingClientRect()
   
  
    const rootWidth = bounding.width
    const rootHeight = bounding.height
    
    const rippleShouldWidth = Math.max(rootHeight, rootWidth)
    const centerilize = rippleShouldWidth / 2   

    const left = (cursorPosition.left - bounding.left) - centerilize 
    const top = (cursorPosition.top - bounding.top)  - centerilize 
    // e.clientX (screen left to cursor distance) - this.offsetLeft (screen left to element distance)

    rippleDiv.setAttribute('style', 
      `width:${rippleShouldWidth}px;
      height:${rippleShouldWidth}px;
      top:${top}px;
      left:${left}px;
    `)

    root.appendChild(rippleDiv)

    // Remove Ripple.........
    setTimeout(()=>{
      root.removeChild(rippleDiv)
    }, 500)
  }
  
  return null
}

export default Waves
