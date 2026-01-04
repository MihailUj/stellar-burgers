import {
  getFeedsApi,
  getOrderByNumberApi,
  getOrdersApi,
  orderBurgerApi
} from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';
import { RootState } from '../../store';

export const getFeedsThunk = createAsyncThunk('/orders/all', getFeedsApi);

export const getOrderByNumber = createAsyncThunk(
  '/orders/:number',
  async (number: number) => getOrderByNumberApi(number)
);

export interface OrdersState {
  isLoading: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
  error: string | null;
  orderData: TOrder | null;
}

export const initialState: OrdersState = {
  isLoading: false,
  orders: [],
  total: 0,
  totalToday: 0,
  error: null,
  orderData: null
};

export const ordersSlice = createSlice({
  name: 'ordersData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFeedsThunk.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getFeedsThunk.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getFeedsThunk.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.error = null;
      state.orders = payload.orders;
      state.total = payload.total;
      state.totalToday = payload.totalToday;
    });

    builder.addCase(getOrderByNumber.pending, (state) => {
      state.isLoading = true;
      state.orderData = null;
      state.error = null;
    });
    builder.addCase(getOrderByNumber.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message as string;
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, { payload }) => {
      state.isLoading = false;
      state.orderData = payload.orders[0];
      state.error = null;
    });
  }
});

export const getOrdersState = (state: RootState): OrdersState =>
  state.ordersData;

export default ordersSlice.reducer;
