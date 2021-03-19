import React from 'react'
import { Helmet } from 'react-helmet'
import {connect} from "react-redux";
import {fetchProducts} from "../store";
import axios from "axios";
function getFullLink(image) {
  return "http://localhost:1000/" + image
}

const ProductPage = (props) => { 
  // console.log(props.products);
  
  React.useEffect(()=>{
    // props.fetchProducts()
  }, [])
  
  // console.log(props.products)
  
  return (
    <div>
      <Helmet>
        <title>products</title>
      </Helmet>
      <h1>Product Page</h1>
      <span>global state redux data</span>
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
      
      <span>Props data</span>
      <div className="product-wrapper">
        { props.products2 && props.products2.length > 0 && props.products2.map((product, i)=>(
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

ProductPage.getInitialProps = async (store)=> {
  
  /**  async data pass */
  // return axios.get("http://localhost:4000/api/products").then(r => {
  //   return {
  //     props: {
  //       products2: r.data,
  //       cart: [12, 86, 9]
  //     }
  //   }
  // })
  
  /**  async data pass after promise resolve */
  const { data} = await axios.get("http://localhost:4000/api/products")
  return {
    props: {
      products2: data,
      cart: [12, 86, 9]
    }
  }
  
  /** Send Plain Object as props */
  // return {
  //   props: {
  //     products: [
  //       {name: "T-Shart", price: 232, qty: 12, image: "static/productsPhoto/gsmarena_010 (2).jpg"},
  //       {name: "Monitor", price: 232, qty: 12, image: "static/productsPhoto/gsmarena_016.jpg"},
  //       {name: "Mobile", price: 1232, qty: 12, image: "static/productsPhoto/samsung-galaxy-a51-sm-a515-1.jpg"}
  //     ],
  //     cart: {totalPrice: 123123}
  //   },
  // }
  
}

ProductPage.getInitialData = (store)=>{
  return store.dispatch(fetchProducts())
}

function mapStateToProps(state){
  return { products: state.products }
}

export default connect(mapStateToProps, { fetchProducts })(ProductPage)
