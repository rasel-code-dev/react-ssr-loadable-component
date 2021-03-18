import React from 'react'
import classnames from 'classnames'
import Col from '../Col/Col'
import withWidth from '../withWidth/withWidth'

import './Row.css'
import '../Layout.scss'

const Row = (props) => {
  const { d, m, mt, mb, ml, mr, mx, my, p, pt, pb, pl, pr, py, px, win_screen_size, win_screen_width, alignItems, direction, alignContent, justify, spacing, style, tag: Tag, className, ...attributes } = props
  
  const classes = classnames(
    'row',
    alignItems ? `align-items-${alignItems}` : '',
    alignContent ? `align-content-${alignContent}` : '',
    justify ? `justify-content-${justify}` : '',
    direction && `direction-${direction}`,
    spacing &&  `justify-content-space-between`,
    d && `d-${d}`,
    // spacing && `row-gutter-${spacing}`,
    className
  )

  // const [win_screen_size, set_win_screen_size] = React.useState('')

  // React.useEffect(() => {
  //   set_win_screen_size(wss)    
  // }, [wss])


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
      mb = m.b, 
      ml = m.l, 
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
  
  const styles = { ...style, ...createPaddingStyle(), ...createMarginStyle() }
    
  let { children } = props

  let isCol = true;
  if(children && Array.isArray(children) && children.length > 0){
    children.map(i=> isCol = isCol && i.type.name === "Col") 
  } else {
    isCol = false
  }

  const width = {
    xs: {
      minWidth: 0,
      breakPoint: {
        _1:{ flex: '8.333333', maxWidth: 8.333333 },
        _2:{ flex: '16.666667', maxWidth: 16.666667 },
        _3:{ flex: '25', maxWidth: 25 },
        _4:{ flex: '33.333333', maxWidth: 33.333333 },
        _5:{ flex: '41.666667', maxWidth: 41.666667 },
        _6:{ flex: '50;', maxWidth:  50 },
        _7:{ flex: '58.333333', maxWidth: 58.333333 },
        _8:{ flex: '66.666667', maxWidth: 66.666667 },
        _9:{ flex: '75', maxWidth: 75 },
        _10:{ flex: '83.333333', maxWidth: 83.333333 },
        _11:{ flex: '91.666667', maxWidth: 91.666667 },
        _12:{ flex: '100', maxWidth: 100},
      },
    },
    sm: { minWidth: 576 },
    md: { minWidth: 768 },
    lg: { minWidth: 992 },
    xl: { minWidth: 1200 },
  }
  

  function spacingCalculation(spacing, maxWidth){
    let styles = {}

      if(spacing === 1){
        //  styles.margin = `0 0 4px 4px`;  
        styles.maxWidth = `calc(${maxWidth}% -  4px)`
      }
      if(spacing === 2){
        //  styles.margin = `0 0 8px 8px`;  
        styles.maxWidth = `calc(${maxWidth}% - 8px)`
      }
      if(spacing === 3){
        //  styles.margin = `0 0 0px 0px`;  
        styles.maxWidth = `calc(${maxWidth}% - 12px)`
      }
      if(spacing === 4){
        //  styles.margin = `0 0 16px 16px`;  
        styles.maxWidth = `calc(${maxWidth}% - 16px)`
      }
      if(spacing === 5){
        //  styles.margin = `0 0 20px 20px`;  
        styles.maxWidth = `calc(${maxWidth}% - 20px)`         
      }
      if(spacing === 6){
        //  styles.margin = `0 0 20px 20px`;  
        styles.maxWidth = `calc(${maxWidth}% - 40px)`         
      }
    return styles
  }

  function noExtraWidth(item){
    let g = false
    for(let pKey in item.props){      
      if(pKey == win_screen_size){
        if(item.props[pKey] == 12){
          g = true
        } 
      }
   }
   return g
  }


  return <Tag data-type="row" className={classes} style={styles} {...attributes} >{
    isCol ? (
      children.map((item, index)=>{
        const { className: colClassName, col, xs, sm, md, lg, xl, style: colStyle, ...chilAttributes } =  item.props 

        let colStyles = {}  

        for (const key in width) {
          if(win_screen_size === key && spacing){
            if(col || xs || md || lg || xl){
              // if(xs && win_screen_size === 'xs'){   
              if(xs && win_screen_width > 0 ){   
                // console.log('xs');                            
                for (const xsss in width['xs'].breakPoint) {
                  let g = "_" + xs
                  if(xsss == g){                    
                    let cssProperty = width['xs'].breakPoint[g]
                    colStyles = {...colStyles, ...spacingCalculation(spacing, cssProperty.maxWidth, item) }
                    if(xs === 12){
                      colStyles.maxWidth = `calc(${cssProperty.maxWidth}% - 0px)`  
                    }
                  }
                }
              }
               if(sm && win_screen_width > 576 ){    
                // console.log('sm');        
                for (const xsss in width['xs'].breakPoint) {
                  let g = "_" + sm
                  if(xsss == g){   
                    let cssProperty = width['xs'].breakPoint[g]                    
                    colStyles = {...colStyles, ...spacingCalculation(spacing, cssProperty.maxWidth, item) }
                    if(sm === 12){
                      colStyles.maxWidth = `calc(${cssProperty.maxWidth}% - 0px)`  
                    }
                  }
                }
              }
               if(md && win_screen_width > 768){
                // console.log('md');    
                for (const xsss in width['xs'].breakPoint) {
                let g = "_" + md
                  if(xsss == g){                    
                    let cssProperty = width['xs'].breakPoint[g]
                    colStyles = {...colStyles, ...spacingCalculation(spacing, cssProperty.maxWidth, item) }
                    if(md === 12){
                      colStyles.maxWidth = `calc(${cssProperty.maxWidth}% - 0px)`  
                    }
                  }
                }
              }
               if(lg && win_screen_width > 992){
                // console.log('lg');
                for (const xsss in width['xs'].breakPoint) {
                  let g = "_" + lg
                  if(xsss == g){  
                    
                    let cssProperty = width['xs'].breakPoint[g]
                    colStyles = {...colStyles, ...spacingCalculation(spacing, cssProperty.maxWidth, item) }
                    if(lg === 12){
                      colStyles.maxWidth = `calc(${cssProperty.maxWidth}% - 0px)`  

                    }
                  }
                }
              }
              if(xl && win_screen_width > 1200){
                // console.log('xl');
                for (const xsss in width['xs'].breakPoint) {
                  let g = "_" + xl
                  if(xsss == g){                    
                    let cssProperty = width['xs'].breakPoint[g]
                    colStyles = {...colStyles, ...spacingCalculation(spacing, cssProperty.maxWidth, item) }
                    if(xl === 12){
                      colStyles.maxWidth = `calc(${cssProperty.maxWidth}% - 0px)`  
                    }
                  }
                }
              } 
            }
          }
        }

        // console.log(colStyles);

        return (
          <Col 
            key={index} 
            className={colClassName}
            style={colStyles}
            col={col}
            xs={xs}
            sm={sm}
            md={md}
            lg={lg}
            xl={xl}
            {...chilAttributes}
          >
            {item.props.children}
          </Col> 
        )

      }) 
    ) : <React.Fragment> {children} </React.Fragment>
  } </Tag>

}
 


Row.defaultProps = {
  tag: 'div', 
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
  spacing: undefined, 
  direction: undefined,
  alignItems: undefined,  
  alignContent: undefined,
  justify: undefined,
  className: ''
};

export default withWidth(Row)
