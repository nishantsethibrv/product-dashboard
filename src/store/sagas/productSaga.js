import { call, put, takeEvery } from 'redux-saga/effects';
import { finalFormData } from '../actions/productAction';

function* addProduct(action) {
    try {
        const response = yield call(fetch, 'https://dummyjson.com/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Specify the content type
            },
            body: JSON.stringify(action.payload), // Convert the payload to JSON
        });

        if (!response.ok) {
            throw new Error('Network response was not ok'); // Handle non-200 responses
        }

        const data = yield response.json(); // Parse the JSON response
        console.log(data, "data product")
        localStorage.setItem('Products', JSON.stringify(data));
        yield put(finalFormData(data)); // Dispatch success action with the response data
    } catch (error) {
        console.error('Error adding product:', error);
        // Handle error appropriately, e.g., dispatching an error action
    }
}

function* editProduct(action) {
    try {
        const { productId, updatedProductData } = action.payload;

        // Make the PUT request to update the product using fetch
        const response = yield fetch(`https://dummyjson.com/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProductData),
        });

        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = yield response.json(); // Parse the JSON from the response

        // Dispatch the updated product data to the Redux store
        yield put(finalFormData(data)); // Assuming you want to update the state with the new product data

        // Optionally, store the updated product in localStorage
        const currentProducts = JSON.parse(localStorage.getItem('products')) || [];
        const updatedProducts = currentProducts.map(product => 
            product.id === productId ? data : product
        );
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (error) {
        console.error('Error updating product:', error);
        // Handle error appropriately, e.g., dispatching an error action
    }
}

export function* watchEditProduct() {
    yield takeEvery('EDIT_PRODUCT_REQUEST', editProduct); // Watches for this action type
}

export function* watchAddProduct() {
    yield takeEvery('ADD_PRODUCT', addProduct); // Listen for ADD_PRODUCT actions
}
