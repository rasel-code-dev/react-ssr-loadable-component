import React, {useState} from 'react'
import Input from '../Form/Input/Input'
import Textarea from '../Form/Textarea/Textarea'
import Select from '../Form/Select/Select'

import Row from '../Layout/Row/Row'
import Col from '../Layout/Col/Col'
import Container from '../Layout/Container/Container'

import Button from '../Button/Button'
import Product from '../../models/Product'

import './AddProduct.scss'

const AddProduct = () => {

  const s={ 
    model: { value: '', errorMessage: '', tauched: false }, 
    brand: { value: '', errorMessage: '', tauched: false }, 
    cpu: { value: ``, errorMessage: '', tauched: false },
    price: { value: ``, errorMessage: '', tauched: false },
    display: { value: ``, errorMessage: '', tauched: false },
    ram: { value: ``, errorMessage: '', tauched: false },
    storage: { value: ``, errorMessage: '', tauched: false },
    color: { value: ``, errorMessage: '', tauched: false }
  }
  
  const [state, setState] = useState(s)
  const [cup, setCpu] = useState(['intel core i3', 'intel core i5', 'intel core i7', 'intel core i9'])
  const [brands, setbrand] = useState(['Dell', 'Asus', 'Hp', 'Lenovo'])
  const [ram, setRam] = useState(['DDR4', 'Asus', 'Hp', 'Lenovo'])


  const addProduct=()=>{


  }

  function changeValidate(name, value){
    let errors = {}
    if(name == 'model'){
      if(!value){
        errors.model = 'model is Required'
      } else if(value.length < 3){
        errors.model = 'model length must be greater than 3 character'
      } else{
        errors.model = ''
      }
    }

    if(name == 'brand'){
      if(!value){
        errors.brand = 'brand is Required'
      } else if(value.length < 3){
        errors.brand = 'brand length must be greater than 3 character'
      } else{
        errors.brand = ''
      }
    }

    if(name == 'cpu'){
      if(!value){
        errors.cpu = 'cpu is Required'
      } else if(value.length < 3){
        errors.cpu = 'cpu length must be greater than 3 character'
      } else{
        errors.cpu = ''
      }
    }
    if(name == 'price'){
      if(!value){
        errors.price = 'price is Required'
      } else if(value.length < 3){
        errors.price = 'price length must be greater than 3 character'
      } else{
        errors.price = ''
      }
    }
    if(name == 'display'){
      if(!value){
        errors.display = 'display is Required'
      } else if(value.length < 3){
        errors.display = 'display length must be greater than 3 character'
      } else{
        errors.display = ''
      }
    }
    return errors
  }

   const handleChange=(name, value)=>{
    const errors =  changeValidate(name, value.trim())

    setState({
      ...state,
      [name]: {
        ...[name],
        value: value,
        errorMessage: errors[name],
        tauched: true
      }
      
    })
  }

   const handleBlur=(e)=>{
    const errors = changeValidate(e.target.name, e.target.value.trim())
    
    setState({
      ...state,
      [e.target.name]: {
        ...state[e.target.name],
        tauched: true,
        errorMessage: errors[e.target.name]
        
      }
    })
  }


  const handleSubmit = (e)=>{
    e.preventDefault()
    let product = {}
    let isValid = true;
    
    for (const key in state) {
      product[key] = state[key].value 
      isValid = isValid && !state[key].errorMessage     
    }
    if(isValid){
      let products = Product.get()
      let newProduct =  new Product({...product, _id: Date.now()})
      newProduct.save()
    }
  }
  
  
  return (
    <Container className="add_product">
      <h1 className="title">Add Product</h1>

      <form onSubmit={handleSubmit} > 
      <Row spacing={5}>
        <Col xs={12} sm={12} md={6} >
        
        <Select 
          options={brands}
          value={state.brand.value} 
          as="brand" 
          type="brand"  
          label="brand" 
          name="brand" 
          tauched={state.brand.tauched && state.brand.tauched}
          onBlur={handleBlur}
          onChange={handleChange} 
          error={state.brand.errorMessage && state.brand.errorMessage}
        />

        <Input 
          value={state.model.value} 
          label="model" 
          name="model"  
          tauched={state.model.tauched && state.model.tauched}
          onBlur={handleBlur}
          onChange={handleChange} 
          error={state.model.errorMessage && state.model.errorMessage}
        />

        <Select 
          label="Cpu" 
          name="cpu"
          theme="red"
          options={cup}
          value={state.cpu.value}
          tauched={state.cpu.tauched && state.cpu.tauched}
          onBlur={handleBlur}
          onChange={handleChange} 
          error={state.cpu.errorMessage && state.cpu.errorMessage}
        />
      </Col>

      <Col xs={12} sm={12} md={6} >
        <Textarea
          label="Display" 
          name="display" 
          value={state.display.value} 
          type="text"  
          tauched={state.display.tauched && state.display.tauched}
          onBlur={handleBlur}
          onChange={handleChange} 
          error={state.display.errorMessage && state.display.errorMessage}
        />

        <Textarea
          label="ram" 
          name="ram" 
          value={state.ram.value} 
          type="text"  
          tauched={state.ram.tauched && state.ram.tauched}
          onBlur={handleBlur}
          onChange={handleChange} 
          error={state.ram.errorMessage && state.ram.errorMessage}
        />
        <Textarea
          label="storage" 
          name="storage" 
          value={state.storage.value} 
          type="text"  
          tauched={state.storage.tauched && state.storage.tauched}
          onBlur={handleBlur}
          onChange={handleChange} 
          error={state.storage.errorMessage && state.storage.errorMessage}
        />

        <Textarea
          label="Price" 
          name="price" 
          value={state.price.value} 
          type="text"  
          tauched={state.price.tauched && state.price.tauched}
          onBlur={handleBlur}
          onChange={handleChange} 
          error={state.price.errorMessage && state.price.errorMessage}
        />

        <Textarea
          label="color" 
          name="color" 
          value={state.color.value} 
          type="text"  
          tauched={state.color.tauched && state.color.tauched}
          onBlur={handleBlur}
          onChange={handleChange} 
          error={state.color.errorMessage && state.color.errorMessage}
        />
      </Col>
        <Button className="add_product_button" color="blue" type="submit">Add Product</Button>
      </Row>

      </form>
    </Container>
  )
}

export default AddProduct
