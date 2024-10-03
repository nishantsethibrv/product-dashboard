// productReducer.js
const initialProductState = {
    products:[],
    loading: false, // Loading state for API requests
    error: null, // 
}

const productReducer = (state = initialProductState, action) => {
    // console.log(action, "action")
    switch (action.type) {
        case 'FINAL_FORM_DATA':
            // return [
            //     ...state, // Spread the existing products
            //     { ...action.payload }, // Add the new product from action.payload
            // ];
            return {
                ...state, // Keep loading and error states
                products: [
                    ...state.products, // Spread the existing products
                    { ...action.payload }, // Add the new product from action.payload
                ],
            };
        case 'UPDATE_PRODUCT':
            return {
                ...state,
                ...action.payload, // Update fields based on payload
            };
            case 'ADD_PRODUCT_REQUEST':
            return {
                ...state,
                loading: true, // Set loading to true when adding a product
                error: null, // Clear any previous error
            };
        case 'ADD_PRODUCT_SUCCESS':
            return {
                ...state,
                loading: false, // Reset loading state
                products: [...state.products, action.payload], // Add the new product to the list
            };
        case 'ADD_PRODUCT_FAILURE':
            return {
                ...state,
                loading: false, // Reset loading state
                error: action.payload, // Store the error message
            };
        default:
            return state;
    }
};

export default productReducer;
