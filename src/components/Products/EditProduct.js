import React, { useState, useEffect } from 'react';
import { editProductRequest } from '../../store/actions/productAction'; // adjust path if necessary
import InputField from '../InputField'
import Dropdown from './Dropdown'; // Import the new Dropdown component
import { useDispatch, useSelector } from 'react-redux';
import ReviewForm from "./ReviewForm";
import {updateFormData} from "../../store/actions/formAction.js"
import "./edit-product.css";

const EditProduct = ({ productData }) => {
    const dispatch = useDispatch();
    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState({});
  const categories = useSelector((state) => state.categoryData?.categories || []);
  const [formData, setFormData] = useState({}); // Local state for form data

    // useEffect(() => {
    //     // Fetch product from localStorage by productId
    //     const products = JSON.parse(localStorage.getItem('products')) || [];
    //     const product = products.find(prod => prod.id === productId);
    //     if (product) {
    //         setProductData(product); // Set product data for form
    //     }
    // }, [productId]);

    useEffect(() => {
      if(Object.keys(productData).length > 0) {

      setFormData((prevFormData) => ({
        ...prevFormData,
        title: productData.title,
        description: productData.description,
        price: productData.price,
        category: productData.category,
        discountPercentage: productData.discountPercentage,
        stock: productData.stock,
        brand: productData.brand,
        weight: productData.weight,
        rating: productData.rating,
        warrantyInformation: productData.warrantyInformation,
        shippingInformation: productData.shippingInformation,
        availabilityStatus: productData.availabilityStatus,
        returnPolicy: productData.returnPolicy,
        minimumOrderQuantity: productData.minimumOrderQuantity,
      }), () => {
        // Code to execute immediately after state update
        console.log('Form data1 updated:', formData);
      });
    }
    Object.entries(productData).forEach(([key, value]) => {
      dispatch(updateFormData(key, value));
    });
    console.log(Object.keys(productData).length, 12)
    }, [productData]);

    useEffect(() => {
      // console.log('Form data updated:', formData);
      // console.log(formData.title, 12)
    }, [formData]);
    // const handleInputChange = (e) => {
    //   console.log(e.target, "ee")
    //     const { name, value } = e.target;
    //     // setProductData(prevState => ({
    //     //     ...prevState,
    //     //     [name]: value
    //     // }));
    // };

    const handleSubmit = (e) => {
        e.preventDefault();
        // dispatch(editProductRequest(productId, productData));
        // Optionally, navigate away after successful update
        const products = JSON.parse(localStorage.getItem('products')) || [];
        products.push(formData);
        localStorage.setItem('products', JSON.stringify(products));
    };


    return (            
            <div className="form-container">
  <form className="product-form" onSubmit={handleSubmit}>
    <h2>Edit a Product</h2>
    <div className="form-row two-fields">
      <div className="form-group">
        <InputField
          label="Title"
          name="title"
          type="text"
          value={formData.title}
          disabled={true}
        />
        {errors.title && <span className="error">{errors.title}</span>}
      </div>
      <div className="form-group">
        <InputField
          label="Description"
          name="description"
          type="text"
          value={formData.description}
        />
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
              <Dropdown
              label="Category"
              name="category"
              options={categories}
              value={formData.category}
              // onChange={(e) => handleInputChange('category', e)}
            />
      </div>
      <div className="form-group">
        <InputField
          label="Price"
          name="price"
          type="number"
          value={formData.price}
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
        />
        {errors.discountPercentage && <span className="error">{errors.discountPercentage}</span>}
      </div>
      <div className="form-group">
        {/* <label>Ratinssg</label> */}
        {/* <StarRating
          value={formData.rating}
          // onChange={(value) => handleInputChange('rating', value)}
        /> */}
      </div> 
    </div>

    <div className="form-row">
      <div className="form-group">
        <InputField
          label="Stock"
          name="stock"
          type="number"
          value={formData.stock}
        />
        {errors.stock && <span className="error">{errors.stock}</span>}
      </div>
      <div className="form-group">
        <InputField
          label="Brand"
          name="brand"
          type="text"
          value={formData.brand}
        />
        {errors.brand && <span className="error">{errors.brand}</span>}
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <InputField
          label="Weight"
          name="weight"
          type="number"
          value={formData.weight}
        />
        {errors.weight && <span className="error">{errors.weight}</span>}
      </div>
      <div className="form-group">
        <InputField
          label="Warranty Information"
          name="warrantyInformation"
          type="text"
          value={formData.warrantyInformation}
        />
        {errors.warrantyInformation && <span className="error">{errors.warrantyInformation}</span>}
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <InputField
          label="Shipping Information"
          name="shippingInformation"
          type="text"
          value={formData.shippingInformation}
        />
        {errors.shippingInformation && <span className="error">{errors.shippingInformation}</span>}
      </div>
      <div className="form-group">
        <InputField
          label="Availability Status"
          name="availabilityStatus"
          type="text"
          value={formData.availabilityStatus}
        />
        {errors.availabilityStatus && <span className="error">{errors.availabilityStatus}</span>}
      </div>
    </div>

    <div className="form-row">
      <div className="form-group">
        <InputField
          label="Return Policy"
          name="returnPolicy"
          type="text"
          value={formData.returnPolicy}
        />
        {errors.returnPolicy && <span className="error">{errors.returnPolicy}</span>}
      </div>
      <div className="form-group">
        <InputField
          label="Minimum Order Quantity"
          name="minimumOrderQuantity"
          type="number"
          value={formData.minimumOrderQuantity}
        />
        {errors.minimumOrderQuantity && <span className="error">{errors.minimumOrderQuantity}</span>}
      </div>
    </div>

    <div className="form-group">
      <ReviewForm reviewIndex={0} />
    </div>
    <div className='d-flex'>
    <button type="submit" className="submit-btn me-3">Submit</button>
    {/* <button type="submit" className="submit-btn" onClick={resetForm}>Add new Product</button> */}
    </div>
  </form>
  {successMessage && <div className="success-message">{successMessage}</div>}

</div>
    );
};

export default EditProduct;
