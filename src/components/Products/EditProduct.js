import React, { useState, useEffect } from 'react';
import { editProductRequest } from '../../store/actions/productAction';
import InputField from '../InputField'
import Dropdown from './Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import {updateFormData} from "../../store/actions/formAction.js"
import "./edit-product.css";
import { useNavigate } from 'react-router-dom';
import ProductList from "./ProductList";

const EditProduct = ({ productData }) => {
    const dispatch = useDispatch();
    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState({});
  const categories = useSelector((state) => state.categoryData?.categories || []);
    const storeProducts = useSelector((state) => state.formData);
   const navigate = useNavigate();
   const [showProductList, setShowProductList] = useState(false);

  const [formData, setFormData] = useState({});

    // useEffect(() => {
    //     const products = JSON.parse(localStorage.getItem('products')) || [];
    //     const product = products.find(prod => prod.id === productId);
    //     if (product) {
    //         setProductData(product);
    //     }
    // }, [productId]);
//    console.log(storeProducts, "storeProducts")
    useEffect(() => {
      if(Object.keys(productData).length > 0) {

      // setFormData((prevFormData) => ({
      //   ...prevFormData,
      //   title: productData.title,
      //   description: productData.description,
      //   price: productData.price,
      //   category: productData.category,
      //   discountPercentage: productData.discountPercentage,
      //   stock: productData.stock,
      //   brand: productData.brand,
      //   weight: productData.weight,
      //   rating: productData.rating,
      //   reviews: productData.reviews,
      //   warrantyInformation: productData.warrantyInformation,
      //   shippingInformation: productData.shippingInformation,
      //   availabilityStatus: productData.availabilityStatus,
      //   returnPolicy: productData.returnPolicy,
      //   minimumOrderQuantity: productData.minimumOrderQuantity,
      // }), () => {
      //   console.log('Form data1 updated:', formData);
      // });
    }
    Object.entries(productData).forEach(([key, value]) => {
      dispatch(updateFormData(key, value));
    });
//    console.log(productData.reviews, 12)
    }, [productData]);

//     useEffect(() => {
//       // console.log('Form data updated:', formData);
// //       console.log(formData.category, 12)
//     }, [formData]);
    // const handleInputChange = (e) => {
    //   console.log(e.target, "ee")
    //     const { name, value } = e.target;
    //     // setProductData(prevState => ({
    //     //     ...prevState,
    //     //     [name]: value
    //     // }));
    // };
//     const formatFirstLetter= (str)=> {
// //    console.log(str, "str")
// //    console.log(`${str[0].toUpperCase()}${str.slice(1)}`)
//     if(str !== undefined){
//         return `${str[0].toUpperCase()}${str.slice(1)}`
//     }

//     }


    const handleSubmit = (e) => {
        e.preventDefault();
//        const storedProducts = JSON.parse(localStorage.getItem('products'));
    const products = JSON.parse(localStorage.getItem('products')) || [];

    const generateUniqueId = () => {
       if (!Array.isArray(products) || products.length === 0) {
        return 200;
    }

    const validIds = products.map(product => Number(product.id)).filter(id => !isNaN(id));

    const maxId = validIds.length > 0 ? Math.max(...validIds) : 199;
    return maxId + 1;
    };

    const newProduct = {
        ...storeProducts,
        id: generateUniqueId(),
    };
//    console.log(newProduct, "newProduct prodct")

    products.push(newProduct);
    console.log(products, "final prodct")
    localStorage.setItem('products', JSON.stringify(products));
    setSuccessMessage("Product edited successfully!");
   
    setTimeout(() => {
      setShowProductList(true); // Set state to true after 2 seconds
    }, 2000);
    };

    
    return (
      <>
       
       {!showProductList &&  

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


    <div className='d-flex justify-content-center'>
    <button type="submit" className="submit-btn me-3">Submit</button>
    {/* <button type="submit" className="submit-btn" onClick={resetForm}>Add new Product</button> */}
    </div>
    {successMessage && <div className="success-message d-flex justify-content-center  blinking-text ">{successMessage}</div>}
  </form>


</div>
}
  {showProductList && <ProductList /> }

</>
    );
};

export default EditProduct;
