import React from 'react'
import classnames from 'classnames'

import './Container.css'
import '../Layout.scss'

const Container = (props) => {
  
  let { className, style, d, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, py, px, textAlign, alignItems,  alignContent, justify, alignSelf, fluid, full, tag:Tag, ...attributes } = props
  
  let isDisplayFlex = false
  if(alignContent || alignItems || justify){
    isDisplayFlex = true
  }

  const classes = classnames(
    className,
    fluid ? 'container-fluid' : full ? 'container-full' : 'container',
    textAlign && `text-align-${textAlign}`,
    isDisplayFlex && 'd-flex',
    alignItems ? `align-items-${alignItems}` : '',
    alignContent ? `align-content-${alignContent}` : '',
    justify ? `justify-content-${justify}` : '',
    alignSelf ? `align-self-${alignSelf}` : '',
    d && `d-${d}`,
  ) 

  if(!Tag){
    Tag = 'div'
  }

  const createPaddingStyle=()=>{
    let styles = {}
    const isObj = typeof p == 'object' && Object.keys(p) && Object.keys(p).length > 0 

    if(pt !== undefined) styles.paddingTop = `${pt}px`
    if(pb !== undefined) styles.paddingBottom = `${pb}px`
    if(pl !== undefined) styles.paddingLeft = `${pl}px`
    if(pr !== undefined)  styles.paddingRight = `${pr}px`

    if(p !== undefined && !isObj ) styles.padding = `${p}${p ? 'px' : ''}`     
    
    if(p !== undefined && isObj){
      let pt = p.t
      let pb = p.b
      let pl = p.l
      let pr = p.r

      let py = p.y
      let px = p.x

      if(pt !== undefined) styles.paddingTop = pt 
      if(pb !== undefined) styles.paddingBottom = pb 
      if(pl !== undefined) styles.paddingLeft = pl 
      if(pr !== undefined) styles.paddingRight = pr 

      if(py !== undefined) { 
        styles.paddingTop = py 
        styles.paddingBottom = py 
      } 
      if(px !== undefined) { 
        styles.paddingRight = px 
        styles.paddingLeft = px 
      }       
    } 

    if(py !== undefined){
      styles.paddingTop = `${py}${py ? 'px' : ''}` 
      styles.paddingBottom = `${py}${py ? 'px' : ''}` 
    } 
    if(mx !== undefined){
      styles.paddingLeft = `${px}${px ? 'px' : ''}` 
      styles.paddingRight = `${px}${px ? 'px' : ''}` 
    }

    return styles
  }
  
  const createMarginStyle=()=>{  
    let styles = {}
    const isObj = typeof m == 'object' && Object.keys(m) && Object.keys(m).length > 0    

    if(mt !== undefined) styles.marginTop = `${mt}px` 
    if(mb !== undefined) styles.marginBottom = `${mb}px` 
    if(ml !== undefined) styles.marginLeft = `${ml}px` 
    if(mr !== undefined) styles.marginRight = `${mr}px` 

    if(m !== undefined && !isObj ) styles.margin = `${m}${m ? 'px' : ''}`  

    if(m !== undefined && isObj){
      let mt = m.t, 
      mb = m.b, ml = m.l, 
      mr = m.r,
      my = m.y,
      mx = m.x

      if(mt !== undefined) styles.marginTop = mt 
      if(mb !== undefined) styles.marginBottom = mb 
      if(ml !== undefined) styles.marginLeft = ml 
      if(mr !== undefined) styles.marginRight = mr 

      if(my !== undefined) { 
        styles.marginTop = my 
        styles.marginBottom = my 
      } 
      if(mx !== undefined) { 
        styles.marginRight = mx 
        styles.marginLeft = mx 
      }       
    } 

    if(my !== undefined){
      styles.marginTop = `${my}${my ? 'px' : ''}` 
      styles.marginBottom = `${my}${my ? 'px' : ''}` 

    } 
    if(mx !== undefined){     
      styles.marginLeft = `${mx}${mx ? 'px' : ''}` 
      styles.marginRight = `${mx}${mx ? 'px' : ''}` 
    }

    return styles
  }
  
  let styles = {...style, ...createMarginStyle(), ...createPaddingStyle()}
  return <Tag data-test='container' style={styles} className={classes} {...attributes}/>
}


Container.defaultProps={
  tag: 'div',
  d: undefined,
  style: undefined,
  m: undefined, 
  mt: undefined, 
  mb: undefined, 
  ml: undefined, 
  mr: undefined, 
  mx: undefined, 
  my: undefined, 
  p: undefined,
  pt: undefined, 
  pb: undefined, 
  pl: undefined, 
  pr: undefined, 
  py: undefined,
  px: undefined,  
  textAlign: '', 
  alignItems: '',  
  alignContent: '', 
  justify: '',  
  className: '',
  alignSelf: '',
}

export default Container

