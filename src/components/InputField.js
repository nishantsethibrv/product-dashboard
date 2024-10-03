import React, {useEffect} from 'react'
import { useDispatch, useSelector} from "react-redux";
import {updateFormData} from "../store/actions/formAction.js"


const InputField = ({label, name, type="text", uservalue}) => {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.formData[name]);

useEffect(() => {
console.log(label, name, "inp", uservalue)
},[])



  const handleInputChange = (e) => {
    // console.log(e.target.value, "ee")
    dispatch(updateFormData(name, e.target.value));
  }
  useEffect(() => {
    // console.log(value, "value")
  },[value])
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name}
      type={type} value = {uservalue || value}
      onChange={handleInputChange}
      placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
  )
}

export default InputField
