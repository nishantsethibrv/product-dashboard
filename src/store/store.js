import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from 'redux-saga'; // Step 1: Import saga middleware
import rootReducer from './reducers';
import rootSaga from './sagas'; // Import your root saga

const sagaMiddleware = createSagaMiddleware(); // Step 2: Create the saga middleware

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(sagaMiddleware), // Step 3: Apply middleware
});

// Step 4: Run your root saga
sagaMiddleware.run(rootSaga);

export default store;
