import React, { useEffect, useRef } from 'react'


import './Slider.scss'

import range from '../../utils/range'



class Slider extends React.Component{  
  slider = React.createRef(null)

  state = {
    left: 0,
    totalItems: 0,
    currentImage: 1,
    imageWidth: 200,
    reverseCount: 0
  }


  componentDidMount() {
    if(this.slider){
      let sliderDiv = this.slider.current.children
      this.setState({ 
        totalItems: sliderDiv.length, 
        currentImage: 1 
      })
    }
  }


  handlePrevImage=(e)=>{
    const { left, totalItems, currentImage, imageWidth } = this.state
    if(currentImage !== 1 ){
      this.setState({
        left: left + imageWidth,
        currentImage: currentImage - 1 
      })
    }else {
      this.setState({
        left: - (imageWidth * (totalItems - 1)),
        currentImage: totalItems,
      })
    }
  }


  handleNextImage=(e)=>{
    const { left, totalItems, currentImage, imageWidth } = this.state
    
    if(currentImage !== totalItems ){
      this.setState({
        left: left - imageWidth,
        currentImage: currentImage + 1 
      })
    }else {
      this.setState({
        left: 0,
        currentImage: 1,
      })
    }
  }
  // console.log(state);


  handleMouseDown=(e)=>{
    this.mouseDown = true
    this.startPos = this.pointerEvent(e).x
    e.target.style.cursor = 'pointer'
  }


  handleMouseUp=(e)=>{
    const { left, totalItems, currentImage, imageWidth } = this.state
    this.mouseDown = false
    e.target.style.cursor = 'default'
    
    // here image position set absolute not cropping..... 
    if(left === 0 ){
      this.setState({
        currentImage: 1,
        left: 0
      })
    }else{    
      this.setState({ 
        currentImage:  this.isForward ? this.setCurrentImage(Math.abs(left)) + 1 : this.setCurrentImage(Math.abs(left)) - 1 ,
        left: - (this.setCurrentImage(Math.abs(left) - 1) * imageWidth )
      })
    }    
  }

  setCurrentImage = (range)=>{
    let currentImage = 0;
    if(range == 0 || range < 200 ){
      currentImage = 1
    } else if(range === 200 || range < 400 ){
      currentImage = 2
    } else if(range === 400 || range < 600){
      currentImage = 3
    } else if(range === 600 || range < 800){
      currentImage = 4
    } else if(range === 800){
      currentImage = 5
    }
    return currentImage
  }

  handleSwipe=(e)=>{
    const { left, totalItems, currentImage, imageWidth } = this.state
    if(this.mouseDown){
      let endPos = this.pointerEvent(e).x
      
      const elLeft = e.target.x  // window from left elem
      const currentElPos = elLeft - endPos // el from left distance

      const count = (e.target.offsetWidth - currentElPos) - e.target.offsetWidth
      const reverseCount = e.target.offsetWidth - count
      this.setState({reverseCount })

      if(this.startPos >  reverseCount ){
        this.isForward = true
        // direction forword............ 
        //  let l = (Math.abs(left) + reverseCount )
          let g = reverseCount -  this.state.reverseCount
          this.setState({ left: - ((Math.abs(left) + g))})

      } else{
        // direction backward................
        this.isForward = false
        let g =  this.state.reverseCount - reverseCount
        
        if((Math.abs(left) - count) <= 0){
          this.setState({ left: 0 })    
        }else{
          this.setState({ left: - (Math.abs(left) - count)})    
        } 
      }
            
      // this.setState({
      //   left:  - (left + reverseCount)
      // })
    
      // console.log(this.startPos, endPos);
    }
  }
  

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



  render(){
  const items = range(this.state.totalItems)
  const { images } = this.props
    
  return (
   
      <div className="slider_wrapper_wrapper">
        <div onClick={this.handlePrevImage} className="prev_image"><i className="fa fa-chevron-circle-left" aria-hidden="true"></i></div>
        
          <div className="slider_wrapper">
                
            <div  
              onTouchEnd={this.handleMouseUp}
              onTouchStart={this.handleMouseDown}
              onTouchMove={this.handleSwipe}
              onDrag = {this.handleSwipe}
              onMouseDown={this.handleMouseDown}
              onMouseUp={this.handleMouseUp}
              onMouseMove={this.handleSwipe}
              draggable={false}
              ref={this.slider} style={{ left: this.state.left }} className="slider">
              { images && images.map(image=>{
                return (
                  <div className="image" key={image}>
                    <img 
                    onMouseDown={this.handleMouseDown}
                      draggable={false}
                      
                      src={image} />
                  </div>
                )
              }) }
        
          </div>
          <div className="items">
            {items.map(item=>(
              <li className={["item_bullet", this.state.currentImage == item ? "active" : ""].join(" ")}  key={item} ></li>
            ))}
          </div>
        </div>
          <div onClick={this.handleNextImage} className="next_image"><i className="fa fa-chevron-circle-right" aria-hidden="true"></i></div>
      </div>  
  
  )
}
}



