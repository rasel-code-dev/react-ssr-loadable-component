import React from 'react'

import './Gallery.scss'

import { subTrackImage } from './../../utils/getFullLinkImage'


const Gallery = (props)=>{

  const [state, setState] = React.useState({ previewImage: 0, error: false })

  const { images, onDelete } = props  


  const prevImage = React.useRef(null)

  function setPrevImage(index){
    setState({ ...state, previewImage: index, error: false })
  }

  React.useEffect(()=>{
    
    function handleError(e){      
      setState({...state, error: true })
    }
  
    if(prevImage){
      prevImage.current.addEventListener('error', handleError)              
    }
    
    return ()=>{
      return prevImage && prevImage.current.removeEventListener('error', handleError)  
    }
    
  }, [state.previewImage])

  function handleNextImage(){
    if(state.previewImage === (images.length - 1)){
      setState({...state, previewImage: 0, error: false})
    }else{
      setState({...state, previewImage: state.previewImage + 1, error: false})
    }
  }

  function handlePrevImage(){
    if(state.previewImage === 0){
      setState({...state, previewImage : (images.length - 1), error: false})
    }else{
      setState({...state, previewImage: state.previewImage - 1, error: false})
    }
  }

  function deletePhotoG(){
    let image = images[state.previewImage]
    if(onDelete){
      onDelete(subTrackImage(image))
    }
  }


  return (
    <div className="gallery_wrapper">

      <div className="preview_image_div">

        {onDelete && <div onClick={deletePhotoG} className="delete_photo">
          <i className="far fa-trash" aria-hidden="true"></i>
          </div>
        }
       
        <div onClick={handlePrevImage} className="prevGalleryImage">
          <i className="far fa-arrow-left"></i>
        </div>

        <img className={[state.error ? 'error_image' : '']}  ref={prevImage} src={images && images[state.previewImage]} />
        
        <div  onClick={handleNextImage} className="nextGalleryImage">
          <i className="far fa-arrow-right"></i>
        </div>

      </div>

      <div className="gallery">
        {images && images.map((image, index)=>(
          <div 
            key={index} 
            onClick={(e)=>setPrevImage(index)} 
            className={["image_item", state.previewImage === index ? 'active_image_gallery' : '' ].join(' ')}>
              <img src={image} /> 
            </div>
        ))}
      </div>



    </div>
  )
}





export default Gallery