import { combineReducers, configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ordersReducer from './slices/ordersDataSlice/ordersDataSlice';
import userReducer from './slices/userDataSlice/userDataSlice';
import constructorReducer from './slices/constructorSlice/constructorSlice';
import ingredientReducer from './slices/ingredientsSlice/ingredientsSlice';

export const rootReducer = combineReducers({
  ingredientsData: ingredientReducer,
  constructorData: constructorReducer,
  userData: userReducer,
  ordersData: ordersReducer
});
// Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
