import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector} from "react-redux";
import {updateFormData} from "../store/actions/formAction.js"


const InputField = ({label, name, type="text", value: propValue, disabled=false}) => {
  const dispatch = useDispatch();
  const formStoreData = useSelector((state) => state.formData[name]);
  const [inputValue, setInputValue] = useState("");
  const [isUserEditing, setIsUserEditing] = useState(false);

// useEffect(() => {
// console.log(label, name, "inp")
// },[])


useEffect(() => {
  // Only update if the user hasn't started editing or there is a new prop value
  if (!isUserEditing && propValue !== undefined) {
    setInputValue(propValue);  // Use prop if passed
  } else if (!isUserEditing && formStoreData !== undefined) {
    setInputValue(formStoreData);  // Otherwise, fallback to Redux store value
  }
}, [propValue, formStoreData]);  // Run this effect when prop or store changes


  const handleInputChange = (e) => {
    console.log(e.target.value, "ee")
    const updatedValue = e.target.value;

    setInputValue(updatedValue);  // Update local state
    setIsUserEditing(true);  // Mark that the user has started typing
    dispatch(updateFormData(name, e.target.value));
  }
  // useEffect(() => {
  //   console.log(formStoreData, "value")
  // },[formStoreData])
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} name={name}
      value={inputValue} // Display the passed value, fallback to formState value or empty
      onChange={handleInputChange}
      placeholder={`Enter your ${label.toLowerCase()}`}
      disabled={disabled}
      />
    </div>
  )
}

export default InputField
