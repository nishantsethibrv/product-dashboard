// Dropdown.js
import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../store/actions/formAction'; // Import the action to update form data

const Dropdown = ({ label, name, options, value, onChange }) => {
    const categories = useSelector((state) => state.categoryData?.categories || []);
    const dispatch = useDispatch(); // Initialize the dispatch

    useEffect (() => {
        // console.log(categories, "cataaaaegories")
    },[categories])

    const handleChange = (e) => {
      const selectedValue = e.target.value;
      // Dispatch the updateFormData action to update the Redux state
      dispatch(updateFormData(name, selectedValue));
    };
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={handleChange}>
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
