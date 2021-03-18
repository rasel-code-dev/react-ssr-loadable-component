import React, { useRef } from "react";

import getFullLinkImage from "../../utils/getFullLinkImage";

import "./SliderV2.scss";
import { withWidth } from "../Layout";

class SliderV2 extends React.Component{

slider = React.createRef(null)

  state = { 
    left: 0,
    totalItem: 0,
    itemWidth: 0,
    currentImage: 1,
    showItemPer: 3,
    sliderWidth: 0,
    reverseCount: 0,
    autoScroll: true
  }

  componentDidMount(){
    const { left, itemWidth, currentImage, showItemPer, totalItem } = this.state
    if(this.slider){  
      let allItem = this.slider.children
      this.setState({ totalItem: allItem.length})        
    }
    if(this.props.autoScroll !== undefined){
      this.clearScroll = setInterval(()=>{
        this.autoScroll()
      }, this.props.autoScroll)
    }
    
  }

  autoScroll=()=>{
    const { left, itemWidth, currentImage, showItemPer, totalItem, sliderWidth } = this.state
    let increment = Math.abs(left) + itemWidth
   
    if(currentImage + (showItemPer - 1) === totalItem ){
      this.setState({ left: 0, currentImage: 1})
    }else{
      this.setState({ left: -increment, currentImage: currentImage + 1 })
    }
  }

  componentDidUpdate(pp, ps){
    const { left, itemWidth, currentImage, showItemPer, totalItem, sliderWidth } = this.state
    let allItem = this.slider.children   
    if(ps.totalItem !== allItem.length){
      let sliderWidth =  this.slider.scrollWidth
      let itemWidth = sliderWidth / allItem.length
      this.setState({totalItem: allItem.length,  sliderWidth, itemWidth })
    }  

    let {win_screen_width } = this.props 
    if(pp.win_screen_width !==  win_screen_width){
      
      let showItemPer =  Math.floor(this.props.win_screen_width / 300)
      this.setState({ showItemPer, left: 0, currentImage: 1 })
    }
  }

  componentWillUnmount(){
    clearInterval(this.clearScroll)
  }


  handleNextImage=()=>{
    const { left, itemWidth, currentImage, showItemPer, totalItem } = this.state
    const pos = Math.abs(left)

    let add = pos + itemWidth

    let actualCurrentImage = currentImage + showItemPer

    if(actualCurrentImage == totalItem ){
      this.setState({ left:  0, currentImage: 1  })
    }else if(currentImage  === totalItem){
      this.setState({ left:  0, currentImage: 1  })
    } else{
      this.setState({ left:  -add, currentImage: currentImage + 1  })
    }
  }

  handlePrevImage=()=>{
    const { left, itemWidth, currentImage, showItemPer, sliderWidth, totalItem } = this.state
    const pos = Math.abs(left)

    let g = sliderWidth - ( itemWidth * showItemPer ) 
    let sub = pos - itemWidth
    
    if(currentImage === 1){
      this.setState({ left:  -g, currentImage: totalItem  })
    } else if(currentImage - showItemPer === 1){
      this.setState({ left:  0, currentImage: 1  })
    } else{      
      this.setState({ left: -sub, currentImage: currentImage - 1  })
    }    
  }

  //! Utils function....................
  // get pointer x, y cordinate............
  pointerEvent(e){
    let cordiante = {x: 0, y: 0}    
    if(e.type === 'touchmove' || e.type === 'touchstart' || e.type === 'touchend'){
      let tauch = e.changedTouches[0]
      cordiante = {
        x: tauch.pageX,
        y: tauch.pageY,
      }
    }else{
      cordiante = {
        x: e.pageX,
        y: e.pageY,
      }
    }
    return cordiante
  }

  // mouse event................
  handleMouseDown=(e)=>{
    this.mouseDown = true
    this.startPos = this.pointerEvent(e).x
    e.target.style.cursor = 'pointer'
  }

  handleMouseUp=(e)=>{
    const { left, totalItem, currentImage, itemWidth, sliderWidth, showItemPer  } = this.state
    this.mouseDown = false
    this.startPos = 0
    e.target.style.cursor = 'default'
    
    // here image position set absolute not cropping..... 
    let p = Math.abs(left)
    let g= Math.ceil(p / itemWidth)
    this.setState({currentImage:  g + showItemPer  })
       
  }

  lastForw = 0

  handleSwipe=(e)=>{
    const { left, totalItem, currentImage, itemWidth, sliderWidth, showItemPer } = this.state
    if(this.mouseDown){
      let endPos = this.pointerEvent(e).x
      let elPosition = this.slider.getBoundingClientRect()

      const currentElPos = endPos - elPosition.left  // el from left distance

      const count =  this.slider.offsetWidth - currentElPos
      const reverseCount = this.slider.offsetWidth - count
      this.setState({reverseCount })

 
      if(this.startPos > count ){
        this.isForward = true
        // direction forword............ 
        // console.log( count, this.state. );
        // 
  
        let leftPos = Math.abs(left)
        
        if( leftPos + ( itemWidth * showItemPer ) >= sliderWidth  ){
          this.setState({ left: 0, currentImage: 1 })  
        }else{
          this.setState({ left: -(leftPos + 10)  })      
        }
      } 
      else{
        // direction backward................
        // this.isForward = false
        // let g =  this.state.reverseCount - reverseCount
            
        // let leftPos = Math.abs(left)
        // if(leftPos !== 0) {
        //   this.setState({ left: -(leftPos - 10)})    
        // }
        
      }
    }
  }
  


  render(){

  const { itemWidth, showItemPer, totalItem, currentImage  } = this.state
   
  const Product = this.props.component
  

  return (
      <div  className="slider_v2_wrapper">

          <div onClick={this.handlePrevImage} className="prevGalleryImage">
            <i className="far fa-arrow-left"></i>
          </div>

          <div style={{ width: this.state.itemWidth * showItemPer }} className="slider_v2">
            <div 
              ref={(e)=>this.slider = e} 
              style={{left: this.state.left}} 
                onDrag = {this.handleSwipe}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleSwipe}
                className={["slider_container", this.state.autoScroll ? "auto_scroll" : '', currentImage === 12 ? 'jump_frist' : currentImage === 1 ? 'jump_last' : '' ].join(" ")}>
              {this.props.products &&
                this.props.products.length > 0 &&
                this.props.products.map((product, i) => (
                  <div draggable={false} key={i} className="slider_v2_image">
                    <Product carousel product={product} onMouseDown={this.handleMouseDown} draggable={false}  />
                  </div>
                ))}
            </div>
          </div>

        <div onClick={this.handleNextImage} className="nextGalleryImage">
          <i className="far fa-arrow-right"></i>
        </div>

      </div>
  );
};
};

export default withWidth(SliderV2)
