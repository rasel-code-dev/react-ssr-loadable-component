import React from 'react'
import { Helmet } from 'react-helmet'
function getFullLink(image) {
  return "http://localhost:1000/" + image
}

const ProductPage = (props) => { 
  // console.log(props.products);
  return (
    <div>
      <Helmet>
        <title>products</title>
      </Helmet>
      <h1>Product Page</h1>
      <div className="product-wrapper">
      { props.products && props.products.length > 0 && props.products.map((product, i)=>(
          <div className="product" key={i}>
            <div>
              <img
                width={400}
                alt={getFullLink(product.image)}
                src={getFullLink(product.image)}
              />
            </div>
            <h3 className="product-name">{product.name}</h3>
            <p className="product-price">{product.price}</p>
            <span className="product-qty">{product.qty}</span>
          </div>
        ))
      }
      </div>

      
    </div>
  )
}

ProductPage.getInitialData = (store)=>{   
  return {
    props: {
      products: [
        {name: "T-Shart", price: 232, qty: 12, image: "static/productsPhoto/gsmarena_010 (2).jpg"},
        {name: "Monitor", price: 232, qty: 12, image: "static/productsPhoto/gsmarena_016.jpg"},
        {name: "Mobile", price: 1232, qty: 12, image: "static/productsPhoto/samsung-galaxy-a51-sm-a515-1.jpg"}
      ],
      cart: {totalPrice: 123123}
    },
    
    function() {
      
    },


  }
}


export default ProductPage