export default Slider







// scroll slider...............

// import React, { useEffect, useRef } from 'react'

// import './DummyPage.scss'
// import CreateFood from '../components/createFood'
// import { Row, Container, Col, Box } from '../components/Layout'
// import Button from '../components/Button/Button'

// import p1 from '../asserts/images/Alec Thompson card.jpg'
// import p2 from '../asserts/images/Gina Andrew card.jpg'
// import p3 from '../asserts/images/avatar-1.jpg'
// import p4 from '../asserts/images/lenovo-ideapad-ip-s145-14iwl-8th-gen-intel-core-11568622443.jpg'
// import p5 from '../asserts/images/s145-14iwl-1-500x500.jpg'
// import range from '../utils/range'

// const images = [p1, p2, p3, p4, p5]


// class DummyPage extends React.Component{  

//   slider = React.createRef(null)

//   state = {
//     currentImage: 1,
//     totalImage: 0,
//     scrollLeft: 0,
//     totalScrollWidth: 0,
//     currentImageScrollWidth: 0,
//   }


//   componentDidMount() {
//     console.log("component Did Mount");
//     if(this.slider){
//       let totalScrollWidth = this.slider.current.scrollWidth
//       let imagesDiv =  this.slider.current.children

//       this.setState({ 
//         totalScrollWidth, 
//         currentImageScrollWidth: totalScrollWidth, 
//         totalImage: imagesDiv.length
//       })    
//     }
//   }


//   handlePrevImage=(e)=>{
//     const { currentImage, totalImage, scrollLeft, currentImageScrollWidth } = this.state
//     if(currentImage !== 1){
//       this.setState({
//         currentImage: currentImage - 1, 
//         scrollLeft: Math.abs(scrollLeft - currentImageScrollWidth)
//       })
  
//       if(this.slider)
//         this.slider.current.scrollLeft =  Math.abs(scrollLeft - currentImageScrollWidth)
      
//     } else{
//       this.setState({
//         currentImage: totalImage, 
//         scrollLeft: currentImageScrollWidth * totalImage
//       })
  
//       if(this.slider)
//         this.slider.current.scrollLeft = currentImageScrollWidth * totalImage
//     }
//   }

//   handleNextImage=(e)=>{
//     const { currentImage, totalImage, scrollLeft, currentImageScrollWidth } = this.state
//     if(totalImage > currentImage ){
//       this.setState({
//         currentImage: currentImage + 1, 
//         scrollLeft: scrollLeft + currentImageScrollWidth
//       })
  
//       if(this.slider){
//         if(this.state.scrollLeft === 0 ){
//           this.slider.current.scrollLeft = currentImageScrollWidth
//         }else{
//           this.slider.current.scrollLeft = scrollLeft + currentImageScrollWidth
//         }
//       }
//     }else{
//       this.setState({
//         currentImage: 1, 
//         scrollLeft: 0
//       })
  
//       if(this.slider)
//         this.slider.current.scrollLeft = 0
      
//     }
//   }
//   // console.log(state);
  
//   render(){


//   const items = range(this.state.totalImage)
    
//   console.log("render method.......");
  

//   return (
//     <Container fluid >
//       <div className="slider_wrapper">
//         <div onClick={this.handlePrevImage} className="prev_image"><i class="fa fa-chevron-circle-left" aria-hidden="true"></i></div>
//         <div ref={this.slider} className="slider">
//           { images.map(image=>{
//             return (
//               <div className="image" key={image}>
//                 <img src={image} />
//               </div>
//             )
//           }) }
//         </div>
//         <div className="items">
//           {items.map(item=>(
//             <li className={["item_bullet", this.state.currentImage == item ? "active" : ""].join(" ")}  key={item} ></li>
//           ))}
//         </div>
//         <div onClick={this.handleNextImage} className="next_image"><i class="fa fa-chevron-circle-right" aria-hidden="true"></i></div>
//       </div>
//     </Container>
//   )
// }
// }



// export default DummyPage
