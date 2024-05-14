
import { configureStore, Middleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
// import beneficiaryReducer from '../features/beneficiarySlice';
import customerSlice from './customerSlice';
import customerBeneficiarySlice from './customerBeneficiarySlice';

// Root reducer combining all reducers
const rootReducer = combineReducers({
  // beneficiary: beneficiaryReducer,
  customer: customerSlice,
  beneficiary: customerBeneficiarySlice
  // Add other reducers here if needed
});

// Custom middleware (e.g., logger middleware)
const loggerMiddleware: Middleware = () => (next) => (action) => {
  console.log('Dispatching action:', action);
  return next(action);
};

// Create Redux store
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
  // Add other middleware as needed
});

export default store;

// Define RootState type for useSelector hooks
export type RootState = ReturnType<typeof rootReducer>;