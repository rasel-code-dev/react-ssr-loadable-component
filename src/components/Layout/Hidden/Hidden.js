import React from "react";
import classnames from "classnames";
import Col from "../Col/Col";
import withWidth from "../withWidth/withWidth";
import "./Hidden.css";

const Hidden = props => {
  const {
    win_screen_size, 
    win_screen_width, 
    implementation,
    className,
    only: hideOnlyBreakPoint,
    xsDown,
    xsUp,
    smDown,
    smUp,
    mdDown,
    mdUp,
    lgDown,
    lgUp,
    xlDown,
    xlUp,
    hideUp,
    hideDown,
    children,
    ...attributes
  } = props;


  let onlyIsArray =  hideOnlyBreakPoint && Array.isArray(hideOnlyBreakPoint) && hideOnlyBreakPoint.length > 0;

  function multipleOnly() {
    let multipleOnly = "";
    if (onlyIsArray) {
      for (let i = 0; i < hideOnlyBreakPoint.length; i++) {
        multipleOnly += `privateCss-hidden-only-${hideOnlyBreakPoint[i]} `;
      }
      return multipleOnly;
    }
    return "";
  }

  const classes = classnames(
    className,
    implementation === "css" && hideOnlyBreakPoint && !onlyIsArray && `privateCss-hidden-only-${hideOnlyBreakPoint} `,
    implementation === "css" && onlyIsArray && multipleOnly(),
    implementation === "css" && hideDown && ` hideDown_${hideDown}`,
    implementation === "css" && hideUp && ` hideUp_${hideUp}`
  );
  // console.log(hideOnlyBreakPoint);
  


  let breakPoint = ['xs', 'sm', 'md', 'lg', 'xl']

  if (!hideUp && hideDown === 'xs' && win_screen_width <= 0){
    let index = breakPoint.indexOf('xs')
    if(index !== -1) breakPoint.splice(index, 1)
  }

  if (!hideUp && hideDown === 'sm' && win_screen_width <= 575){
    let index = breakPoint.indexOf('sm')
    if(index !== -1) breakPoint.splice(index, 1)
  }

  if (!hideUp && hideDown === 'md' && win_screen_width <= 767){
    let index = breakPoint.indexOf('md')
    if(index !== -1) breakPoint.splice(index, 1)
  }

  if (!hideUp && hideDown === 'lg' && win_screen_width <= 991){
   let index = breakPoint.indexOf('lg')
    if(index !== -1) breakPoint.splice(index, 1)
  }

  if (!hideUp && hideDown === 'xl' && win_screen_width <= 1199){
    let index = breakPoint.indexOf('xl')
    if(index !== -1) breakPoint.splice(index, 1)
  }


  if (!hideDown && hideUp === 'xs' && win_screen_width > 0){
    let index = breakPoint.indexOf('xs')
    if(index !== -1) breakPoint.splice(index, 1)
  }

  if (!hideDown && hideUp === 'sm' && win_screen_width > 575){
    let index = breakPoint.indexOf('sm')
    if(index !== -1) breakPoint.splice(index, 1)
  }

  if (!hideDown && hideUp === 'md' && win_screen_width > 767){
    let index = breakPoint.indexOf('md')
    if(index !== -1) breakPoint.splice(index, 1)
  }

  if (!hideDown && hideUp === 'lg' && win_screen_width > 991){
    let index = breakPoint.indexOf('lg')
    if(index !== -1) breakPoint.splice(index, 1)
  }

  if (!hideDown && hideUp === 'xl' && win_screen_width > 1200){
    let index = breakPoint.indexOf('xl')
    if(index !== -1) breakPoint.splice(index, 1)
  }

  const bre = {
    hideUp: { 
      xs: { min: 0, max: 575 }, 
      sm: { min: 576, max: 767}, 
      md: { min: 768, max: 991 }, 
      lg: { min: 992, max: 1199 }, 
      xl: { min: 1200, max: 12122},
    },
    hideDown: { 
      xs: { min: 0, max: 0 }, 
      sm: { min: 576, max: 576}, 
      md: { min: 768, max: 767 }, 
      lg: { min: 992, max: 991 }, 
      xl: { min: 1200, max: 12122},
    }
  }

  if (hideUp && hideDown){
    let tempAllbreakPoint =  [...breakPoint]
    let hideUp_Curr_BreakPoint_Max = bre.hideUp[hideUp].max
    let hideDown_Curr_BreakPoint_Max = bre.hideDown[hideDown].max


    // when resize get up to target break point. 
    if(win_screen_width > hideUp_Curr_BreakPoint_Max) tempAllbreakPoint = []  

     // when resize get down to target break point. 
    if(win_screen_width < hideDown_Curr_BreakPoint_Max)  tempAllbreakPoint = []
    
    breakPoint = tempAllbreakPoint
  }

  let matchBreakPoint = false;
  if (onlyIsArray) {
    for (let j = 0; j < hideOnlyBreakPoint.length; j++) {
      const element = hideOnlyBreakPoint[j];
      if (element === win_screen_size) {
        matchBreakPoint = true;
      }
    }
  } else {
    matchBreakPoint = hideOnlyBreakPoint === win_screen_size;
  }

  let isCol = false;
  if (children && children.type && children.type.name === "Col") {
    isCol = true;
  } else{
    isCol = false
  }

  // server side render css class using hide. 
  if (implementation === "css") {
    let { className: colClass, ...colAttributes } = children.props;
    return isCol ? (
      <Col data-test="private-col" className={classes} {...colAttributes}>
        {children.props.children}
      </Col>
    ) : (
      <div data-test="private" className={classes} {...attributes}>
        {children}
      </div>
    );
  }

  // client side render with js  
  if (implementation === "js") {
    let { ...colAttributes } = children.props;    

    if(!matchBreakPoint && !hideDown && !hideUp && !(hideDown && hideUp)){
      if(isCol){
        return <Col data-test="private col" className={classes} {...colAttributes} >{ children.props.children }</Col>
      }else{
        return <React.Fragment>{children}</React.Fragment>
      }
    } 
   
    // if not given these two property.......
    if(!(hideDown && hideUp) ){
      if(breakPoint.indexOf(hideDown) !== -1 || breakPoint.indexOf(hideUp) !== -1){   
        
        if(isCol){
          return <Col data-test="private col" className={classes} {...colAttributes} >{ children.props.children }</Col>
        }   
        return <div data-test="private" className={classes} {...attributes}> {children} </div>
      }
    }

    // if hide element in between range
    if(hideDown && hideUp){
      if(breakPoint.indexOf(win_screen_size) !== -1){
        if(isCol){
          return <Col data-test="private col" className={classes} {...colAttributes} >{ children.props.children }</Col>
        }   
        return <div data-test="private" className={classes} {...attributes}> {children} </div>
      }
    }
    return null
  }
};

Hidden.defaultProps = {
  implementation: "js",
  only: "" || []
};

export default withWidth(Hidden);
