import React from 'react'

const ProductForm = () => {
  return (
    <div className="form-container">
  <form className="product-form">
    <div className="form-group">
      <InputField label="Title" name="title" type="text" />
    </div>

    <div className="form-group">
      <InputField label="Description" name="description" type="text" />
    </div>

    <div className="form-group">
      <InputField label="Category" name="category" type="text" />
    </div>

    <div className="form-group">
      <InputField label="Price" name="price" type="number" />
    </div>

    <div className="form-group">
      <InputField label="Discount Percentage" name="discountPercentage" type="number" />
    </div>

    <div className="form-group">
      <label>Rating</label>
      <StarRating />
    </div>

    <div className="form-group">
      <InputField label="Stock" name="stock" type="number" />
    </div>

    <div className="form-group">
      <InputField label="Brand" name="brand" type="text" />
    </div>

    <div className="form-group">
      <InputField label="Weight" name="weight" type="number" />
    </div>

    <div className="form-group">
      <InputField label="Warranty Information" name="warrantyInformation" type="text" />
    </div>

    <div className="form-group">
      <InputField label="Shipping Information" name="shippingInformation" type="text" />
    </div>

    <div className="form-group">
      <InputField label="Availability Status" name="availabilityStatus" type="text" />
    </div>

    <div className="form-group">
      <InputField label="Return Policy" name="returnPolicy" type="text" />
    </div>

    <div className="form-group">
      <InputField label="Minimum Order Quantity" name="minimumOrderQuantity" type="number" />
    </div>

    <div className="form-group">
      <Review />
    </div>

    <button type="submit" className="submit-btn">Submit</button>
  </form>
</div>

  )
}

export default ProductForm
