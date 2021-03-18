import React from 'react'
import classnames from 'classnames'
import './IconButton.scss'

const IconButton = (props) => {
  
  const { type, size=12, svg, color, style, children, ...attributes } = props

  function checkHexColor(color){
    return color.search(/^#/g) !== -1
  }


  const classes = classnames("icon_button_wrapper", color && !checkHexColor(color) && `text_${color}` )
 
  const parentStyles = {}
  const styles = {...style};
  if(size) {
    styles.fontSize = size
    parentStyles.width = size + 16
    parentStyles.height = size + 16
  }
  if(color && checkHexColor(color)) styles.color = color 
  

  return (
    <div className={classes} style={parentStyles} {...attributes}>
        {svg ? children : <i style={styles} className={["circle_icon", type].join(" ")}></i> }
      
    </div>
  )
}

export default IconButton
