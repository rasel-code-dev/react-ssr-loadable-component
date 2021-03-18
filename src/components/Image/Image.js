import React from 'react'
import classnames from 'classnames'

import './Image.scss'

const Image = (props) => {
  const { circle, style, size, className, border, src, alt, srcSet } = props

  const imageClasses = classnames(
    'image',
    circle && `circle`,
    border && `border`
  )
  

  const imageRootClasses = classnames(
    className,
    'image_root',
  )
  let styles={...style}
  if(size && typeof size === 'object'){
    styles.width = size.w && `${size.w}px`
    styles.height = size.h && `${size.h}px`
  }
  else if(size && typeof size !== 'object'){
    styles.width = `${size}%`
  }  

  return (
    <div style={styles} className={imageRootClasses}>
      <img className={imageClasses} src={src} alt={alt} srcSet={srcSet} />
    </div>
  )
}

export default Image
