import React from 'react'
import classnames from 'classnames'
import './IconButton.scss'

const IconButton = (props) => {
  
  const { type, size, color, style, childern, ...attributes } = props

  function checkHexColor(color){
    return color.search(/^#/g) !== -1
  }


  const classes = classnames("icon_button_wrapper", color && !checkHexColor(color) && `text_${color}` )
 
  const styles = {...style};
  if(size)styles.fontSize = size
  if(color && checkHexColor(color)) styles.color = color 
  

  return (
    <div className={classes} {...attributes}>
        <i style={styles} className={type}>{childern}</i>
    </div>
  )
}

export default IconButton
