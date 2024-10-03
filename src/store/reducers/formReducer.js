const initialState = {
    title: "",
    description: "",
    category: "",
    price: null,
    discountPercentage: null,
    stock: null,
    brand: "",
    weight: null,
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    review: [{ rating: '', reviewerName: '', reviewerEmail: '',comment: '' },],
    returnPolicy: "",
    minimumOrderQuantity: null,
}



const formReducer = (state = initialState, action) => {
  // console.log(action, "form action")
    switch(action.type){
        case 'UPDATE_FORM_DATA':
          // console.log("form action", action.payload.name , "--", action.payload)
        return {
            ...state,
            [action.payload.name]: action.payload.value,
        };
        case 'RESET_FORM_DATA': // Add this case
            return initialState; 
        case 'UPDATE_REVIEW_DATA':  
      return {
        ...state,
        review: state.review.map((r, index) =>
          index === action.payload.index
            ? { ...r, [action.payload.name]: action.payload.value }
            : r
        ),
      };
      // case 'ADD_PRODUCT_REQUEST':
      //       return {
      //           ...state,
      //           // Optionally handle loading state
      //       };

      //   case 'ADD_PRODUCT_SUCCESS':
      //       return {
      //           ...state,
      //           products: [...state.products, action.payload], // Add new product to the products array
      //       };

      //   case 'ADD_PRODUCT_FAILURE':
      //       return {
      //           ...state,
      //           // Optionally handle errors
      //       };
        default:
            return state;
    }
}

export default formReducer;