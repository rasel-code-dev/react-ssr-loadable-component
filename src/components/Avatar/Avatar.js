import React from 'react'
import classnames from 'classnames'

import './Avatar.css'

const Avatar = (props) => {
  const { circle, style, size, className, shadow, border, src, alt, srcSet, ...attributes } = props

  const avatarClasses = classnames(
    'avatar',
    circle && `circle`,
    border && `border`,
    shadow == false && `no_shadow`
  )
  
  const avatarRootClasses = classnames(
    className,
    'avatar_root',
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
    <div style={styles} className={avatarRootClasses} {...attributes}>
      <img className={avatarClasses} src={src} alt={alt} srcSet={srcSet} {...attributes} />
    </div>
  )
}

export default Avatar
