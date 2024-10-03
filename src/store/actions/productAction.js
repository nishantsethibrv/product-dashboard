
export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';


export const finalFormData = (data) => {
  // console.log(data, "action")
    return {
      type: 'FINAL_FORM_DATA',
      payload: data,
    };
  };

  export const addProductSuccess = (product) => ({
    type: ADD_PRODUCT_SUCCESS,
    payload: product, // The product data received from the API
});

export const addProductFailure = (error) => ({
    type: ADD_PRODUCT_FAILURE,
    payload: error, // The error received from the API
});

export const editProductRequest = (productId, updatedProductData) => {
  return {
      type: 'EDIT_PRODUCT_REQUEST',
      payload: {
          productId,
          updatedProductData,
      }
  };
};