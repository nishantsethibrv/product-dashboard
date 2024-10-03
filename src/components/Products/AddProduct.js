import React, { useState, useEffect } from 'react';
import InputField from '../InputField'
import ReviewForm from "./ReviewForm";
import "./AddProduct.css";
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from './Dropdown';
import {updateFormData, resetFormData} from "../../store/actions/formAction.js"
import {finalFormData} from "../../store/actions/productAction.js"
import "../input-field.css"

// import StarRating from './StarRating.js';
const AddProduct = () => {
  // const [formData, setFormData] = useState({
  //   id: '',
  //   title: '',
  //   description: '',
  //   category: '',
  //   price: '',
  //   discountPercentage: '',
  //   stock: '',
  //   brand: '',
  //   weight: '',
  //   warrantyInformation: '',
  //   shippingInformation: '',
  //   availabilityStatus: '',
  //   returnPolicy: '',
  //   minimumOrderQuantity: '',
  // });
  const [successMessage, setSuccessMessage] = useState("");

  const dispatch = useDispatch();
  let idCounter = 200; // Starting from 200

  const [catNames, setCatNames] = useState([])
  const categories = useSelector((state) => state.categoryData?.categories || []);
  // const formData = useSelector((state) => state.formData || []);

  const formData = useSelector((state) => state.formData);
  const generateUniqueId = () => {
    return idCounter++;
};

const uniqueId = generateUniqueId();
// console.log(uniqueId, "uniq")
  useEffect(() => {
    // console.log(23232, categories)
    // let catNames = []
    // categories.forEach((t) => catNames.push(t.name))
    // setCatNames(catNames)
    resetForm();
  },[])
  const [errors, setErrors] = useState({});

  const handleInputChange = ( e) => {
    // console.log(e.target, "33")

    
  };
  // useEffect(() => {
  //   console.log(value, "value")
  // },[value])
  const resetForm = () => {
    dispatch(resetFormData())
    setSuccessMessage(false);
};
  // Validation function
  const validate = () => {
      const newErrors = {};
      const { title, price, discountPercentage, stock, minimumOrderQuantity,brand,weight,warrantyInformation, shippingInformation, availabilityStatus, returnPolicy } = formData;
      // console.log(formData, "newErrors")

      if (!title) newErrors.title = 'Title is required';
      if (!price || price <= 0) newErrors.price = 'Price must be a positive number';
      if (discountPercentage && (discountPercentage < 0 || discountPercentage > 100)) {
        newErrors.discountPercentage = 'Discount must be between 0 and 100';
      }
      if (!stock || stock < 0) newErrors.stock = 'Stock must be a non-negative number';
      if (!minimumOrderQuantity || minimumOrderQuantity <= 0) newErrors.minimumOrderQuantity = 'Minimum Order Quantity must be a positive number';
      if (!title) newErrors.brand = 'Brand is required';
      if (!title) newErrors.weight = 'Weight is required';
      if (!title) newErrors.warrantyInformation = 'Warrnty info is required';
      if (!title) newErrors.shippingInformation = 'Shipping info is required';
      if (!title) newErrors.availabilityStatus = 'Status is required';
      if (!title) newErrors.returnPolicy = 'Return policy is required';

      // Additional validations can be added as needed
      // console.log(newErrors, "newErrors")
      return newErrors;
  };

  const handleSubmit = (e) => {
    // console.log(e, "sub")
    e.preventDefault();
    if (validate()) {
      // console.log('Form Data:', formData);
      if (!formData.id) { 
        // console.log(uniqueId, "uniqueId")
        // console.log(formData, "form state")
        // const dataToSubmit = { ...formData, id: uniqueId }; 
        // console.log(dataToSubmit, "dataToSubmit")

        // dispatch(finalFormData(dataToSubmit));
        dispatch({
          type: 'ADD_PRODUCT',
          payload: formData 
        });
        setSuccessMessage("Product added successfully!");
    }
    } else {
      console.log('Validation Failed:', errors);
    }
  };

  return <div className="form-container">
  <form className="product-form" onSubmit={handleSubmit}>
    <div className="form-row">
      <div className="form-group">
        <InputField
          label="Title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleInputChange}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
      <div className="form-group">
        <InputField
          label="Description"
          name="description"
          type="text"
          value={formData.description}
          onChange={handleInputChange}
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group balance-inputfield" style={{ display: 'flex',
    justifyContent: 'space-between'}}>

              <Dropdown
              label="Category"
              name="category"
              options={categories}
              onChange={(e) => handleInputChange('category', e)}
            />
      </div>
      <div className="form-group">
        <InputField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleInputChange}
        />
        {errors.price && <span className="error">{errors.price}</span>}
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <InputField
          label="Discount Percentage"
          name="discountPercentage"
          type="number"
          value={formData.discountPercentage}
          onChange={handleInputChange}
        />
        {errors.discountPercentage && <span className="error">{errors.discountPercentage}</span>}
      </div>
      <div className="form-group">
         <InputField
          label="Stock"
          name="stock"
          type="number"
          value={formData.stock}
          onChange={handleInputChange}
        />
        {errors.stock && <span className="error">{errors.stock}</span>}
      </div>
    </div>

    <div className="form-row">
      <div className="form-group ">
        <InputField
          label="Brand"
          name="brand"
          type="text"
          value={formData.brand}
          onChange={handleInputChange}
        />
        {errors.brand && <span className="error">{errors.brand}</span>}
      </div>
      <div className="form-group">
        <InputField
          label="Weight"
          name="weight"
          type="number"
          value={formData.weight}
          onChange={handleInputChange}
        />
        {errors.weight && <span className="error">{errors.weight}</span>}
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <InputField
          label="Warranty Information"
          name="warrantyInformation"
          type="text"
          value={formData.warrantyInformation}
          onChange={handleInputChange}
        />
        {errors.warrantyInformation && <span className="error">{errors.warrantyInformation}</span>}
      </div>
      <div className="form-group">
       <InputField
          label="Shipping Information"
          name="shippingInformation"
          type="text"
          value={formData.shippingInformation}
          onChange={handleInputChange}
        />
        {errors.shippingInformation && <span className="error">{errors.shippingInformation}</span>}
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
         <InputField
          label="Availability Status"
          name="availabilityStatus"
          type="text"
          value={formData.availabilityStatus}
          onChange={handleInputChange}
        />
        {errors.availabilityStatus && <span className="error">{errors.availabilityStatus}</span>}
      </div>
      <div className="form-group">
        <InputField
          label="Return Policy"
          name="returnPolicy"
          type="text"
          value={formData.returnPolicy}
          onChange={handleInputChange}
        />
        {errors.returnPolicy && <span className="error">{errors.returnPolicy}</span>}
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
         <InputField
          label="Minimum Order Quantity"
          name="minimumOrderQuantity"
          type="number"
          value={formData.minimumOrderQuantity}
          onChange={handleInputChange}
        />
        {errors.minimumOrderQuantity && <span className="error">{errors.minimumOrderQuantity}</span>}
      </div>
      <div className="form-group">
       <ReviewForm reviewIndex={0} />
      </div>
    </div>


    <div className='d-flex justify-content-center'>
    <button type="submit" className="submit-btn me-3">Submit</button>
    {/* <button type="submit" className="submit-btn" onClick={resetForm}>Add new Product</button> */}
    </div>
  </form>
  {successMessage && <div className="success-message d-flex justify-content-center">{successMessage}</div>}

</div>
}

export default AddProduct
