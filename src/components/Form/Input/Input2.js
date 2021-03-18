import React, { useState } from 'react'
import classnames from 'classnames'

import './Input2.scss'

const Input2 = (props)=>{
  const { name, pos, label, inputDisable, type="text", error, tauched, options=[], optionsName={},  value, placeholder, onChange, onBlur } = props

  const [isShowPassword, setShowPassword] = useState(false)
  const [isInputTauched, setInputTauched] = useState(false)
  const [isInputError, setInputError] = useState('')

  const classes = classnames("input_group2 input_")

  let eyeStyle = {}
    if(pos){
      if(pos.top) eyeStyle.top = pos.top
      if(pos.bottom) eyeStyle.bottom = pos.bottom
      if(pos.right) eyeStyle.right = pos.right
      if(pos.left) eyeStyle.left = pos.left
    }

    React.useEffect(() => {
      if(error){
        setInputError(error)
      } else{
        setInputError('')
      }
    }, [error])

  function handleShowPassword(e){
    setShowPassword(!isShowPassword)
  }

  function handleInputClick(e){
    setInputTauched(true)    
  }

  function handleInputChange(e){
    // onChange(e)
    if(onChange){
      onChange({target: { name: e.target.name, value: e.target.value }})
    }
  }

  function handleInputBlur(){
    setInputTauched(false)
  }


  return (
    <div className={classes}>

      <label className={["input_label", isInputError ? "input_label_error" : ""].join(" ")} htmlFor={name}>{label}</label>
      <div className={["error_msg", error ? 'error_msg_show' : 'error_msg_hide'].join(" ")}>{error}</div>
  
      <div className="input_wrapper">
        <div className={["input_border", isInputTauched ? "input_border_focus" : "", isInputError ? "input_border_error" : ""].join(" ")}> </div>
        <div onClick={handleInputClick} className={["input", isInputTauched ? "input_focus" : "", isInputError ? "input_error" : ""].join(' ')}>
          <input
            type={type === 'password' ? isShowPassword ? 'text' : type : type}
            name={name}
            disabled={inputDisable ? true : false}
            placeholder={placeholder}
            value={value}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
            onClick={handleInputClick}
          />
        </div>

        { type === 'password' && value !== '' &&  (
          <div style={eyeStyle} onClick={handleShowPassword} className="password_eye">
            <i className={['far fa-eye', isShowPassword ? 'fa-eye-slash' : 'far fa-eye'].join(" ")} aria-hidden="true"></i>
          </div>
        ) }
      </div>
    </div>
  )
}

export default Input2