import { call, put, takeEvery } from 'redux-saga/effects';
import { finalFormData } from '../actions/productAction';

function* addProduct(action) {
    try {
        const response = yield call(fetch, 'https://dummyjson.com/products/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(action.payload),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = yield response.json();
        console.log(data, "data product")

        const existingProducts = JSON.parse(localStorage.getItem('products')) || [];

    // Step 2: Find the maximum current ID
    const maxId = existingProducts.length > 0
        ? Math.max(...existingProducts.map(product => Number(product.id) || 199))
        : 199; // Start from 199 if no products exist

    // Step 3: Assign a new ID
    const newId = maxId + 1;

    // Step 4: Add the new product with the new ID
    const newProductWithId = {
        ...data,
        id: newId, // Assign the new ID
    };

    // Step 5: Append the new product to the existing products
    existingProducts.push(newProductWithId);

    // Step 6: Save the updated products list back to localStorage
    localStorage.setItem('products', JSON.stringify(existingProducts));
        yield put(finalFormData(data));
    } catch (error) {
        console.error('Error adding product:', error);
    }
}

function* editProduct(action) {
    try {
        const { productId, updatedProductData } = action.payload;

        const response = yield fetch(`https://dummyjson.com/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedProductData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = yield response.json();

        yield put(finalFormData(data));

        const currentProducts = JSON.parse(localStorage.getItem('products')) || [];
        const updatedProducts = currentProducts.map(product => 
            product.id === productId ? data : product
        );
        localStorage.setItem('products', JSON.stringify(updatedProducts));
    } catch (error) {
        console.error('Error updating product:', error);
    }
}

export function* watchEditProduct() {
    yield takeEvery('EDIT_PRODUCT_REQUEST', editProduct);
}

export function* watchAddProduct() {
    yield takeEvery('ADD_PRODUCT', addProduct);
}
