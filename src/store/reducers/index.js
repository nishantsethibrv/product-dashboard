import { combineReducers } from "redux";
import formReducer from "./formReducer";
import categoryReducer from "./categoryReducer";
import productReducer from "./productReducer";

const rootReducer = combineReducers({
    formData: formReducer,
    categoryData: categoryReducer,
    productData: productReducer,
});

export default rootReducer;