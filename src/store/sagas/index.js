import { all } from 'redux-saga/effects';
import { watchAddProduct } from './productSaga'; // Import your individual saga

export default function* rootSaga() {
    yield all([
        watchAddProduct(), // Include your sagas here
        // Add other watchers as needed
    ]);
}