import React from 'react'
import classNames from 'classnames'

import '../Layout.scss'
import  './Col.css'


const Col = (props) => {

  const { spacing, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, py, px, col, xs, sm, md, lg, xl, d, direction, textAlign, alignItems,  alignContent, justify,  alignSelf, size, style, className, tag: Tag, ...attributes } = props
  const classes = classNames(
    'col',
    className,
    col && `col-${col}`,
    size && `col-${size}`,
    xs &&  `col-${xs}`,
    sm && `col-sm-${sm}`,
    md && `col-md-${md}`,
    lg && `col-lg-${lg}`,
    xl && `col-xl-${xl}`,
    d && `d-${d}`,
    direction && `direction-${direction}`,
    textAlign ? `text-align-${textAlign}` : '',
    alignItems ? `align-items-${alignItems}` : '',
    alignContent ? `align-content-${alignContent}` : '',
    justify ? `justify-content-${justify}` : '',
    alignSelf && `align-self-${alignSelf}`,
   
  )
  
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

    if(m !== undefined){      
      if(!isObj ){
        if(m === 'auto'){
          styles.margin = `${m}`  
        } else{
          styles.margin = `${m}${m ? 'px' : ''}`  
        }
      } 
    }     

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

  return <Tag data-test="col" {...attributes} style={styles} className={classes} />
}

Col.defaultProps = {
  tag: 'div',
  d: undefined,
  col: undefined,
  size: undefined,
  xs: null,
  sm: null,
  md: null,
  lg: null,
  xl: null,
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
  alignItems: undefined,  
  alignContent: undefined,
  justify: undefined,
  alignSelf: undefined,
  className: ''
};

export default Col
