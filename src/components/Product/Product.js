import React from 'react'
import { Link } from 'react-router-dom'
import Image from '../Image/Image'
import laptop from '../../asserts/images/lenovo-ideapad-ip-s145-14iwl-8th-gen-intel-core-11568622443.jpg'

import getFullLinkImage from '../../utils/getFullLinkImage'

import './Product.scss'

const Product = (props) => {
  
  const { product, carousel } = props

  return (
      <div className="product_thumb">
        <div className="image">
          <Image 
            src={ product.productCoverPhoto ? getFullLinkImage(product.productCoverPhoto ) : laptop }  
          />
        </div>

        <div className="product_info">
          {! carousel ? (
              <div className="product_content">
              <div className="product_title">
                <Link to={`product/${product._id}`}><h4>{product.title}</h4></Link>
              </div>

              <div className="product_description">
                <li className="product_item" >{product.cpu} {product.gen} {product.ram}</li>
                <li className="product_item" >{product.ram}</li>
                <li className="product_item" >{product.storage}</li>
                <li className="product_item" >{product.display}</li>
              </div>
            </div>
          ) : (
            <div className="product_title">
              <Link to={`product/${product._id}`}><h4>{product.title}</h4></Link>
            </div>
          ) }
          

          { !carousel && <div className="product_action">
            <div className="price">{product.price}৳</div>
              <div className="buy_now">
                <i className="far fa-shopping-cart "></i>
                <strong>Buy Now</strong>
              </div>
          </div> }

        </div>
    </div>
  )
}

export default Product
