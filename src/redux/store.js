import { configureStore } from '@reduxjs/toolkit'
import alertSlice from './slices/alertSlice';
import userSlice from './slices/userSlice';

const store = configureStore({
    reducer: {
        alertReducer: alertSlice,
        userReducer:userSlice
    }
})

export default store;