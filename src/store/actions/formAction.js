export const updateFormData = (name, value) => {
    return {
        type: 'UPDATE_FORM_DATA',
        payload: {name, value},
    }
}

export const updateReviewData = (index, name, value) => {
    return {
      type: 'UPDATE_REVIEW_DATA',
      payload: { index, name, value },
    };
  };
  export const resetFormData = () => {
    return {
        type: 'RESET_FORM_DATA',
    };
};

  export const ADD_PRODUCT_REQUEST = 'ADD_PRODUCT_REQUEST';
export const ADD_PRODUCT_SUCCESS = 'ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_FAILURE = 'ADD_PRODUCT_FAILURE';

export const addProductRequest = (product) => {
    return {
        type: ADD_PRODUCT_REQUEST,
        payload: product,
    };
};

export const addProductSuccess = (product) => {
    return {
        type: ADD_PRODUCT_SUCCESS,
        payload: product,
    };
};

export const addProductFailure = (error) => {
    return {
        type: ADD_PRODUCT_FAILURE,
        payload: error,
    };
};