import React from 'react'
import classnames from 'classnames'
import Waves from '../Waves/Waves'

import './Button.scss'

const Button = (props) => {
  const [cursorPosition, setCursorPosition] = React.useState({})
  const buttonRef = React.createRef()

  let { tag:Tag, className, waves=true, block, color, outline, children, ...attriibutes } = props
  const classes = classnames(
    'btn',
    className,
    color && `btn_${color}`,
    block && `btn_block`,
    outline && `btn_outline`,
    outline && outline !== (undefined || true) ? `outline_btn_${outline}` : '',
    outline && outline === (undefined || true) ? `outline_btn_default` : '',
  )

  function handleMouseDown(event){
    setCursorPosition({left: event.pageX, top: event.pageY, time: Date.now()})
    // console.log(event.pageY);
    // console.log(event.PageX);    
  }
  let wavesColor;
  if(waves && waves !== (undefined || true)){
    wavesColor = waves
  }
  else if(outline && outline !== (undefined || true)) {
    wavesColor = outline
  }
  else{
    wavesColor = false
  }
  
  Tag = Tag ? Tag : 'button'
  
  return (
    <Tag onMouseDown={handleMouseDown} className={classes} ref={buttonRef} {...attriibutes}>
      {children}
      { waves !== 'false' && <Waves wavesColor={wavesColor} cursorPosition={cursorPosition} parentRef={buttonRef} /> }
    </Tag>
  )
}

export default Button
