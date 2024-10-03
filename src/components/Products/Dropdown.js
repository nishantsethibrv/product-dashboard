import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateFormData } from '../../store/actions/formAction';
import "./dropdown.css";
import "../input-field.css"

const Dropdown = ({ label, name, options, value, onChange }) => {
    const categories = useSelector((state) => state.categoryData?.categories || []);
    const dispatch = useDispatch();

    useEffect (() => {
//      console.log(value, "val cat")
//         console.log(categories, "cataaaaegories")
    },[])

    const handleChange = (e) => {
      const selectedValue = e.target.value;
      dispatch(updateFormData(name, selectedValue));
    };
  return (
    <div className="form-group balance-inputfield">
      <label htmlFor={name}>{label}</label>
      <select className="dropdown-category" id={name} name={name} value={value} onChange={handleChange}>
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.slug} value={option.slug}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
