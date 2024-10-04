import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector} from "react-redux";
import {updateFormData} from "../store/actions/formAction.js"
import "./input-field.css"

const InputField = ({label, name, type="text", value: propValue, disabled=false}) => {
  const dispatch = useDispatch();
  const formStoreData = useSelector((state) => state.formData[name]);
  const [inputValue, setInputValue] = useState("");
  const [isUserEditing, setIsUserEditing] = useState(false);

// useEffect(() => {
// console.log(label, name, "inp")
// },[])


useEffect(() => {
  if (!isUserEditing && propValue !== undefined) {
    setInputValue(propValue);
  } else if (!isUserEditing && formStoreData !== undefined) {
    setInputValue(formStoreData);
  }
}, [propValue, formStoreData]);


  const handleInputChange = (e) => {
//    console.log(e.target.value, "ee")
    const updatedValue = e.target.value;

    setInputValue(updatedValue);
    setIsUserEditing(true);
    dispatch(updateFormData(name, e.target.value));
  }
  // useEffect(() => {
  //   console.log(formStoreData, "value")
  // },[formStoreData])
  return (
    <div className="balance-inputfield">
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name}
      className='input-field'
      value={inputValue}
      onChange={handleInputChange}
      placeholder={`Enter your ${label.toLowerCase()}`}
      disabled={disabled}
      />
    </div>
  )
}

export default InputField
